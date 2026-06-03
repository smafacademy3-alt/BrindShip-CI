// src/controllers/store.controller.ts — Brand Ship CI

import { Request, Response } from "express";
import { prisma } from "../utils/prisma";
import { validatePricing, PLATFORM_FEES } from "../utils/financial";
import { ApiResponse } from "../types";

// Créer une boutique
export async function createStore(req: Request, res: Response<ApiResponse>): Promise<void> {
  const { name, description, whatsapp_number } = req.body;
  const influencer_id = (req as any).user.id;

  try {
    const slug = name
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");

    const exists = await prisma.store.findUnique({ where: { slug } });
    if (exists) {
      res.status(400).json({ success: false, message: "Ce nom de boutique est déjà pris." });
      return;
    }

    const store = await prisma.store.create({
      data: { influencer_id, name, slug, description, whatsapp_number },
    });

    res.status(201).json({ success: true, message: "Boutique créée avec succès.", data: store });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
}

// Ajouter un produit à la boutique (avec prix souhaité)
export async function addProductToStore(req: Request, res: Response<ApiResponse>): Promise<void> {
  const { store_id, product_id, desired_price, custom_note } = req.body;
  const influencer_id = (req as any).user.id;

  try {
    // Vérifier propriété de la boutique
    const store = await prisma.store.findFirst({
      where: { id: store_id, influencer_id },
    });
    if (!store) {
      res.status(403).json({ success: false, message: "Boutique introuvable ou accès refusé." });
      return;
    }

    // Récupérer le produit
    const product = await prisma.product.findUnique({ where: { id: product_id } });
    if (!product || !product.is_active) {
      res.status(404).json({ success: false, message: "Produit introuvable ou inactif." });
      return;
    }

    // Valider le prix
    try {
      validatePricing(product.base_price, desired_price);
    } catch (e: any) {
      res.status(400).json({ success: false, message: e.message });
      return;
    }

    const final_price = desired_price + PLATFORM_FEES.PROCESSING_FEE;

    const storeProduct = await prisma.storeProduct.upsert({
      where: { store_id_product_id: { store_id, product_id } },
      create: {
        store_id,
        influencer_id,
        product_id,
        desired_price,
        final_price,
        custom_note,
        is_active: true,
      },
      update: { desired_price, final_price, custom_note, is_active: true },
    });

    res.status(201).json({
      success: true,
      message: "Produit ajouté à votre boutique.",
      data: {
        ...storeProduct,
        pricing_info: {
          base_price: product.base_price,
          your_price: desired_price,
          client_pays: final_price,
          your_margin: desired_price - product.base_price - PLATFORM_FEES.INFLUENCER_COMMISSION,
        },
      },
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
}

// Obtenir la boutique publique
export async function getPublicStore(req: Request, res: Response<ApiResponse>): Promise<void> {
  const { slug } = req.params;

  try {
    const store = await prisma.store.findUnique({
      where: { slug, is_active: true },
      include: {
        influencer: { select: { name: true, avatar_url: true } },
        store_products: {
          where: { is_active: true },
          include: {
            product: {
              include: { category: true },
            },
          },
        },
      },
    });

    if (!store) {
      res.status(404).json({ success: false, message: "Boutique introuvable." });
      return;
    }

    res.json({ success: true, data: store });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
}
