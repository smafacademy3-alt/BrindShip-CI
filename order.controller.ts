// src/controllers/order.controller.ts — Brand Ship CI
// Contrôleur de gestion des commandes + transaction financière atomique

import { Request, Response } from "express";
import { prisma } from "../utils/prisma";
import { calculateFinancialBreakdown, validatePricing } from "../utils/financial";
import { ApiResponse, CompleteOrderPayload } from "../types";
import { OrderStatus, TransactionType } from "@prisma/client";

// ─────────────────────────────────────────────────────────────────────────────
// completeOrder — Valide une commande livrée et distribue les gains
// ─────────────────────────────────────────────────────────────────────────────

export async function completeOrder(
  req: Request<{}, ApiResponse, CompleteOrderPayload>,
  res: Response<ApiResponse>
): Promise<void> {
  const { order_id } = req.body;

  if (!order_id) {
    res.status(400).json({ success: false, message: "order_id est requis." });
    return;
  }

  try {
    // ── 1. Charger la commande avec toutes les données nécessaires ──────────
    const order = await prisma.order.findUnique({
      where: { id: order_id },
      include: {
        store_product: {
          include: {
            product: {
              include: { supplier: true },
            },
            influencer: {
              include: { referrer: true },
            },
          },
        },
        store: {
          include: { influencer: true },
        },
      },
    });

    if (!order) {
      res.status(404).json({ success: false, message: "Commande introuvable." });
      return;
    }

    if (order.status !== OrderStatus.PENDING && order.status !== OrderStatus.SHIPPED) {
      res.status(400).json({
        success: false,
        message: `La commande est déjà au statut "${order.status}". Impossible de la valider.`,
      });
      return;
    }

    const { store_product } = order;
    const product = store_product.product;
    const influencer = store_product.influencer;
    const supplier = product.supplier;
    const referrer = influencer.referrer;

    // ── 2. Valider la cohérence des prix ─────────────────────────────────────
    try {
      validatePricing(product.base_price, store_product.desired_price);
    } catch (validationError: any) {
      res.status(400).json({ success: false, message: validationError.message });
      return;
    }

    // ── 3. Calculer la ventilation financière ────────────────────────────────
    const breakdown = calculateFinancialBreakdown(
      product.base_price,
      store_product.desired_price,
      order.delivery_fee,
      order.quantity,
      !!referrer
    );

    // ── 4. Transaction Prisma atomique ───────────────────────────────────────
    // Toutes les opérations s'exécutent dans une seule transaction DB.
    // En cas d'échec, tout est annulé (rollback automatique).

    const result = await prisma.$transaction(async (tx) => {
      // 4a. Mettre à jour le statut de la commande + snapshot financier
      const updatedOrder = await tx.order.update({
        where: { id: order_id },
        data: {
          status: OrderStatus.DELIVERED,
          base_price_snapshot: product.base_price,
          desired_price_snapshot: store_product.desired_price,
          processing_fee: breakdown.processing_fee,
          platform_fee: breakdown.platform_revenue,
          supplier_earning: breakdown.supplier_net,
          influencer_earning: breakdown.influencer_net,
          referral_bonus: breakdown.referral_bonus,
        },
      });

      // 4b. Créditer le portefeuille fournisseur
      await tx.user.update({
        where: { id: supplier.id },
        data: { wallet_balance: { increment: breakdown.supplier_net } },
      });

      // 4c. Enregistrer la transaction fournisseur
      await tx.transaction.create({
        data: {
          user_id: supplier.id,
          order_id: order_id,
          amount: breakdown.supplier_net,
          type: TransactionType.SUPPLIER_EARNING,
          description: `Vente validée : ${product.title} x${order.quantity}`,
          metadata: {
            gross: breakdown.supplier_gross,
            commission_rate: "2%",
            commission_amount: breakdown.supplier_commission,
          },
        },
      });

      // 4d. Créditer le portefeuille influenceur
      await tx.user.update({
        where: { id: influencer.id },
        data: { wallet_balance: { increment: breakdown.influencer_net } },
      });

      // 4e. Enregistrer la transaction influenceur
      await tx.transaction.create({
        data: {
          user_id: influencer.id,
          order_id: order_id,
          amount: breakdown.influencer_net,
          type: TransactionType.SALE_EARNING,
          description: `Commission vente : ${product.title} x${order.quantity}`,
          metadata: {
            gross: breakdown.influencer_gross,
            commission_flat: 500,
            referral_deducted: breakdown.referral_bonus,
            net: breakdown.influencer_net,
          },
        },
      });

      // 4f. Créditer le parrain (si applicable)
      let referralTransaction = null;
      if (referrer && breakdown.referral_bonus > 0) {
        await tx.user.update({
          where: { id: referrer.id },
          data: { wallet_balance: { increment: breakdown.referral_bonus } },
        });

        referralTransaction = await tx.transaction.create({
          data: {
            user_id: referrer.id,
            order_id: order_id,
            amount: breakdown.referral_bonus,
            type: TransactionType.REFERRAL_BONUS,
            description: `Bonus parrainage — filleul : ${influencer.name}`,
            metadata: {
              godchild_id: influencer.id,
              godchild_name: influencer.name,
              product: product.title,
            },
          },
        });
      }

      // 4g. Décrémenter le stock du produit
      await tx.product.update({
        where: { id: product.id },
        data: { stock: { decrement: order.quantity } },
      });

      // 4h. Créer les notifications
      const notifPayload = [
        {
          user_id: influencer.id,
          title: "🎉 Commande livrée !",
          body: `Vous avez gagné ${breakdown.influencer_net.toLocaleString()} FCFA sur la commande #${order_id.slice(-6).toUpperCase()}.`,
          type: "ORDER",
          data: { order_id, amount: breakdown.influencer_net },
        },
        {
          user_id: supplier.id,
          title: "📦 Produit vendu",
          body: `${product.title} — Vous avez reçu ${breakdown.supplier_net.toLocaleString()} FCFA.`,
          type: "PAYMENT",
          data: { order_id, amount: breakdown.supplier_net },
        },
      ];

      if (referrer) {
        notifPayload.push({
          user_id: referrer.id,
          title: "💰 Bonus parrainage",
          body: `Votre filleul ${influencer.name} a réalisé une vente. +${breakdown.referral_bonus} FCFA.`,
          type: "PAYMENT",
          data: { order_id, amount: breakdown.referral_bonus },
        });
      }

      await tx.notification.createMany({ data: notifPayload });

      return {
        order: updatedOrder,
        breakdown,
        referral_transaction: referralTransaction,
      };
    }); // fin $transaction

    // ── 5. Réponse succès ─────────────────────────────────────────────────
    res.status(200).json({
      success: true,
      message: "Commande validée et gains distribués avec succès.",
      data: {
        order_id: result.order.id,
        status: result.order.status,
        financial_breakdown: {
          total_collected: breakdown.total_amount,
          supplier_net: breakdown.supplier_net,
          influencer_net: breakdown.influencer_net,
          referral_bonus: breakdown.referral_bonus,
          platform_revenue: breakdown.platform_revenue,
        },
      },
    });
  } catch (error: any) {
    console.error("[completeOrder] Erreur:", error);
    res.status(500).json({
      success: false,
      message: "Erreur interne lors de la validation de la commande.",
      errors: [error.message],
    });
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// createOrder — Créer une nouvelle commande (depuis la boutique publique)
// ─────────────────────────────────────────────────────────────────────────────

export async function createOrder(req: Request, res: Response<ApiResponse>): Promise<void> {
  const {
    store_product_id,
    client_name,
    client_phone,
    client_address,
    delivery_city,
    delivery_area,
    delivery_fee = 0,
    quantity = 1,
    notes,
  } = req.body;

  try {
    // Vérifier que le store_product existe et est actif
    const storeProduct = await prisma.storeProduct.findUnique({
      where: { id: store_product_id },
      include: {
        product: true,
        store: true,
      },
    });

    if (!storeProduct || !storeProduct.is_active) {
      res.status(404).json({ success: false, message: "Produit introuvable ou indisponible." });
      return;
    }

    if (storeProduct.product.stock < quantity) {
      res.status(400).json({
        success: false,
        message: `Stock insuffisant. Disponible : ${storeProduct.product.stock} unité(s).`,
      });
      return;
    }

    const unit_price = storeProduct.final_price;
    const total_amount = unit_price * quantity + delivery_fee;

    const order = await prisma.order.create({
      data: {
        store_id: storeProduct.store_id,
        store_product_id,
        client_name,
        client_phone,
        client_address,
        delivery_city,
        delivery_area,
        delivery_fee,
        quantity,
        unit_price,
        total_amount,
        notes,
        status: OrderStatus.PENDING,
      },
    });

    res.status(201).json({
      success: true,
      message: "Commande créée avec succès. Vous serez contacté pour la livraison.",
      data: {
        order_id: order.id,
        total_amount,
        unit_price,
        quantity,
      },
    });
  } catch (error: any) {
    console.error("[createOrder] Erreur:", error);
    res.status(500).json({
      success: false,
      message: "Erreur lors de la création de la commande.",
      errors: [error.message],
    });
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// cancelOrder — Annuler une commande PENDING
// ─────────────────────────────────────────────────────────────────────────────

export async function cancelOrder(req: Request, res: Response<ApiResponse>): Promise<void> {
  const { order_id, reason } = req.body;

  try {
    const order = await prisma.order.findUnique({ where: { id: order_id } });

    if (!order) {
      res.status(404).json({ success: false, message: "Commande introuvable." });
      return;
    }

    if (order.status === OrderStatus.DELIVERED || order.status === OrderStatus.CANCELLED) {
      res.status(400).json({
        success: false,
        message: `Impossible d'annuler une commande au statut "${order.status}".`,
      });
      return;
    }

    await prisma.order.update({
      where: { id: order_id },
      data: {
        status: OrderStatus.CANCELLED,
        cancelled_reason: reason ?? "Annulation manuelle",
      },
    });

    res.status(200).json({ success: true, message: "Commande annulée avec succès." });
  } catch (error: any) {
    res.status(500).json({ success: false, message: "Erreur lors de l'annulation.", errors: [error.message] });
  }
}
