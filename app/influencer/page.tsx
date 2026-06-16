"use client";

import { useState } from "react";
import Link from "next/link";

// Types pour l'UI
interface Product {
  id: number;
  name: string;
  store: string;
  price: string;
  commission: string;
  image: string;
  tag: string;
  bgGradient: string;
}

// Données simulées (Base pour l'UI)
const initialProducts: Product[] = [
  { id: 1, name: "Robe Moderne Premium", store: "Abidjan Luxe Grossiste", price: "25 000 FCFA", commission: "+5 000 FCFA", image: "👗", tag: "Remise 20%", bgGradient: "from-orange-100 to-orange-200" },
  { id: 2, name: "Électronique de Pointe", store: "Koumassi Tech Gadgets", price: "18 000 FCFA", commission: "+4 000 FCFA", image: "📱", tag: "Livraison Gratuite", bgGradient: "from-blue-100 to-blue-200" },
  { id: 3, name: "Pack Teint Éclat Bio", store: "Cocody Glow Skin", price: "30 000 FCFA", commission: "+7 500 FCFA", image: "✨", tag: "Top Boutique", bgGradient: "from-pink-100 to-pink-200" },
];

const allMarketplaceProducts: Product[] = [
  ...initialProducts,
  { id: 4, name: "Chaussures Cuir Homme", store: "Treichville Chaussures Pro", price: "45 000 FCFA", commission: "+9 000 FCFA", image: "👞", tag: "Populaire", bgGradient: "from-emerald-100 to-emerald-200" },
  { id: 5, name: "Montre Connectée Pro", store: "Koumassi Tech Gadgets", price: "55 000 FCFA", commission: "+11 000 FCFA", image: "⌚", tag: "Nouveau", bgGradient: "from-amber-100 to-amber-200" },
  { id: 6, name: "Tablette Éducative Enfant", store: "Plateau Digital Kids", price: "75 000 FCFA", commission: "+15 000 FCFA", image: "👶", tag: "Recommandé", bgGradient: "from-rose-100 to-rose-200" },
];

