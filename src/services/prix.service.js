/**
 * Calcule le prix final d'un produit publié par un influenceur.
 * Appelé à chaque publication et à chaque commande (recalcul de sécurité).
 */
export function calculerPrixFinal({
  prixGrossiste,
  typeMarge, // 'FIXE' ou 'POURCENTAGE'
  valeurMarge,
  fraisLivraison = 0,
  tauxCommission = 0.02,
}) {
  if (prixGrossiste <= 0) {
    throw new Error('Le prix grossiste doit être supérieur à 0');
  }

  // 1. Commission BrandShip (2% du prix grossiste)
  const commissionBrandShip = Math.round(prixGrossiste * tauxCommission);

  // 2. Marge influenceur
  let margeInfluenceurFCFA;
  if (typeMarge === 'POURCENTAGE') {
    margeInfluenceurFCFA = Math.round(prixGrossiste * (valeurMarge / 100));
  } else {
    margeInfluenceurFCFA = Math.round(valeurMarge);
  }

  // 3. Prix final
  const prixFinal = prixGrossiste + commissionBrandShip + margeInfluenceurFCFA + fraisLivraison;

  return {
    prixGrossiste,
    commissionBrandShip,
    margeInfluenceurFCFA,
    fraisLivraison,
    prixFinal,
    devise: 'FCFA',
    calculeLe: new Date().toISOString(),
  };
}

/**
 * Calcule la commission plateforme sur le bénéfice de l'influenceur.
 * (prélevée sur la marge influenceur à J+10)
 */
export function calculerCommissionPlateformeVente(beneficeInfluenceur, params) {
  const {
    seuilBeneficeCommission = 5000,
    seuilBeneficeTauxSupplementaire = 10000,
    commissionVenteBasse = 200,
    commissionVenteHaute = 500,
    tauxSupplementaireHauteMarge = 0.01,
  } = params;

  if (beneficeInfluenceur < seuilBeneficeCommission) {
    return commissionVenteBasse;
  }
  if (beneficeInfluenceur <= seuilBeneficeTauxSupplementaire) {
    return commissionVenteHaute;
  }
  return commissionVenteHaute + Math.round(beneficeInfluenceur * tauxSupplementaireHauteMarge);
}

/**
 * Répartition des paiements à J+10
 */
export function repartirPaiementCommande({
  prixGrossiste,
  commissionBrandShip,
  margeInfluenceurFCFA,
  fraisLivraison,
  commissionParrainageN1 = 0,
  paramsPlateforme,
}) {
  const commissionPlateformeVente = calculerCommissionPlateformeVente(
    margeInfluenceurFCFA,
    paramsPlateforme
  );

  return {
    conserveParMarchand: prixGrossiste,
    aReverserAInfluenceur: margeInfluenceurFCFA - commissionPlateformeVente - commissionParrainageN1,
    aReverserALivreur: fraisLivraison,
    aReverserAuParrain: commissionParrainageN1,
    aReverserABrandShip: commissionBrandShip + commissionPlateformeVente,
    commissionPlateformeVente,
    statutFinal: 'VALIDEE_ET_PAYEE',
  };
}
