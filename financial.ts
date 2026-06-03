// src/utils/financial.ts — Brand Ship CI
// Moteur de calcul financier centralisé

import { FinancialBreakdown } from "../types";

// ─── Constantes de la plateforme ───────────────────────────────────────────
export const PLATFORM_FEES = {
  PROCESSING_FEE: 700,          // Frais de traitement ajoutés au prix client (FCFA)
  SUPPLIER_COMMISSION_RATE: 0.02, // 2% sur le prix plancher fournisseur
  INFLUENCER_COMMISSION: 500,   // 500 FCFA fixe sur la marge de l'influenceur
  REFERRAL_BONUS: 200,          // 200 FCFA versés au parrain
} as const;

/**
 * Calcule la ventilation financière complète pour une commande.
 * @param base_price     - Prix plancher fixé par le fournisseur (FCFA)
 * @param desired_price  - Prix souhaité par l'influenceur (FCFA)
 * @param delivery_fee   - Frais de livraison (payés séparément, non distribués)
 * @param quantity       - Quantité commandée
 * @param has_referrer   - L'influenceur a-t-il un parrain ?
 */
export function calculateFinancialBreakdown(
  base_price: number,
  desired_price: number,
  delivery_fee: number = 0,
  quantity: number = 1,
  has_referrer: boolean = false
): FinancialBreakdown {
  const { PROCESSING_FEE, SUPPLIER_COMMISSION_RATE, INFLUENCER_COMMISSION, REFERRAL_BONUS } =
    PLATFORM_FEES;

  // Prix affiché au client (incluant les frais de traitement invisibles)
  const final_price = desired_price + PROCESSING_FEE;
  const total_amount = final_price * quantity + delivery_fee;

  // ── Fournisseur ─────────────────────────────────────────────────────────
  const supplier_gross = base_price * quantity;
  const supplier_commission = Math.round(supplier_gross * SUPPLIER_COMMISSION_RATE);
  const supplier_net = supplier_gross - supplier_commission;

  // ── Influenceur ─────────────────────────────────────────────────────────
  const influencer_gross = (desired_price - base_price) * quantity;
  const influencer_commission = INFLUENCER_COMMISSION;
  const referral_bonus = has_referrer ? REFERRAL_BONUS : 0;
  const influencer_net = Math.max(0, influencer_gross - influencer_commission - referral_bonus);

  // ── Plateforme ──────────────────────────────────────────────────────────
  // Collecte : processing_fee * qty + supplier_commission + influencer_commission
  // Reverse  : referral_bonus
  const platform_revenue =
    PROCESSING_FEE * quantity + supplier_commission + influencer_commission - referral_bonus;

  return {
    base_price,
    desired_price,
    final_price,
    processing_fee: PROCESSING_FEE * quantity,
    total_amount,

    supplier_gross,
    supplier_commission,
    supplier_net,

    influencer_gross,
    influencer_commission,
    referral_bonus,
    influencer_net,

    platform_revenue,
  };
}

/**
 * Valide que les prix sont cohérents (l'influenceur ne peut pas vendre
 * en dessous du prix plancher fournisseur).
 */
export function validatePricing(base_price: number, desired_price: number): void {
  if (desired_price < base_price) {
    throw new Error(
      `Le prix souhaité (${desired_price} FCFA) ne peut pas être inférieur au prix plancher (${base_price} FCFA).`
    );
  }
  if (desired_price - base_price < PLATFORM_FEES.INFLUENCER_COMMISSION) {
    throw new Error(
      `La marge est insuffisante. Elle doit être d'au moins ${PLATFORM_FEES.INFLUENCER_COMMISSION} FCFA pour couvrir la commission plateforme.`
    );
  }
}
