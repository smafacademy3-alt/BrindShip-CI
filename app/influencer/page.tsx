"use client";

import { useState } from "react";
import Link from "next/link";

interface Product {
  id: number;
  name: string;
  store: string;
  price: string;
  commission: string;
  image: string;
  category: "mode" | "tech" | "beaute";
}

const ALL_PRODUCTS: Product[] = [
  { id: 1, name: "Robe Moderne Premium", store: "Abidjan Luxe Grossiste", price: "25 000 FCFA", commission: "5 000 FCFA", image: "👗", category: "mode" },
  { id: 2, name: "Électronique de Pointe", store: "Koumassi Tech Gadgets", price: "18 000 FCFA", commission: "4 000 FCFA", image: "📱", category: "tech" },
  { id: 3, name: "Pack Teint Éclat Bio", store: "Cocody Glow Skin", price: "30 000 FCFA", commission: "7 500 FCFA", image: "✨", category: "beaute" },
  { id: 4, name: "Chaussures Cuir Homme", store: "Treichville Chaussures Pro", price: "45 000 FCFA", commission: "9 000 FCFA", image: "👞", category: "mode" },
  { id: 5, name: "Montre Connectée Pro", store: "Koumassi Tech Gadgets", price: "55 000 FCFA", commission: "11 000 FCFA", image: "⌚", category: "tech" },
  { id: 6, name: "Crème Hydratante Shea", store: "Plateau Cosmetique", price: "15 000 FCFA", commission: "3 500 FCFA", image: "🧴", category: "beaute" },
];

