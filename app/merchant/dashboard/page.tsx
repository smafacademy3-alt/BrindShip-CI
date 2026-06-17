"use client";

import { useState, useEffect } from "react";

// --- Types pour les données simulées ---
type StockVariation = { id: number; message: string; type: "add" | "remove"; time: string };
type Affiliate = { id: number; name: string; date: string; status: "En cours" | "Livré" };

export default function GrossisteDashboard() {
  // --- États (State) pour les KPIs ---
  const [activeArticles, setActiveArticles] = useState<number>(2);
  const [networkOrders, setNetworkOrders] = useState<number>(3);
  const [disputes, setDisputes] = useState<number>(0);

  // --- États pour les listes dynamiques ---
  const [stockVariations, setStockVariations] = useState<StockVariation[]>([
    { id: 1, message: "+50 Robes Soirée Premium", type: "add", time: "Il y a 2 min" },
    { id: 2, message: "-12 Écouteurs Sans Fil", type: "remove", time: "Il y a 15 min" },
    { id: 3, message: "+100 Montres Connectées", type: "add", time: "Il y a 1h" },
  ]);

  const [topAffiliates, setTopAffiliates] = useState<Affiliate[]>([
    { id: 1, name: "Marie_Boutique", date: "Aujourd'hui, 14:30", status: "En cours" },
    { id: 2, name: "Inoussa_Tech", date: "Aujourd'hui, 10:15", status: "Livré" },
    { id: 3, name: "Awa_Style", date: "Hier, 16:45", status: "Livré" },
  ]);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // --- Simulation Temps Réel (WebSockets Mock) ---
  useEffect(() => {
    const interval = setInterval(() => {
      // 1. Aléatoirement incrémenter les commandes réseau
      if (Math.random() > 0.6) {
        setNetworkOrders((prev) => prev + 1);
        
        // Ajouter un nouvel apporteur d'affaires en tête de liste
        const newAffiliate: Affiliate = {
          id: Date.now(),
          name: `Revendeur_${Math.floor(Math.random() * 1000)}`,
          date: "À l'instant",
          status: "En cours",
        };
        setTopAffiliates((prev) => [newAffiliate, ...prev].slice(0, 4)); // Garder les 4 derniers
      }

      // 2. Aléatoirement simuler un mouvement de stock
      if (Math.random() > 0.7) {
        const isAddition = Math.random() > 0.5;
        const newVariation: StockVariation = {
          id: Date.now(),
          message: isAddition ? `+${Math.floor(Math.random() * 20) + 1} Nouveaux articles` : `-${Math.floor(Math.random() * 5) + 1} Articles expédiés`,
          type: isAddition ? "add" : "remove",
          time: "À l'instant",
        };
        setStockVariations((prev) => [newVariation, ...prev].slice(0, 4)); // Garder les 4 derniers
        
        // Légère fluctuation des articles actifs
        if (isAddition) setActiveArticles((prev) => prev + 1);
      }

      // 3. Rarement simuler un litige
      if (Math.random() > 0.95) {
        setDisputes((prev) => prev + 1);
      }
    }, 4000); // Mise à jour simulée toutes les 4 secondes

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[#0B0E14] text-[#F8FAFC] font-sans antialiased pb-12">
      
      {/* ================= HEADER ================= */}
      <header className="sticky top-0 z-50 bg-[#0B0E14]/90 backdrop-blur-md border-b border-white/[0.05] px-5 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Icône Logo */}
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-lg shadow-orange-500/20">
            <span className="text-xl">🏪</span>
          </div>
          <div>
            <h1 className="font-semibold text-[15px] leading-tight text-white">Abidjan Luxe Grossiste</h1>
            <span className="text-[10px] font-mono text-amber-500 font-bold tracking-widest uppercase block mt-0.5">
              Espace Grossiste
            </span>
          </div>
        </div>

        {/* Menu Burger */}
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="w-10 h-10 flex flex-col items-center justify-center gap-1.5 rounded-xl border border-white/[0.08] hover:bg-white/[0.05] transition-colors focus:outline-none"
          aria-label="Menu"
        >
          <span className={`w-5 h-0.5 bg-white rounded transition-transform ${isMenuOpen ? "translate-y-2 rotate-45" : ""}`}></span>
          <span className={`w-5 h-0.5 bg-white rounded transition-opacity ${isMenuOpen ? "opacity-0" : ""}`}></span>
          <span className={`w-5 h-0.5 bg-white rounded transition-transform ${isMenuOpen ? "-translate-y-2 -rotate-45" : ""}`}></span>
        </button>
      </header>

      {/* ================= MAIN CONTENT ================= */}
      <main className="px-5 pt-6 max-w-5xl mx-auto space-y-6">
        
        {/* Titre & Description */}
        <section className="bg-[#12161F] border border-white/[0.04] rounded-2xl p-6 shadow-sm">
          <h2 className="text-2xl font-light text-white mb-2 tracking-tight">Gestionnaire de Flux Grossiste</h2>
          <p className="text-sm text-gray-400 leading-relaxed max-w-2xl">
            Supervisez l'évolution de vos stocks d'entrepôt et l'activité commerciale de vos apporteurs d'affaires en temps réel.
          </p>
        </section>

        {/* KPIs - Cartes en Temps Réel */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          {/* Carte 1 : Articles Actifs */}
          <div className="bg-[#12161F] border border-white/[0.04] rounded-2xl p-5 flex flex-col justify-between relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-1 bg-amber-400/20"></div>
            <h3 className="text-[10px] text-gray-500 uppercase font-mono tracking-widest mb-3">Articles Actifs</h3>
            <p className="text-4xl font-light text-amber-400 animate-pulse-fast">
              {activeArticles}
            </p>
          </div>

          {/* Carte 2 : Commandes Réseau */}
          <div className="bg-[#12161F] border border-white/[0.04] rounded-2xl p-5 flex flex-col justify-between relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-1 bg-[#00E676]/20"></div>
            <h3 className="text-[10px] text-gray-500 uppercase font-mono tracking-widest mb-3">Commandes Réseau</h3>
            <p className="text-4xl font-light text-[#00E676] transition-all duration-300">
              {networkOrders}
            </p>
          </div>

          {/* Carte 3 : Litiges / Retours */}
          <div className="bg-[#12161F] border border-white/[0.04] rounded-2xl p-5 flex flex-col justify-between relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-1 bg-[#FF5252]/20"></div>
            <h3 className="text-[10px] text-gray-500 uppercase font-mono tracking-widest mb-3">Litiges / Retours</h3>
            <p className="text-4xl font-light text-[#FF5252]">
              {disputes}
            </p>
          </div>

        </section>

        {/* Sections Dynamiques Fonctionnelles */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
          
          {/* Section A : Flux d'Entrepôt */}
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium text-white flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-500 animate-ping"></span>
                Flux d'Entrepôt
              </h3>
              <span className="text-[10px] text-gray-500 uppercase tracking-wider">Temps Réel</span>
            </div>
            
            <div className="bg-[#12161F] border border-white/[0.04] rounded-2xl overflow-hidden divide-y divide-white/[0.02]">
              {stockVariations.map((item) => (
                <div key={item.id} className="p-4 flex items-center justify-between hover:bg-white/[0.01] transition-colors">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-lg ${item.type === "add" ? "bg-blue-500/10 text-blue-400" : "bg-orange-500/10 text-orange-400"}`}>
                      {item.type === "add" ? "📦" : "🚚"}
                    </div>
                    <div>
                      <p className={`text-sm font-medium ${item.type === "add" ? "text-gray-200" : "text-gray-400"}`}>
                        {item.message}
                      </p>
                    </div>
                  </div>
                  <span className="text-[10px] text-gray-500 whitespace-nowrap">{item.time}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Section B : Top Apporteurs d'Affaires */}
          <section className="space-y-4">
            <h3 className="text-sm font-medium text-white">Activité du Réseau</h3>
            
            <div className="bg-[#12161F] border border-white/[0.04] rounded-2xl overflow-hidden divide-y divide-white/[0.02]">
              {topAffiliates.map((affiliate) => (
                <div key={affiliate.id} className="p-4 flex items-center justify-between hover:bg-white/[0.01] transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-white/[0.05] border border-white/[0.1] flex items-center justify-center text-[10px] font-bold text-gray-400">
                      {affiliate.name.substring(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-200">{affiliate.name}</p>
                      <p className="text-[10px] text-gray-500 mt-0.5">{affiliate.date}</p>
                    </div>
                  </div>
                  
                  {/* Badge de statut */}
                  <div className={`px-2.5 py-1 rounded-md text-[10px] font-mono font-medium ${
                    affiliate.status === "Livré" 
                      ? "bg-[#00E676]/10 text-[#00E676] border border-[#00E676]/20" 
                      : "bg-amber-400/10 text-amber-400 border border-amber-400/20"
                  }`}>
                    {affiliate.status}
                  </div>
                </div>
              ))}
            </div>
          </section>

        </div>
      </main>
    </div>
  );
}
