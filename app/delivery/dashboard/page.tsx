"use client";

import { useState } from "react";

// --- Types pour structurer la matrice de livraison ---
type DeliveryRule = {
  id: string;
  city: string;
  minQty: number;
  maxQty: number;
  price: number;
};

export default function DeliveryCompanyDashboard() {
  // 1. Liste des villes ivoiriennes courantes pour faciliter la saisie
  const ivorianCities = [
    "Abidjan", 
    "Yamoussoukro", 
    "Bouaké", 
    "San-Pédro", 
    "Korhogo", 
    "Man", 
    "Daloa", 
    "Gagnoa"
  ];

  // 2. État initial de la matrice de tarifs (Exemples pré-configurés)
  const [rules, setRules] = useState<DeliveryRule[]>([
    { id: "1", city: "Abidjan", minQty: 1, maxQty: 3, price: 1500 },
    { id: "2", city: "Abidjan", minQty: 4, maxQty: 10, price: 2500 },
    { id: "3", city: "Yamoussoukro", minQty: 1, maxQty: 3, price: 3000 },
    { id: "4", city: "Bouaké", minQty: 1, maxQty: 3, price: 3500 },
  ]);

  // 3. États pour le formulaire de création d'une nouvelle règle
  const [selectedCity, setSelectedCity] = useState<string>(ivorianCities[0]);
  const [minQty, setMinQty] = useState<number>(1);
  const [maxQty, setMaxQty] = useState<number>(3);
  const [deliveryPrice, setDeliveryPrice] = useState<number>(2000);

  // --- Ajouter une nouvelle règle à la matrice ---
  const handleAddRule = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newRule: DeliveryRule = {
      id: Date.now().toString(),
      city: selectedCity,
      minQty: minQty,
      maxQty: maxQty,
      price: deliveryPrice,
    };

    setRules([...rules, newRule]);
    
    // Réinitialisation partielle des valeurs pour la saisie suivante
    setMinQty(maxQty + 1);
    setMaxQty(maxQty + 3);
  };

  // --- Supprimer une règle de tarif ---
  const handleDeleteRule = (id: string) => {
    setRules(rules.filter((rule) => rule.id !== id));
  };

  return (
    <div className="min-h-screen bg-[#0B0E14] text-[#F8FAFC] font-sans antialiased pb-12">
      
      {/* ================= HEADER ESPACE LIVREUR ================= */}
      <header className="sticky top-0 z-40 bg-[#0B0E14]/90 backdrop-blur-md border-b border-white/[0.05] px-5 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-xl">
            🚚
          </div>
          <div>
            <h1 className="font-semibold text-[15px] leading-tight text-white">Flash Livraison Sarl</h1>
            <span className="text-[10px] font-mono text-blue-400 font-bold tracking-widest uppercase block mt-0.5">
              Partenaire Logistique
            </span>
          </div>
        </div>
        <div className="text-xs bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-3 py-1.5 rounded-xl font-medium">
          ● Compagnie Active
        </div>
      </header>

      <main className="px-5 pt-6 max-w-4xl mx-auto space-y-8">
        
        {/* Intro */}
        <div>
          <h2 className="text-xl font-semibold text-white tracking-tight">Matrice d'Expédition Dynamique</h2>
          <p className="text-xs text-gray-400 mt-1 leading-relaxed">
            Configurez vos zones tarifaires en croisant les villes de destination et le volume de colis. Le système calculera automatiquement les frais lors du checkout client.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* ================= FORMULAIRE DE CONFIGURATION ================= */}
          <div className="lg:col-span-1 bg-[#12161F] border border-white/[0.05] rounded-2xl p-5 space-y-4 shadow-xl">
            <h3 className="text-sm font-semibold text-white border-b border-white/[0.05] pb-3">
              ➕ Ajouter une règle de trajet
            </h3>
            
            <form onSubmit={handleAddRule} className="space-y-4">
              
              {/* Choix de la Ville */}
              <div className="space-y-1.5">
                <label className="text-[11px] uppercase tracking-wider text-gray-400 font-medium">Destination (Ville)</label>
                <select 
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="w-full bg-[#0B0E14] border border-white/[0.08] focus:border-blue-500 rounded-xl px-3 py-3 text-sm text-white outline-none appearance-none cursor-pointer"
                >
                  {ivorianCities.map((city) => (
                    <option key={city} value={city} className="bg-[#12161F]">{city}</option>
                  ))}
                </select>
              </div>

              {/* Tranche de Quantités */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-[11px] uppercase tracking-wider text-gray-400 font-medium">Qté Min</label>
                  <input 
                    type="number"
                    min="1"
                    value={minQty}
                    onChange={(e) => setMinQty(parseInt(e.target.value) || 1)}
                    className="w-full bg-[#0B0E14] border border-white/[0.08] rounded-xl px-3 py-2.5 text-sm text-white outline-none"
                    required
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[11px] uppercase tracking-wider text-gray-400 font-medium">Qté Max</label>
                  <input 
                    type="number"
                    min={minQty}
                    value={maxQty}
                    onChange={(e) => setMaxQty(parseInt(e.target.value) || minQty)}
                    className="w-full bg-[#0B0E14] border border-white/[0.08] rounded-xl px-3 py-2.5 text-sm text-white outline-none"
                    required
                  />
                </div>
              </div>

              {/* Prix de la livraison */}
              <div className="space-y-1.5">
                <label className="text-[11px] uppercase tracking-wider text-gray-400 font-medium">Tarif de livraison (FCFA)</label>
                <div className="relative">
                  <input 
                    type="number"
                    min="0"
                    step="250"
                    value={deliveryPrice}
                    onChange={(e) => setDeliveryPrice(parseInt(e.target.value) || 0)}
                    className="w-full bg-[#0B0E14] border border-white/[0.08] focus:border-blue-500 rounded-xl pl-4 pr-12 py-3 text-sm text-white outline-none transition-colors"
                    required
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-mono text-gray-500">XOF</span>
                </div>
              </div>

              {/* Bouton de validation */}
              <button 
                type="submit" 
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium text-xs py-3 rounded-xl transition-colors mt-2 shadow-lg shadow-blue-500/10"
              >
                Injecter dans la matrice
              </button>

            </form>
          </div>

          {/* ================= TABLEAU DE VISUALISATION DES TARIFS ================= */}
          <div className="lg:col-span-2 bg-[#12161F] border border-white/[0.04] rounded-2xl p-5 shadow-xl space-y-4">
            <div className="flex justify-between items-center border-b border-white/[0.05] pb-3">
              <h3 className="text-sm font-semibold text-white">Grille Tarifaire Active</h3>
              <span className="text-[11px] text-gray-400">{rules.length} zones configurées</span>
            </div>

            {rules.length === 0 ? (
              <p className="text-xs text-gray-500 text-center py-8">Aucun tarif configuré. Utilisez le panneau latéral pour ajouter votre premier trajet.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-white/[0.03] text-[10px] uppercase tracking-wider text-gray-400 font-mono">
                      <th className="pb-3 pt-1">Ville</th>
                      <th className="pb-3 pt-1">Tranche d'articles</th>
                      <th className="pb-3 pt-1">Frais de livraison</th>
                      <th className="pb-3 pt-1 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/[0.02] text-xs">
                    {rules.map((rule) => (
                      <tr key={rule.id} className="group hover:bg-white/[0.01]">
                        <td className="py-3.5 font-medium text-white flex items-center gap-2">
                          <span className="text-gray-500">📍</span> {rule.city}
                        </td>
                        <td className="py-3.5 text-gray-300">
                          De <span className="font-mono text-blue-400 font-semibold">{rule.minQty}</span> à{" "}
                          <span className="font-mono text-blue-400 font-semibold">{rule.maxQty}</span> articles
                        </td>
                        <td className="py-3.5 text-white font-bold font-mono">
                          {rule.price.toLocaleString()} FCFA
                        </td>
                        <td className="py-3.5 text-right">
                          <button 
                            onClick={() => handleDeleteRule(rule.id)}
                            className="text-red-400/70 hover:text-red-400 text-[11px] font-medium bg-red-500/5 hover:bg-red-500/10 border border-red-500/10 rounded-lg px-2.5 py-1 transition-all"
                          >
                            Retirer
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

        </div>

      </main>
      
    </div>
  );
}