export default function InfluencerDashboard() {
  const [activeTab, setActiveTab] = useState<"dashboard" | "boutique" | "paie" | "profil">("dashboard");
  const [selectedProductLink, setSelectedProductLink] = useState<Product | null>(null);
  const [mobileMoneyNumber, setMobileMoneyNumber] = useState("");
  const [mobileMoneyProvider, setMobileMoneyProvider] = useState<"wave" | "orange" | "mtn" | "">("");

  // Génération de lien simulé
  const generateSimulatedLink = (id: number) => `https://bs.ci/crea/${id}?ref=marie_crea_ci`;

  return (
    <div className="min-h-screen bg-[#071020] text-white font-sans antialiased selection:bg-blue-400 selection:text-gray-900 pb-20 relative">
      
      {/* --- 1. HEADER (Identique à image_4.png) --- */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-[#071020]/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-500 flex items-center justify-center text-white text-base">
              ✨
            </div>
            <span className="font-black text-lg tracking-tight">
              Espace <span className="text-blue-400">Influenceur</span> <span className="text-xs text-white/40 px-1.5 py-0.5 rounded-md bg-white/5 border border-white/10 ml-1">CI</span>
            </span>
          </div>
          <Link 
            href="/" 
            className="text-sm font-medium text-white/80 hover:text-white transition px-4 py-2 rounded-xl hover:bg-white/5 border border-white/10"
          >
            Retour au site
          </Link>
        </div>
      </header>

      {/* --- 2. CONTENU PRINCIPAL DYNAMIQUE (Padding top pour header) --- */}
      <main className="pt-20 px-6 max-w-7xl mx-auto">
        
        {/* --- ONGLET : TABLEAU DE BORD (Inspiré de image_4.png, avec infos en plus) --- */}
        {activeTab === "dashboard" && (
          <section className="space-y-10">
            {/* Bannière de Bienvenue */}
            <div className="bg-gradient-to-r from-blue-500/20 to-indigo-600/10 border border-blue-400/20 rounded-2xl p-6">
              <h1 className="text-2xl font-black text-white">Prêt à créer de l'influence ? 🚀</h1>
              <p className="text-white/70 text-xs mt-1">Parcourez les catalogues, récupérez vos liens personnalisés et gagnez de l'argent. Brand Ship CI vous connecte aux meilleurs grossistes.</p>
            </div>

            {/* Grille de stats (Identique à image_4.png) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-[#0d1f3c] border border-white/5 p-5 rounded-2xl flex flex-col justify-between h-36">
                <span className="text-white/40 text-[10px] uppercase font-bold tracking-wider">Clics Accumulés</span>
                <span className="text-4xl font-black text-blue-400">12 450</span>
              </div>
              <div className="bg-[#0d1f3c] border border-white/5 p-5 rounded-2xl flex flex-col justify-between h-36">
                <span className="text-white/40 text-[10px] uppercase font-bold tracking-wider">Ventes Générées</span>
                <span className="text-4xl font-black text-emerald-400">32</span>
              </div>
              <div className="bg-[#0d1f3c] border border-white/5 p-5 rounded-2xl flex flex-col justify-between h-36 relative">
                <span className="text-white/40 text-[10px] uppercase font-bold tracking-wider block">Commissions Gagnées</span>
                <span className="text-4xl font-black text-amber-400 block mt-1 whitespace-nowrap">160 000 <span className="text-sm font-medium">FCFA</span></span>
              </div>
            </div>

            {/* Produits Recommandés (Identique à image_4.png) */}
            <div className="space-y-6">
              <h2 className="text-xl font-black text-white">Produits recommandés pour vos réseaux</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {initialProducts.map((product) => (
                  <div key={product.id} className="bg-[#0d1f3c] border border-white/5 rounded-2xl p-5 hover:border-blue-500/30 transition-all flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${product.bgGradient} flex items-center justify-center text-3xl`}>
                        {product.image}
                      </div>
                      <div>
                        <span className="bg-blue-600/10 text-blue-400 text-[9px] font-bold px-2 py-0.5 rounded-full uppercase">{product.tag}</span>
                        <h4 className="font-bold text-xs text-white mt-1">{product.name}</h4>
                        <p className="text-[10px] text-emerald-400 font-bold mt-0.5">Gain : {product.commission} / vente</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => setSelectedProductLink(product)}
                      className="bg-blue-500 hover:bg-blue-400 text-white font-bold text-[10px] px-3 py-2 rounded-lg transition shrink-0 flex items-center gap-1.5"
                    >
                      🔗 Prendre mon Lien
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* --- ONGLET : BOUTIQUE / MARKETPLACE (Nouveau) --- */}
        {activeTab === "boutique" && (
          <section className="space-y-8">
            <h2 className="text-xl font-black text-white">Marketplace de Produits Grossistes</h2>
            
            {/* Barre de recherche simulée */}
            <div className="bg-[#0d1f3c] border border-white/5 p-4 rounded-xl flex items-center gap-3">
              <span className="text-lg text-white/40">🔍</span>
              <input type="text" placeholder="Rechercher un produit, un grossiste à Adjamé..." className="w-full bg-transparent text-sm focus:outline-none placeholder:text-white/30" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {allMarketplaceProducts.map((product) => (
                  <div key={product.id} className="bg-[#0d1f3c] border border-white/5 rounded-2xl p-5 hover:border-blue-500/30 transition-all flex flex-col justify-between gap-4 relative group">
                    <span className="absolute top-4 right-4 bg-white/5 text-white/40 text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">{product.tag}</span>
                    <div className="flex flex-col gap-3">
                      <div className={`w-full aspect-[4/3] rounded-xl bg-gradient-to-br ${product.bgGradient} flex items-center justify-center text-5xl mb-1`}>
                        {product.image}
                      </div>
                      <h4 className="font-bold text-sm text-white">{product.name}</h4>
                      <p className="text-[11px] text-white/50 leading-tight">Par : {product.store}</p>
                    </div>
                    
                    <div className="flex justify-between items-center border-t border-white/5 pt-3">
                      <div className="text-left">
                        <span className="text-white/40 text-[9px] uppercase font-bold">Prix</span>
                        <div className="text-xs font-black text-white">{product.price}</div>
                      </div>
                      <div className="text-right">
                        <span className="text-emerald-400 text-[9px] uppercase font-bold">Votre gain / vente</span>
                        <div className="text-xs font-black text-emerald-400">{product.commission}</div>
                      </div>
                    </div>

                    <button 
                      onClick={() => setSelectedProductLink(product)}
                      className="w-full bg-blue-500 hover:bg-blue-400 text-white font-bold text-xs py-2.5 rounded-xl transition flex items-center justify-center gap-1.5"
                    >
                      🔗 Prendre mon Lien
                    </button>
                  </div>
              ))}
            </div>
          </section>
        )}

        {/* --- ONGLET : PAIEMENTS (Nouveau) --- */}
        {activeTab === "paie" && (
          <section className="space-y-10">
            <h2 className="text-xl font-black text-white">Espace Gains & Paiements</h2>

            {/* Formulaire Mobile Money */}
            <div className="bg-[#0d1f3c] border border-white/5 p-6 rounded-2xl space-y-4 max-w-lg mx-auto">
              <h3 className="font-bold text-sm text-white">Configurer mon Paiement Mobile Money CI</h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-white/60 text-[10px] font-bold uppercase mb-1">Numéro Mobile Money CI</label>
                  <input 
                    type="tel" 
                    value={mobileMoneyNumber}
                    onChange={(e) => setMobileMoneyNumber(e.target.value)}
                    placeholder="Ex: 07 00 00 00 00" 
                    className="w-full bg-[#071020] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-400" 
                  />
                </div>
                <div className="grid grid-cols-3 gap-2 pt-2">
                  <button onClick={() => setMobileMoneyProvider("wave")} className={`p-2.5 rounded-lg border text-xs font-bold ${mobileMoneyProvider === "wave" ? "border-blue-400 bg-blue-400/10 text-blue-400" : "border-white/10 text-white/40"}`}>🌊 Wave</button>
                  <button onClick={() => setMobileMoneyProvider("orange")} className={`p-2.5 rounded-lg border text-xs font-bold ${mobileMoneyProvider === "orange" ? "border-orange-400 bg-orange-400/10 text-orange-400" : "border-white/10 text-white/40"}`}>🍊 Orange</button>
                  <button onClick={() => setMobileMoneyProvider("mtn")} className={`p-2.5 rounded-lg border text-xs font-bold ${mobileMoneyProvider === "mtn" ? "border-yellow-400 bg-yellow-400/10 text-yellow-400" : "border-white/10 text-white/40"}`}>💛 MTN</button>
                </div>
              </div>
              <button onClick={() => alert("Numéro de paiement enregistré !")} className="w-full bg-amber-400 hover:bg-amber-300 text-gray-900 font-black text-xs py-3 rounded-xl transition">
                Sauvegarder mon mode de paiement
              </button>
            </div>

            {/* Historique simulé */}
            <div className="space-y-4">
              <h4 className="font-bold text-xs text-white">Historique des paiements de commissions reçus</h4>
              <div className="bg-[#0d1f3c] border border-white/5 rounded-xl divide-y divide-white/5 text-xs">
                <div className="p-4 flex justify-between items-center text-emerald-400 font-bold"><span>+50 000 FCFA</span> <span>Transfert Wave (Aujourd'hui)</span> <span className="text-white/40 text-[10px]">16 Juin 2026</span></div>
                <div className="p-4 flex justify-between items-center text-emerald-400 font-bold"><span>+110 000 FCFA</span> <span>Transfert Wave</span> <span className="text-white/40 text-[10px]">10 Juin 2026</span></div>
              </div>
            </div>
          </section>
        )}

        {/* --- ONGLET : PROFIL (Nouveau) --- */}
        {activeTab === "profil" && (
          <section className="text-center max-w-lg mx-auto space-y-6 pt-6 pb-12">
            <div className="w-20 h-20 rounded-full bg-blue-500/10 border-4 border-blue-400 flex items-center justify-center text-3xl font-black text-blue-400 mx-auto">M</div>
            <div className="space-y-1">
              <h2 className="text-xl font-black text-white">Marie Créatrice CI</h2>
              <p className="text-xs text-white/60">marie@createur-ci.com · Abidjan, Côte d'Ivoire</p>
            </div>
            <button onClick={() => alert("Modifications sauvegardées !")} className="bg-[#0d1f3c] hover:bg-[#13284f] border border-white/10 text-white font-bold text-xs px-6 py-2 rounded-xl transition">
              Modifier mes paramètres de profil
            </button>
          </section>
        )}
      </main>

      {/* =========================================================
          🔥 MODAL PREMUM : GESTIONNAIRE DE LIEN & SHARE HUB
          ========================================================= */}
      {selectedProductLink && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-end justify-center transition-opacity animate-fadeIn">
          <div className="w-full max-w-lg bg-[#0d1f3c] border-t border-white/10 rounded-t-[2.5rem] p-6 sm:p-8 overflow-y-auto max-h-[85vh] flex flex-col justify-between shadow-2xl text-white">
            
            {/* Haut de page & fermeture */}
            <div>
              <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
                <div>
                  <span className="text-[10px] bg-blue-400/10 text-blue-400 font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">Lien d'Affiliation</span>
                  <h2 className="text-lg font-black mt-1">Générer & Partager</h2>
                </div>
                <button 
                  onClick={() => setSelectedProductLink(null)}
                  className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-white/60 hover:text-white transition"
                >
                  ✕
                </button>
              </div>

              {/* Rappel du produit sélectionné */}
              <div className="bg-[#071020] rounded-2xl p-4 border border-white/5 space-y-2 mb-6 flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${selectedProductLink.bgGradient} flex items-center justify-center text-2xl`}>
                  {selectedProductLink.image}
                </div>
                <div>
                  <h3 className="font-black text-sm text-white mb-0.5">{selectedProductLink.name}</h3>
                  <p className="text-[10px] text-emerald-400 font-medium">Gain de commission : {selectedProductLink.commission} / vente</p>
                </div>
              </div>

              {/* Zone d'affichage du Lien & QR Code */}
              <div className="space-y-4 pt-2">
                <div>
                  <label className="block text-white/60 text-[10px] font-bold uppercase mb-1">Votre lien personnalisé simulé</label>
                  <div className="flex items-center gap-2">
                    <input 
                      type="text" 
                      value={generateSimulatedLink(selectedProductLink.id)} 
                      className="w-full bg-[#071020] border border-white/10 rounded-xl px-4 py-2 text-xs text-white/80 focus:outline-none" 
                      readOnly
                    />
                    <button 
                      onClick={() => { navigator.clipboard.writeText(generateSimulatedLink(selectedProductLink.id)); alert("Lien copié !"); }} 
                      className="bg-blue-500 hover:bg-blue-400 text-white font-bold text-xs px-4 py-2 rounded-xl transition"
                    >
                      Copier
                    </button>
                  </div>
                </div>

                <div className="p-4 bg-white text-gray-900 rounded-2xl flex flex-col items-center justify-center space-y-2 text-center">
                  <div className="w-24 h-24 bg-gray-200 border-4 border-gray-900 flex items-center justify-center font-black text-xs p-2">
                    [ QR CODE SIMULÉ ]
                  </div>
                  <span className="text-[9px] text-gray-500 font-bold uppercase tracking-wider">Scannez pour partager instantanément</span>
                </div>
              </div>
            </div>

            {/* Actions de partage social */}
            <div className="pt-6 border-t border-white/10 space-y-3">
              <h4 className="font-bold text-center text-xs text-white">Partager directement sur :</h4>
              <div className="grid grid-cols-4 gap-3 text-2xl">
                <button onClick={() => alert("Partage simulé WhatsApp")} className="p-3 bg-green-600 rounded-xl">🟢</button>
                <button onClick={() => alert("Partage simulé TikTok")} className="p-3 bg-gray-800 rounded-xl">📱</button>
                <button onClick={() => alert("Partage simulé Insta")} className="p-3 bg-pink-600 rounded-xl">📸</button>
                <button onClick={() => alert("Partage simulé Facebook")} className="p-3 bg-blue-700 rounded-xl">📘</button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* =========================================================
          🔥 BARRE DE NAVIGATION INFÉRIEURE (WEB APP UI)
          ========================================================= */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 bg-[#0d1f3c]/90 backdrop-blur-md border-t border-white/5 px-6 pt-2 pb-5 text-gray-400">
        <div className="flex items-center justify-around">
          <button onClick={() => setActiveTab("dashboard")} className={`flex flex-col items-center gap-1.5 p-2 ${activeTab === "dashboard" ? "text-blue-400" : ""}`}>
            <span className="text-xl">🏠</span>
            <span className="text-[10px] font-bold">Accueil</span>
          </button>
          <button onClick={() => setActiveTab("boutique")} className={`flex flex-col items-center gap-1.5 p-2 ${activeTab === "boutique" ? "text-blue-400" : ""}`}>
            <span className="text-xl">Marketplace</span>
            <span className="text-[10px] font-bold">Boutique</span>
          </button>
          <button onClick={() => setActiveTab("paie")} className={`flex flex-col items-center gap-1.5 p-2 ${activeTab === "paie" ? "text-blue-400" : ""}`}>
            <span className="text-xl">FCFA</span>
            <span className="text-[10px] font-bold">Gains</span>
          </button>
          <button onClick={() => setActiveTab("profil")} className={`flex flex-col items-center gap-1.5 p-2 ${activeTab === "profil" ? "text-blue-400" : ""}`}>
            <span className="text-xl">👤 Profil</span>
            <span className="text-[10px] font-bold">Compte</span>
          </button>
        </div>
      </nav>

    </div>
  );
}
