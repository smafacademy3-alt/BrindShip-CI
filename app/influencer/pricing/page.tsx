"use client";

import { useState } from "react";

export default function InfluencerPricingTool() {
  // --- Données du produit (Fournies par le grossiste) ---
  const product = {
    name: "Robe Moderne Premium",
    basePrice: 10000, // Prix fournisseur
    image: "👗"
  };

  // --- Frais de la plateforme (La "formule magique") ---
  const INFLUENCER_FEE = 500; // Frais déduits du bénéfice de l'influenceur
  const PLATFORM_MARKUP = 700; // Frais invisibles ajoutés au prix public final

  // --- État : Le prix de vente souhaité par l'influenceur ---
  const [desiredPrice, setDesiredPrice] = useState<number>(14000);

  // --- Calculs en temps réel ---
  const grossProfit = desiredPrice - product.basePrice;
  // On s'assure que le gain net ne soit pas négatif si l'influenceur fixe un prix trop bas
  const netGain = grossProfit > INFLUENCER_FEE ? grossProfit - INFLUENCER_FEE : 0; 
  const finalPublicPrice = desiredPrice + PLATFORM_MARKUP;

  return (
    <div className="min-h-screen bg-[#0B0E14] text-[#F8FAFC] font-sans antialiased p-5 flex items-center justify-center">
      
      <div className="w-full max-w-md bg-[#12161F] border border-white/[0.05] rounded-3xl p-6 shadow-2xl">
        
        {/* En-tête du produit */}
        <div className="flex items-center gap-4 border-b border-white/[0.05] pb-5 mb-5">
          <div className="w-14 h-14 bg-white/[0.03] border border-white/[0.08] rounded-2xl flex items-center justify-center text-3xl">
            {product.image}
          </div>
          <div>
            <span className="text-[10px] text-amber-400 font-mono tracking-widest uppercase mb-1 block">Simulation de marge</span>
            <h2 className="text-lg font-semibold text-white leading-tight">{product.name}</h2>
            <p className="text-xs text-gray-400 mt-0.5">Prix fournisseur : {product.basePrice.toLocaleString()} FCFA</p>
          </div>
        </div>

        {/* Action de l'influenceur : Fixer son prix */}
        <div className="space-y-5">
          <div>
            <label className="text-sm font-medium text-gray-200 block mb-2">
              Quel est votre prix de vente souhaité ?
            </label>
            <div className="relative">
              <input 
                type="number" 
                value={desiredPrice}
                onChange={(e) => setDesiredPrice(Number(e.target.value))}
                className="w-full bg-[#0B0E14] border border-white/[0.1] focus:border-amber-400 rounded-xl pl-4 pr-16 py-4 text-xl font-light text-white outline-none transition-colors"
                min={product.basePrice + INFLUENCER_FEE} // Empêche de vendre à perte
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-mono text-gray-500">
                FCFA
              </span>
            </div>
          </div>

          {/* Curseur pour ajuster facilement */}
          <input 
            type="range" 
            min={product.basePrice} 
            max={product.basePrice * 3} 
            step="500"
            value={desiredPrice}
            onChange={(e) => setDesiredPrice(Number(e.target.value))}
            className="w-full accent-amber-400 h-1.5 bg-white/[0.1] rounded-lg appearance-none cursor-pointer"
          />
        </div>

        {/* Récapitulatif Transparent (Ce que voit l'influenceur) */}
        <div className="mt-8 bg-[#0B0E14] border border-white/[0.04] rounded-2xl p-5 space-y-3">
          <h3 className="text-[11px] text-gray-500 uppercase tracking-widest font-medium mb-4">Récapitulatif de vos gains</h3>
          
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-400">Bénéfice brut</span>
            <span className="text-white font-medium">{grossProfit > 0 ? grossProfit.toLocaleString() : 0} FCFA</span>
          </div>
          
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-400">Frais de plateforme</span>
            <span className="text-red-400 font-medium">- {INFLUENCER_FEE.toLocaleString()} FCFA</span>
          </div>
          
          <div className="pt-3 border-t border-white/[0.05] flex justify-between items-center">
            <span className="text-sm font-medium text-white">Votre gain net garanti</span>
            <span className="text-xl font-bold text-[#00E676]">
              {netGain.toLocaleString()} FCFA
            </span>
          </div>
        </div>

        {/* Action invisible : Le prix public affiché inclut les 700 FCFA de la plateforme */}
        <div className="mt-6">
          <button className="w-full bg-amber-400 hover:bg-amber-500 text-black font-bold py-3.5 rounded-xl transition-colors shadow-lg shadow-amber-400/20">
            Publier sur ma boutique à {finalPublicPrice.toLocaleString()} FCFA
          </button>
          <p className="text-[10px] text-center text-gray-500 mt-3 px-4">
            Le prix de vente public inclut automatiquement les frais de gestion et de transaction de la plateforme.
          </p>
        </div>

      </div>
    </div>
  );
}
