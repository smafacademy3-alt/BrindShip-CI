"use client";

import { useState } from "react";
import Link from "next/link";

export default function HomePage() {
  const [activeCategory, setActiveCategory] = useState(0);

  const categories = [
    {
      title: "Mode & Accessoires",
      desc: "Boubous modernes, sacs de luxe et bijoux tendance à Abidjan.",
      emoji: "👗",
      color: "from-amber-400 to-orange-500",
    },
    {
      title: "Électronique",
      desc: "Smartphones, écouteurs sans fil et gadgets de haute qualité.",
      emoji: "📱",
      color: "from-blue-500 to-indigo-600",
    },
    {
      title: "Beauté & Cosmétiques",
      desc: "Soins premium, parfums et maquillage de grandes marques.",
      emoji: "✨",
      color: "from-rose-400 to-pink-600",
    },
  ];

  return (
    <div className="min-h-screen bg-[#071020] text-white font-sans antialiased selection:bg-amber-400 selection:text-gray-900">
      
      {/* --- EN-TÊTE / NAVBAR --- */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#071020]/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-lg shadow-orange-500/20">
              <span className="text-gray-900 font-black text-sm">BS</span>
            </div>
            <span className="font-black text-xl tracking-tight">
              Brand Ship <span className="text-amber-400">CI</span>
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
              className="bg-amber-400 hover:bg-amber-300 text-gray-900 font-bold text-xs uppercase tracking-wider px-5 py-2.5 rounded-xl transition shadow-lg shadow-amber-400/20"
            >
              Créer mon compte
            </Link>
          </div>
        </div>
      </header>

      {/* --- SECTION HERO PRINCIPALE --- */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden min-h-[90vh] flex items-center">
        {/* Effets de lumière en arrière-plan */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-blue-600/10 blur-[130px] -z-10 animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-amber-500/10 blur-[100px] -z-10" />
        <div className="absolute inset-0 opacity-[0.02] -z-20" style={{ backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)", backgroundSize: "40px 40px" }} />

        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Texte d'accroche (Gauche) */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 bg-amber-400/10 border border-amber-400/20 rounded-full px-4 py-1.5">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
              <span className="text-amber-400 text-xs font-bold uppercase tracking-widest">Plateforme E-commerce Social #1</span>
            </div>

            <h1 className="text-4xl sm:text-5xl xl:text-6xl font-black tracking-tight leading-[1.1]">
              Vendez sans stock. <br />
              <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
                Gagnez avec votre réseau.
              </span>
            </h1>

            <p className="text-white/60 text-base sm:text-lg max-w-xl leading-relaxed">
              La 1ère plateforme en Côte d'Ivoire qui connecte directement les grossistes d'Abidjan avec les influenceurs et vendeurs en ligne. Vendez partout, la logistique est gérée.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <Link 
                href="/register" 
                className="bg-amber-400 hover:bg-amber-300 text-gray-900 font-black text-sm px-8 py-4 rounded-2xl transition duration-300 shadow-xl shadow-amber-400/20 transform hover:-translate-y-0.5"
              >
                Commencer gratuitement →
              </Link>
            </div>

            {/* Statistiques épurées */}
            <div className="pt-8 grid grid-cols-3 gap-6 max-w-md border-t border-white/5">
              <div>
                <div className="text-2xl sm:text-3xl font-black text-white">2K+</div>
                <div className="text-white/40 text-xs mt-0.5">Vendeurs actifs</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-black text-white">500+</div>
                <div className="text-white/40 text-xs mt-0.5">Produits certifiés</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-black text-white">98%</div>
                <div className="text-white/40 text-xs mt-0.5">Livraisons réussies</div>
              </div>
            </div>
          </div>

          {/* Composant Visuel Interactif (Droite) */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="w-full max-w-sm bg-[#0d1f3c] border border-white/10 rounded-3xl p-6 shadow-2xl relative">
              <div className="absolute -top-3 left-6 bg-gradient-to-r from-amber-400 to-orange-500 text-gray-900 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow">
                Aperçu Catalogue
              </div>
              
              <div className={`w-full rounded-2xl bg-gradient-to-br ${categories[activeCategory].color} p-6 mb-6 transition-all duration-500 text-left`}>
                <span className="text-4xl">{categories[activeCategory].emoji}</span>
                <h3 className="text-xl font-black mt-4 mb-1">{categories[activeCategory].title}</h3>
                <p className="text-white/80 text-xs leading-relaxed">{categories[activeCategory].desc}</p>
              </div>

              <div className="space-y-2">
                {categories.map((cat, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveCategory(index)}
                    className={`w-full text-left px-4 py-3 rounded-xl text-xs font-bold flex items-center justify-between transition-all ${
                      index === activeCategory
                        ? "bg-white/10 text-white border border-white/10"
                        : "text-white/50 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    <span>{cat.title}</span>
                    <span>{index === activeCategory ? "🔥" : "→"}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* --- SECTION DESCRIPTIVE RAPIDE --- */}
      <section className="bg-[#0b162a] py-20 px-6 border-t border-white/5">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <h2 className="text-2xl sm:text-3xl font-black">Comment fonctionne le Brandshipping ?</h2>
          <p className="text-white/50 text-sm max-w-xl mx-auto">Une méthode simplifiée en 3 étapes pour lancer votre commerce en ligne en Côte d'Ivoire sans investir dans un stock de départ.</p>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-10 text-left">
            <div className="bg-[#071020] p-6 rounded-2xl border border-white/5">
              <div className="text-amber-400 font-bold text-xs mb-2">ÉTAPES 01</div>
              <h4 className="font-bold text-sm mb-1">Choisissez vos produits</h4>
              <p className="text-white/50 text-xs">Sélectionnez les articles des grossistes partenaires sur notre plateforme.</p>
            </div>
            <div className="bg-[#071020] p-6 rounded-2xl border border-white/5">
              <div className="text-amber-400 font-bold text-xs mb-2">ÉTAPES 02</div>
              <h4 className="font-bold text-sm mb-1">Partagez vos liens</h4>
              <p className="text-white/50 text-xs">Proposez-les à vos abonnés ou clients sur WhatsApp, TikTok et Instagram.</p>
            </div>
            <div className="bg-[#071020] p-6 rounded-2xl border border-white/5">
              <div className="text-amber-400 font-bold text-xs mb-2">ÉTAPES 03</div>
              <h4 className="font-bold text-sm mb-1">Encassez vos gains</h4>
              <p className="text-white/50 text-xs">Nous livrons le client à Abidjan et vous recevez vos profits par Mobile Money.</p>
            </div>
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="py-8 text-center text-white/30 text-xs border-t border-white/5">
        <p>© 2026 Brand Ship CI · Fait pour le commerce de Côte d'Ivoire</p>
      </footer>

    </div>
  );
}
