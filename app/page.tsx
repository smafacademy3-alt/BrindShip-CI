"use client";

import { useState } from "react";
import Link from "next/link";

interface Product {
  id: number;
  name: string;
  store: string;
  influencer: string;
  price: string;
  commission: string;
  image: string;
  tag: string;
  bgGradient: string;
  desc: string;
}

export default function HomePage() {
  const [activeAdTab, setActiveAdTab] = useState<"products" | "stores">("products");
  
  // États UI/UX pour l'expérience d'achat interactive
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [paymentMethod, setPaymentMethod] = useState<"delivery" | "qrcode">("delivery");

  // Données des produits publicitaires de la maquette
  const adProducts: Product[] = [
    {
      id: 1,
      name: "Robe Moderne Premium",
      store: "Abidjan Luxe Grossiste",
      influencer: "Marie_Boutique_CI",
      price: "25 000 FCFA",
      commission: "+5 000 FCFA",
      image: "👗",
      tag: "Remise 20%",
      bgGradient: "from-orange-100 to-orange-200",
      desc: "Confection haut de gamme, idéale pour vos sorties et cérémonies à Abidjan."
    },
    {
      id: 2,
      name: "Électronique de Pointe",
      store: "Koumassi Tech Gadgets",
      influencer: "Inoussa_Tech_Vibe",
      price: "18 000 FCFA",
      commission: "+4 000 FCFA",
      image: "📱",
      tag: "Livraison Gratuite",
      bgGradient: "from-blue-100 to-blue-200",
      desc: "Garantie 24 mois. Import direct, livré complet avec tous les accessoires."
    },
    {
      id: 3,
      name: "Pack Teint Éclat Bio",
      store: "Cocody Glow Skin",
      influencer: "Aicha_Glow_Secrets",
      price: "30 000 FCFA",
      commission: "+7 500 FCFA",
      image: "✨",
      tag: "Top Boutique",
      bgGradient: "from-pink-100 to-pink-200",
      desc: "Gamme complète de soins naturels pour sublimer l'éclat de votre peau."
    }
  ];

  const adStores = [
    {
      id: 1,
      name: "Abidjan Grossiste Choc",
      desc: "Spécialiste Mode & Prêt-à-porter à Adjamé. Plus de 500 articles disponibles.",
      image: "🏪",
      tag: "Vérifié",
      bgGradient: "from-amber-100 to-amber-200"
    },
    {
      id: 2,
      name: "Koumassi Tech Hub",
      desc: "Importateur direct d'électronique, smartphones et accessoires connectés.",
      image: "⚡",
      tag: "Premium",
      bgGradient: "from-indigo-100 to-indigo-200"
    }
  ];

  const toggleFavorite = (productId: number, e: React.MouseEvent) => {
    e.stopPropagation(); // Évite d'ouvrir le volet produit en cliquant sur le cœur
    setFavorites(prev => 
      prev.includes(productId) ? prev.filter(id => id !== productId) : [...prev, productId]
    );
  };

  return (
    <div className="min-h-screen bg-[#071020] text-white font-sans antialiased selection:bg-amber-400 selection:text-gray-900 relative">
      
      {/* --- EN-TÊTE / NAVBAR --- */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-[#071020]/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-400 flex items-center justify-center">
              <span className="text-gray-900 font-black text-xs">⚡</span>
            </div>
            <span className="font-black text-lg tracking-tight">
              Brand <span className="text-amber-400">Ship</span> <span className="text-xs text-white/40 px-1.5 py-0.5 rounded-md bg-white/5 border border-white/10 ml-1">CI</span>
            </span>
          </div>

          <div className="flex items-center gap-4">
            <Link 
              href="/login" 
              className="text-sm font-medium text-white/80 hover:text-white transition px-4 py-2 rounded-xl hover:bg-white/5"
            >
              Se connecter
            </Link>
            <Link 
              href="/register" 
              className="bg-amber-400 hover:bg-amber-300 text-gray-900 font-bold text-xs px-5 py-2.5 rounded-xl transition shadow-lg shadow-amber-400/20"
            >
              Commencez gratuitement &gt;
            </Link>
          </div>
        </div>
      </header>

      {/* --- STRUCTURE PRINCIPALE --- */}
      <main className="pt-16">
        
        {/* SECTION HERO ET ENCADRÉ PUBLICITAIRE (Double colonne) */}
        <section className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Colonne Gauche (Sombre - Hero Text) */}
          <div className="lg:col-span-5 flex flex-col justify-center space-y-8 pr-4">
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl font-black tracking-tight leading-[1.15]">
                Vendez sans stock.<br />
                <span className="text-amber-400">Gagnez avec votre réseau.</span>
              </h1>
              <p className="text-white/60 text-sm leading-relaxed max-w-md">
                La 1ère plateforme de Commerce Social en Côte d'Ivoire. Connectez fournisseurs et influenceurs pour vendre partout.
              </p>
            </div>

            <div className="flex items-center gap-4">
              <Link 
                href="/register" 
                className="bg-amber-400 hover:bg-amber-300 text-gray-900 font-black text-sm px-6 py-3.5 rounded-xl transition shadow-lg shadow-amber-400/20"
              >
                Commencez gratuitement &gt;
              </Link>
              <Link 
                href="/login" 
                className="bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold text-sm px-6 py-3.5 rounded-xl transition"
              >
                Se connecter
              </Link>
            </div>

            {/* Stats en ligne horizontale */}
            <div className="pt-6 grid grid-cols-3 gap-4 border-t border-white/5 text-left">
              <div>
                <div className="text-xl font-black text-white">2K+</div>
                <div className="text-white/40 text-[11px]">Vendeurs actifs</div>
              </div>
              <div>
                <div className="text-xl font-black text-white">Plus de 500</div>
                <div className="text-white/40 text-[11px]">Produits</div>
              </div>
              <div>
                <div className="text-xl font-black text-white">98%</div>
                <div className="text-white/40 text-[11px]">Livraison OK</div>
              </div>
            </div>
          </div>

          {/* Colonne Droite (L'Espace Publicitaire Interactif de la maquette) */}
          <div className="lg:col-span-7 bg-gradient-to-b from-[#3b82f6] to-[#1d4ed8] rounded-[2rem] p-6 sm:p-8 shadow-2xl flex flex-col justify-between text-gray-900">
            
            <div>
              <div className="text-white font-bold text-sm mb-3 tracking-wide">Offres Spéciales</div>
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="bg-white/20 backdrop-blur-md text-white text-[11px] font-bold px-3 py-1.5 rounded-full flex items-center gap-1">📦 Livraison Gratuite</span>
                <span className="bg-white/20 backdrop-blur-md text-white text-[11px] font-bold px-3 py-1.5 rounded-full flex items-center gap-1">🏷️ Remise 20%</span>
                <span className="bg-white/20 backdrop-blur-md text-white text-[11px] font-bold px-3 py-1.5 rounded-full flex items-center gap-1">🛵 Livreur papsletx</span>
              </div>

              {/* Titre & Sélecteur d'Onglets de Publicité */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/20 pb-4 mb-6">
                <h2 className="text-white font-black text-xl tracking-tight">Onglet de Publicité</h2>
                
                <div className="bg-[#071020]/40 p-1 rounded-xl inline-flex self-start sm:self-auto">
                  <button
                    onClick={() => setActiveAdTab("products")}
                    className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      activeAdTab === "products" ? "bg-white text-gray-900 shadow" : "text-white/70 hover:text-white"
                    }`}
                  >
                    Produits Sponsorisés
                  </button>
                  <button
                    onClick={() => setActiveAdTab("stores")}
                    className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      activeAdTab === "stores" ? "bg-white text-gray-900 shadow" : "text-white/70 hover:text-white"
                    }`}
                  >
                    Boutiques à la Une
                  </button>
                </div>
              </div>

              {/* Zone publicitaire d'achat avec favoris intégrés */}
              {activeAdTab === "products" ? (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {adProducts.map((product) => (
                    <div key={product.id} className="bg-white rounded-2xl p-4 flex flex-col justify-between shadow-lg border border-white/10 relative group">
                      
                      {/* Cœur interactif pour enregistrer le produit */}
                      <button 
                        onClick={(e) => toggleFavorite(product.id, e)}
                        className="absolute top-6 right-6 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center shadow hover:bg-white text-gray-400 hover:text-red-500 transition z-10"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" fill={favorites.includes(product.id) ? "currentColor" : "none"} viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={`w-4 h-4 ${favorites.includes(product.id) ? "text-red-500" : ""}`}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                        </svg>
                      </button>

                      <div>
                        <div className={`w-full aspect-[4/3] rounded-xl bg-gradient-to-br ${product.bgGradient} flex items-center justify-center text-4xl mb-3`}>
                          {product.image}
                        </div>
                        <h3 className="font-black text-sm text-gray-900 mb-0.5">{product.name}</h3>
                        <p className="text-gray-500 text-[10px] font-medium mb-3">Grossiste : {product.store}</p>
                      </div>
                      
                      <button 
                        onClick={() => { setSelectedProduct(product); setIsCheckoutOpen(false); }}
                        className="w-full text-center bg-gray-900 hover:bg-amber-400 hover:text-gray-900 text-white text-xs font-bold py-2.5 rounded-lg transition"
                      >
                        Voir le Produit
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {adStores.map((store) => (
                    <div key={store.id} className="bg-white rounded-2xl p-5 flex flex-col justify-between shadow-lg">
                      <div className="flex items-start gap-4">
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${store.bgGradient} flex items-center justify-center text-2xl shrink-0`}>
                          {store.image}
                        </div>
                        <div>
                          <span className="bg-blue-600/10 text-blue-700 text-[9px] font-bold px-2 py-0.5 rounded-full uppercase">{store.tag}</span>
                          <h3 className="font-black text-base text-gray-900 mt-1">{store.name}</h3>
                          <p className="text-gray-500 text-xs mt-1 leading-normal">{store.desc}</p>
                        </div>
                      </div>
                      <Link href="/register" className="w-full text-center bg-gray-100 hover:bg-gray-200 text-gray-900 text-xs font-bold py-2 mt-4 rounded-lg transition">
                        Visiter la Boutique
                      </Link>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Pagination / Dots UI */}
            <div className="flex justify-center items-center gap-1.5 pt-6">
              <span className="w-6 h-1 rounded-full bg-white" />
              <span className="w-1.5 h-1.5 rounded-full bg-white/40" />
              <span className="w-1.5 h-1.5 rounded-full bg-white/40" />
            </div>

          </div>
        </section>

        {/* --- SECTION INFÉRIEURE : COMMENT ÇA MARCHE ? --- */}
        <section className="bg-white text-gray-900 py-20 px-6 border-t border-gray-100">
          <div className="max-w-4xl mx-auto">
            <div className="text-center space-y-2 mb-12">
              <h2 className="text-3xl font-black tracking-tight">Comment ça marche ?</h2>
              <p className="text-gray-400 text-sm">3 étapes simples pour commencer à vendre</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gray-50 border border-gray-100 p-6 rounded-2xl space-y-4">
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">🏠</div>
                <div>
                  <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Étape 01</div>
                  <h3 className="font-black text-sm text-gray-900 mb-1">Créez votre boutique</h3>
                  <p className="text-gray-500 text-xs leading-relaxed">Choisissez les produits du catalogue et fixez votre prix de vente.</p>
                </div>
              </div>
              <div className="bg-gray-50 border border-gray-100 p-6 rounded-2xl space-y-4">
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">📋</div>
                <div>
                  <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Étape 02</div>
                  <h3 className="font-black text-sm text-gray-900 mb-1">Sélectionnez vos produits</h3>
                  <p className="text-gray-500 text-xs leading-relaxed">Parcourez notre catalogue collaboratif et choisissez vos produits favoris.</p>
                </div>
              </div>
              <div className="bg-gray-50 border border-gray-100 p-6 rounded-2xl space-y-4">
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">🚀</div>
                <div>
                  <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Étape 03</div>
                  <h3 className="font-black text-sm text-gray-900 mb-1">Commencez à vendre</h3>
                  <p className="text-gray-500 text-xs leading-relaxed">Partagez vos liens, nous gérons la livraison à Abidjan et partout en CI.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* =========================================================
          🔥 VOLET DE REDIRECTION PRODUIT, INFLUENCEUR ET FORMULAIRE D'ACHAT
          ========================================================= */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex justify-end transition-opacity animate-fadeIn">
          <div className="w-full max-w-md bg-[#0d1f3c] border-l border-white/10 h-full p-6 overflow-y-auto flex flex-col justify-between shadow-2xl text-white">
            
            <div>
              <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
                <div>
                  <span className="text-[10px] bg-amber-400/10 text-amber-400 font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">Vitrine Brand Ship</span>
                  <h2 className="text-lg font-black mt-1">Fiche Produit</h2>
                </div>
                <button 
                  onClick={() => { setSelectedProduct(null); setIsCheckoutOpen(false); }}
                  className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-white/60 hover:text-white transition"
                >
                  ✕
                </button>
              </div>

              {/* Informations de redirection (Boutique et Influenceur) */}
              <div className="bg-[#071020] rounded-2xl p-4 border border-white/5 space-y-2 mb-6 text-xs">
                <div className="flex items-center gap-2">
                  <span className="text-white/40">Boutique Propriétaire :</span>
                  <span className="font-bold text-amber-400">🏪 {selectedProduct.store}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-white/40">Lien de l'Influenceur :</span>
                  <span className="font-bold text-blue-400">✨ @{selectedProduct.influencer}</span>
                </div>
              </div>

              {/* Visuel du Produit sélectionné */}
              <div className="space-y-4">
                <div className={`w-full aspect-video rounded-2xl bg-gradient-to-br ${selectedProduct.bgGradient} flex items-center justify-center text-6xl shadow-inner`}>
                  {selectedProduct.image}
                </div>
                <div>
                  <div className="flex justify-between items-start gap-4">
                    <h3 className="text-xl font-black text-white">{selectedProduct.name}</h3>
                    <div className="text-right">
                      <span className="text-[10px] text-white/40 block uppercase font-bold">Prix</span>
                      <span className="text-xl font-black text-emerald-400 whitespace-nowrap">{selectedProduct.price}</span>
                    </div>
                  </div>
                  <p className="text-white/60 text-xs mt-2 leading-relaxed">{selectedProduct.desc}</p>
                </div>
              </div>

              {/* Formulaire de commande dynamique (s'active au clic sur Acheter) */}
              {isCheckoutOpen && (
                <div className="mt-8 pt-6 border-t border-white/10 space-y-4 bg-[#071020]/30 p-4 rounded-2xl border border-white/5">
                  <h4 className="font-black text-sm text-white flex items-center gap-2">
                    📍 Informations d'expédition
                  </h4>
                  
                  <div className="space-y-3">
                    <div>
                      <label className="block text-white/60 text-[10px] font-bold uppercase mb-1">Nom complet & Prénom</label>
                      <input type="text" placeholder="Ex: Koffi Konan" className="w-full bg-[#071020] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400" required />
                    </div>
                    <div>
                      <label className="block text-white/60 text-[10px] font-bold uppercase mb-1">Numéro de Téléphone / WhatsApp</label>
                      <input type="tel" placeholder="Ex: 07 08 09 10 11" className="w-full bg-[#071020] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400" required />
                    </div>
                    <div>
                      <label className="block text-white/60 text-[10px] font-bold uppercase mb-1">Adresse E-mail</label>
                      <input type="email" placeholder="Ex: koffi@gmail.com" className="w-full bg-[#071020] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400" required />
                    </div>
                    <div>
                      <label className="block text-white/60 text-[10px] font-bold uppercase mb-1">Adresse de livraison (Commune & Quartier)</label>
                      <input type="text" placeholder="Ex: Cocody Angré, Terminus 81" className="w-full bg-[#071020] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400" required />
                    </div>
                  </div>

                  {/* Options de Paiement Proposées */}
                  <div className="space-y-2 pt-2">
                    <label className="block text-white/60 text-[10px] font-bold uppercase">Méthode de règlement</label>
                    <div className="grid grid-cols-2 gap-3">
                      <button 
                        type="button"
                        onClick={() => setPaymentMethod("delivery")}
                        className={`p-3 rounded-xl border text-xs font-bold text-center transition-all ${paymentMethod === "delivery" ? "border-amber-400 bg-amber-400/5 text-amber-400" : "border-white/10 text-white/60 hover:border-white/20"}`}
                      >
                        💵 À la livraison
                      </button>
                      <button 
                        type="button"
                        onClick={() => setPaymentMethod("qrcode")}
                        className={`p-3 rounded-xl border text-xs font-bold text-center transition-all ${paymentMethod === "qrcode" ? "border-blue-400 bg-blue-400/5 text-blue-400" : "border-white/10 text-white/60 hover:border-white/20"}`}
                      >
                        📱 Scanner QR Code
                      </button>
                    </div>
                  </div>

                  {/* Affichage du QR Code dynamique si choisi */}
                  {paymentMethod === "qrcode" && (
                    <div className="p-4 bg-white text-gray-900 rounded-2xl flex flex-col items-center justify-center space-y-2 text-center transition-all">
                      <div className="w-32 h-32 bg-gray-200 border-4 border-gray-900 flex items-center justify-center font-black text-xs p-2">
                        [ QR WAVE / MO MO ]
                      </div>
                      <span className="text-[9px] text-gray-500 font-bold uppercase tracking-wider">Scannez pour payer instantanément</span>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Actions fixes en bas du volet */}
            <div className="pt-6 border-t border-white/10 bg-[#0d1f3c]">
              {!isCheckoutOpen ? (
                <button
                  onClick={() => setIsCheckoutOpen(true)}
                  className="w-full bg-amber-400 hover:bg-amber-300 text-gray-900 font-black text-sm py-4 rounded-xl flex items-center justify-center gap-2 transition shadow-xl shadow-amber-400/10"
                >
                  🛒 Acheter le produit
                </button>
              ) : (
                <button
                  onClick={() => { alert("Commande enregistrée avec succès pour Brand Ship CI !"); setSelectedProduct(null); setIsCheckoutOpen(false); }}
                  className="w-full bg-emerald-500 hover:bg-emerald-400 text-white font-black text-sm py-4 rounded-xl flex items-center justify-center gap-2 transition shadow-xl"
                >
                  ✅ Confirmer l'achat ({selectedProduct.price})
                </button>
              )}
            </div>

          </div>
        </div>
      )}

      {/* --- FOOTER --- */}
      <footer className="py-8 text-center text-white/30 text-xs border-t border-white/5 bg-[#071020]">
        <p>© 2026 Brand Ship CI · Solution de Commerce de Confiance</p>
      </footer>

    </div>
  );
}