export default function PremiumInfluencerDashboard() {
  const [activeTab, setActiveTab] = useState<"dashboard" | "marketplace" | "gains" | "profil">("dashboard");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const [marketFilter, setMarketFilter] = useState<"all" | "mode" | "tech" | "beaute">("all");
  
  // États financiers
  const [momoNumber, setMomoNumber] = useState("");
  const [momoProvider, setMomoProvider] = useState<"wave" | "orange" | "mtn" | "">("");

  const handleCopyLink = (id: number) => {
    navigator.clipboard.writeText(`https://brandship.ci/share/${id}?ref=marie_crea`);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filteredProducts = marketFilter === "all" 
    ? ALL_PRODUCTS 
    : ALL_PRODUCTS.filter(p => p.category === marketFilter);

  return (
    <div className="min-h-screen bg-[#070b13] text-[#f8fafc] font-sans antialiased selection:bg-blue-500/30 selection:text-white">
      
      {/* --- HEADER ÉPURÉ & BURGER --- */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#070b13]/80 backdrop-blur-xl border-b border-white/[0.04] px-4 sm:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-sm shadow-md shadow-blue-500/10">
            ✨
          </div>
          <span className="font-semibold text-sm tracking-tight">
            BrandShip <span className="text-blue-400 font-light">Influencer</span>
          </span>
        </div>

        <div className="flex items-center gap-4">
          <Link href="/" className="hidden sm:inline-block text-xs text-white/50 hover:text-white transition-colors">
            Retour au site
          </Link>
          
          {/* Bouton Burger Minimaliste */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="w-10 h-10 flex flex-col items-center justify-center gap-1.5 rounded-xl bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.05] transition-all relative z-50 focus:outline-none"
            aria-label="Menu"
          >
            <span className={`w-5 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? "rotate-45 translate-y-2" : ""}`}></span>
            <span className={`w-5 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? "opacity-0" : ""}`}></span>
            <span className={`w-5 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? "-rotate-45 -translate-y-2" : ""}`}></span>
          </button>
        </div>
      </header>

      {/* --- DOUBLE STRUCTURE : TIROIR MENU BURGER OVERLAY --- */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 bg-[#070b13]/95 backdrop-blur-2xl flex flex-col justify-center px-8 space-y-6 animate-fadeIn">
          <div className="flex flex-col space-y-6 text-2xl font-light tracking-wide max-w-sm mx-auto w-full">
            <button 
              onClick={() => { setActiveTab("dashboard"); setIsMenuOpen(false); }}
              className={`text-left py-2 border-b border-white/[0.03] transition-colors ${activeTab === "dashboard" ? "text-blue-400 font-normal" : "text-white/60 hover:text-white"}`}
            >
              📊 Vue d'ensemble
            </button>
            <button 
              onClick={() => { setActiveTab("marketplace"); setIsMenuOpen(false); }}
              className={`text-left py-2 border-b border-white/[0.03] transition-colors ${activeTab === "marketplace" ? "text-blue-400 font-normal" : "text-white/60 hover:text-white"}`}
            >
              🛍️ Marketplace Grossistes
            </button>
            <button 
              onClick={() => { setActiveTab("gains"); setIsMenuOpen(false); }}
              className={`text-left py-2 border-b border-white/[0.03] transition-colors ${activeTab === "gains" ? "text-blue-400 font-normal" : "text-white/60 hover:text-white"}`}
            >
              💰 Retraits & Commissions
            </button>
            <button 
              onClick={() => { setActiveTab("profil"); setIsMenuOpen(false); }}
              className={`text-left py-2 border-b border-white/[0.03] transition-colors ${activeTab === "profil" ? "text-blue-400 font-normal" : "text-white/60 hover:text-white"}`}
            >
              👤 Profil & Réseaux
            </button>
            <Link href="/" className="text-left text-sm text-white/30 pt-4 hover:text-white transition-colors">
              ➔ Quitter l'espace
            </Link>
          </div>
        </div>
      )}

      {/* --- CONTENU PRINCIPAL --- */}
      <main className="pt-24 px-4 sm:px-8 pb-12 max-w-5xl mx-auto w-full min-h-screen">
        
        {/* ==========================================
            TAB 1 : TABLEAU DE BORD ACCUEIL
            ========================================== */}
        {activeTab === "dashboard" && (
          <div className="space-y-8 animate-fadeIn">
            {/* Message d'accueil ultra-clean */}
            <div className="border border-white/[0.03] bg-gradient-to-b from-white/[0.02] to-transparent rounded-2xl p-6">
              <span className="text-xs text-blue-400 uppercase tracking-widest font-mono">Statut du compte : Actif</span>
              <h1 className="text-xl sm:text-2xl font-light mt-1 text-white">Ravi de vous revoir, Créateur.</h1>
              <p className="text-white/40 text-xs mt-2 max-w-xl">Suivez vos performances en direct. Partagez vos liens uniques sur TikTok, Instagram ou WhatsApp pour générer des revenus automatisés.</p>
            </div>

            {/* Grille de statistiques minimaliste */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-[#0c1220]/40 border border-white/[0.03] rounded-xl p-5">
                <p className="text-[10px] text-white/40 uppercase tracking-wider font-medium">Clics mesurés</p>
                <p className="text-3xl font-light mt-2 text-blue-400">12 450</p>
              </div>
              <div className="bg-[#0c1220]/40 border border-white/[0.03] rounded-xl p-5">
                <p className="text-[10px] text-white/40 uppercase tracking-wider font-medium">Commandes passées</p>
                <p className="text-3xl font-light mt-2 text-emerald-400">32</p>
              </div>
              <div className="bg-[#0c1220]/40 border border-white/[0.03] rounded-xl p-5">
                <p className="text-[10px] text-white/40 uppercase tracking-wider font-medium">Fonds disponibles</p>
                <p className="text-3xl font-light mt-2 text-amber-400">160 000 <span className="text-xs font-mono">FCFA</span></p>
              </div>
            </div>

            {/* Recommandations rapides */}
            <div className="space-y-4 pt-4">
              <h3 className="text-xs text-white/40 uppercase tracking-widest font-mono">Sélection Prioritaire</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {ALL_PRODUCTS.slice(0, 2).map(product => (
                  <div key={product.id} className="bg-[#0c1220]/20 border border-white/[0.03] rounded-xl p-4 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg bg-white/[0.02] border border-white/[0.05] flex items-center justify-center text-2xl">{product.image}</div>
                      <div>
                        <h4 className="text-xs font-medium text-white">{product.name}</h4>
                        <p className="text-[11px] text-emerald-400 font-mono mt-0.5">+{product.commission} / vente</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => handleCopyLink(product.id)}
                      className="bg-white/5 hover:bg-white/10 text-white border border-white/10 text-[10px] px-3 py-2 rounded-lg transition-colors font-mono"
                    >
                      {copiedId === product.id ? "Copié ✓" : "Prendre"}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ==========================================
            TAB 2 : MARKETPLACE DE PRODUITS
            ========================================== */}
        {activeTab === "marketplace" && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/[0.03] pb-4">
              <div>
                <h2 className="text-base font-medium">Catalogue Grossiste Affilié</h2>
                <p className="text-xs text-white/40">Générez un lien d'affiliation instantané pour chaque produit.</p>
              </div>
              
              {/* Filtres épurés */}
              <div className="flex gap-2 overflow-x-auto pb-1 font-mono text-[10px]">
                {(["all", "mode", "tech", "beaute"] as const).map(f => (
                  <button 
                    key={f}
                    onClick={() => setMarketFilter(f)}
                    className={`px-3 py-1.5 rounded-lg border transition-all uppercase ${marketFilter === f ? "border-blue-500 bg-blue-500/10 text-blue-400" : "border-white/[0.05] text-white/40"}`}
                  >
                    {f === "all" ? "Tout" : f}
                  </button>
                ))}
              </div>
            </div>

            {/* Grille Produits */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {filteredProducts.map(product => (
                <div key={product.id} className="bg-[#0c1220]/20 border border-white/[0.03] rounded-xl p-4 flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    <div className="aspect-[4/3] w-full rounded-lg bg-white/[0.01] border border-white/[0.03] flex items-center justify-center text-4xl">
                      {product.image}
                    </div>
                    <div>
                      <span className="text-[9px] text-white/30 block tracking-wide font-mono uppercase">{product.store}</span>
                      <h4 className="text-xs font-medium text-white mt-0.5">{product.name}</h4>
                    </div>
                  </div>
                  
                  <div className="border-t border-white/[0.03] pt-3 flex items-center justify-between">
                    <div>
                      <span className="text-[9px] text-white/30 block uppercase font-mono">Commission</span>
                      <span className="text-xs font-semibold font-mono text-emerald-400">+{product.commission}</span>
                    </div>
                    <button 
                      onClick={() => setSelectedProduct(product)}
                      className="bg-blue-600 hover:bg-blue-500 text-white text-[10px] font-medium px-3 py-2 rounded-lg transition-colors"
                    >
                      🔗 Partager
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ==========================================
            TAB 3 : GESTION DES GAINS (FCFA)
            ========================================== */}
        {activeTab === "gains" && (
          <div className="space-y-8 animate-fadeIn max-w-md mx-auto">
            <div>
              <h2 className="text-base font-medium">Retraits & Portefeuille</h2>
              <p className="text-xs text-white/40">Configurez votre canal de réception Mobile Money local en Côte d'Ivoire.</p>
            </div>

            {/* Formulaire de paiement épuré */}
            <div className="bg-[#0c1220]/20 border border-white/[0.03] rounded-2xl p-6 space-y-5">
              <div className="space-y-2">
                <label className="text-[10px] font-mono text-white/40 uppercase tracking-wider block">Numéro Mobile Money (CI)</label>
                <input 
                  type="tel"
                  placeholder="Ex: 07 87 00 00 00"
                  value={momoNumber}
                  onChange={(e) => setMomoNumber(e.target.value)}
                  className="w-full h-11 bg-[#070b13] border border-white/[0.05] focus:border-blue-500 rounded-xl px-4 text-xs text-white placeholder:text-white/20 focus:outline-none transition-colors font-mono"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-mono text-white/40 uppercase tracking-wider block">Opérateur Réseau</label>
                <div className="grid grid-cols-3 gap-2 font-mono text-xs">
                  <button onClick={() => setMomoProvider("wave")} className={`h-10 rounded-xl border transition-all ${momoProvider === "wave" ? "border-blue-400 bg-blue-400/10 text-blue-400" : "border-white/[0.05] text-white/30"}`}>Wave</button>
                  <button onClick={() => setMomoProvider("orange")} className={`h-10 rounded-xl border transition-all ${momoProvider === "orange" ? "border-orange-400 bg-orange-400/10 text-orange-400" : "border-white/[0.05] text-white/30"}`}>Orange</button>
                  <button onClick={() => setMomoProvider("mtn")} className={`h-10 rounded-xl border transition-all ${momoProvider === "mtn" ? "border-yellow-400 bg-yellow-400/10 text-yellow-400" : "border-white/[0.05] text-white/30"}`}>MTN</button>
                </div>
              </div>

              <button 
                onClick={() => alert("Paramètres de paiement mis à jour")}
                className="w-full h-11 bg-white hover:bg-white/90 text-gray-950 font-medium text-xs rounded-xl transition-all shadow-md shadow-white/5"
              >
                Sauvegarder le mode de paiement
              </button>
            </div>

            {/* Liste historique épurée */}
            <div className="space-y-3">
              <h4 className="text-[10px] font-mono text-white/40 uppercase tracking-widest">Flux des Retraits Validés</h4>
              <div className="bg-[#0c1220]/10 border border-white/[0.03] rounded-xl divide-y divide-white/[0.03] text-xs font-mono">
                <div className="p-4 flex justify-between items-center"><span className="text-emerald-400">+50 000 FCFA</span> <span className="text-white/30 text-[10px]">16 Juin 2026</span></div>
                <div className="p-4 flex justify-between items-center"><span className="text-emerald-400">+110 000 FCFA</span> <span className="text-white/30 text-[10px]">10 Juin 2026</span></div>
              </div>
            </div>
          </div>
        )}

        {/* ==========================================
            TAB 4 : PROFIL & RESEAUX
            ========================================== */}
        {activeTab === "profil" && (
          <div className="space-y-6 animate-fadeIn max-w-sm mx-auto text-center pt-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-500 text-white font-light text-xl flex items-center justify-center mx-auto shadow-xl shadow-blue-500/10">
              M
            </div>
            <div>
              <h2 className="text-base font-medium">Marie Créatrice CI</h2>
              <p className="text-xs text-white/40 font-mono mt-0.5">ID Affilié : #94827</p>
            </div>

            <div className="bg-[#0c1220]/20 border border-white/[0.03] rounded-xl p-4 text-left space-y-3 text-xs">
              <div className="flex justify-between border-b border-white/[0.03] pb-2 text-white/50"><span>E-mail</span> <span className="text-white">marie@createur-ci.com</span></div>
              <div className="flex justify-between border-b border-white/[0.03] pb-2 text-white/50"><span>Région</span> <span className="text-white">Abidjan, CI</span></div>
              <div className="flex justify-between text-white/50"><span>Taux fixe</span> <span className="text-emerald-400 font-mono">100% Direct</span></div>
            </div>
          </div>
        )}
      </main>

      {/* =========================================================
          🔥 OVERLAY MODAL ÉPURÉ : LIEN & SHARE HUB
          ========================================================= */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 bg-[#070b13]/80 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
          <div className="w-full max-w-md bg-[#0c1220] border border-white/[0.05] rounded-2xl p-6 space-y-5 shadow-2xl text-white">
            <div className="flex items-center justify-between border-b border-white/[0.04] pb-3">
              <span className="text-[10px] font-mono tracking-widest text-blue-400 uppercase">Partage Tracker</span>
              <button onClick={() => setSelectedProduct(null)} className="text-white/40 hover:text-white text-xs">Fermer ✕</button>
            </div>

            <div className="flex items-center gap-3 bg-[#070b13]/40 p-3 rounded-xl border border-white/[0.03]">
              <span className="text-3xl">{selectedProduct.image}</span>
              <div>
                <h4 className="text-xs font-medium">{selectedProduct.name}</h4>
                <p className="text-[10px] text-emerald-400 font-mono mt-0.5">Gain net : +{selectedProduct.commission} / vente</p>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[9px] font-mono text-white/40 uppercase tracking-wider block">Lien commercial unique</label>
              <div className="flex gap-2">
                <input 
                  type="text" 
                  value={`https://brandship.ci/share/${selectedProduct.id}?ref=marie_crea`}
                  className="w-full h-10 bg-[#070b13] border border-white/[0.05] rounded-lg px-3 text-[11px] text-white/70 font-mono focus:outline-none"
                  readOnly
                />
                <button 
                  onClick={() => handleCopyLink(selectedProduct.id)}
                  className="bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs px-4 rounded-lg transition-colors shrink-0"
                >
                  {copiedId === selectedProduct.id ? "Copié !" : "Copier"}
                </button>
              </div>
            </div>

            <div className="space-y-2 pt-2">
              <span className="text-[9px] font-mono text-white/40 uppercase tracking-wider block text-center">Canaux recommandés</span>
              <div className="grid grid-cols-4 gap-2 text-xs font-mono text-center">
                <div onClick={() => alert("Lien préparé pour WhatsApp")} className="p-2.5 bg-white/[0.02] border border-white/[0.05] rounded-xl hover:bg-white/[0.05] cursor-pointer transition-colors">WhatsApp</div>
                <div onClick={() => alert("Lien préparé pour TikTok")} className="p-2.5 bg-white/[0.02] border border-white/[0.05] rounded-xl hover:bg-white/[0.05] cursor-pointer transition-colors">TikTok</div>
                <div onClick={() => alert("Lien préparé pour Instagram")} className="p-2.5 bg-white/[0.02] border border-white/[0.05] rounded-xl hover:bg-white/[0.05] cursor-pointer transition-colors">Insta</div>
                <div onClick={() => alert("Lien préparé pour Facebook")} className="p-2.5 bg-white/[0.02] border border-white/[0.05] rounded-xl hover:bg-white/[0.05] cursor-pointer transition-colors">FB</div>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
