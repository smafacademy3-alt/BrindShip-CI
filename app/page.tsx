"use client";

import { useState } from "react";
import Link from "next/link";

export default function HomePage() {
  const [activeAdTab, setActiveAdTab] = useState<"products" | "stores">("products");

  // Données de l'Espace Publicitaire (Maquette Droite)
  const adProducts = [
    {
      id: 1,
      name: "Mode & Accessoires",
      desc: "Choisissez les produits du catalogue et fixez votre prix de vente.",
      image: "👗",
      tag: "Remise 20%",
      bgGradient: "from-orange-100 to-orange-200"
    },
    {
      id: 2,
      name: "Électronique",
      desc: "Vendez les produits de fournisseurs locaux ou internationaux.",
      image: "📱",
      tag: "Livraison Gratuite",
      bgGradient: "from-blue-100 to-blue-200"
    },
    {
      id: 3,
      name: "Beauté",
      desc: "Recevez vos gains de vente et de parrainage instantanément.",
      image: "✨",
      tag: "Top Boutique",
      bgGradient: "from-pink-100 to-pink-200"
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

  return (
    <div className="min-h-screen bg-[#071020] text-white font-sans antialiased selection:bg-amber-400 selection:text-gray-900">
      
      {/* --- EN-TÊTE / NAVBAR --- */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#071020]/80 backdrop-blur-md border-b border-white/5">
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

      {/* --- STRUCTURE PRINCIPALE (Inspirée de la capture d'écran) --- */}
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

          {/* Colonne Droite (Bleu Lumineux - L'Espace Publicitaire Interactif de l'image) */}
          <div className="lg:col-span-7 bg-gradient-to-b from-[#3b82f6] to-[#1d4ed8] rounded-[2rem] p-6 sm:p-8 shadow-2xl flex flex-col justify-between text-gray-900">
            
            {/* Sous-Section : Offres Spéciales */}
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

              {/* Contenu de la zone publicitaire */}
              {activeAdTab === "products" ? (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {adProducts.map((item) => (
                    <div key={item.id} className="bg-white rounded-2xl p-4 flex flex-col justify-between shadow-lg border border-white/10">
                      <div>
                        <div className={`w-full aspect-[4/3] rounded-xl bg-gradient-to-br ${item.bgGradient} flex items-center justify-center text-4xl mb-3`}>
                          {item.image}
                        </div>
                        <h3 className="font-black text-sm text-gray-900 mb-1">{item.name}</h3>
                        <p className="text-gray-500 text-[11px] leading-tight mb-4">{item.desc}</p>
                      </div>
                      <Link href="/register" className="w-full text-center bg-gray-100 hover:bg-gray-200 text-gray-900 text-xs font-bold py-2 rounded-lg transition">
                        Voir le Produit
                      </Link>
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

        {/* --- SECTION INFÉRIEURE : COMMENT ÇA MARCHE ? (Fond blanc de la maquette) --- */}
        <section className="bg-white text-gray-900 py-20 px-6 border-t border-gray-100">
          <div className="max-w-4xl mx-auto">
            
            <div className="text-center space-y-2 mb-12">
              <h2 className="text-3xl font-black tracking-tight">Comment ça marche ?</h2>
              <p className="text-gray-400 text-sm">3 étapes simples pour commencer à vendre</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Étape 1 */}
              <div className="bg-gray-50 border border-gray-100 p-6 rounded-2xl space-y-4">
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
                  🏠
                </div>
                <div>
                  <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Étape 01</div>
                  <h3 className="font-black text-sm text-gray-900 mb-1">Créez votre boutique</h3>
                  <p className="text-gray-500 text-xs leading-relaxed">
                    Choisissez les produits du catalogue et fixez votre prix de vente. Votre boutique est prête en 1 clic.
                  </p>
                </div>
              </div>

              {/* Étape 2 */}
              <div className="bg-gray-50 border border-gray-100 p-6 rounded-2xl space-y-4">
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
                  📋
                </div>
                <div>
                  <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Étape 02</div>
                  <h3 className="font-black text-sm text-gray-900 mb-1">Sélectionnez vos produits</h3>
                  <p className="text-gray-500 text-xs leading-relaxed">
                    Parcourez notre catalogue collaboratif et choisissez vos produits favoris à pousser sur vos réseaux.
                  </p>
                </div>
              </div>

              {/* Étape 3 */}
              <div className="bg-gray-50 border border-gray-100 p-6 rounded-2xl space-y-4">
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
                  🚀
                </div>
                <div>
                  <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Étape 03</div>
                  <h3 className="font-black text-sm text-gray-900 mb-1">Commencez à vendre</h3>
                  <p className="text-gray-500 text-xs leading-relaxed">
                    Partagez vos liens, nous gérons la livraison à Abidjan et partout en Côte d'Ivoire, puis encaissez directement l'argent.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </section>

      </main>

      {/* --- FOOTER --- */}
      <footer className="py-8 text-center text-white/30 text-xs border-t border-white/5 bg-[#071020]">
        <p>© 2026 Brand Ship CI · Solution de Commerce de Confiance</p>
      </footer>

    </div>
  );
}
