"use client";

import { useState } from "react";
import Link from "next/link";

export default function MerchantDashboard() {
  const [productsCount, setProductsCount] = useState(12);

  return (
    <div className="min-h-screen bg-[#071020] text-white font-sans antialiased">
      {/* Top Bar */}
      <header className="border-b border-white/5 bg-[#0d1f3c]/40 backdrop-blur-md px-6 h-16 flex items-center justify-between sticky top-0 z-30">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-amber-400 flex items-center justify-center text-gray-900 font-bold">🏪</div>
          <span className="font-black text-base tracking-tight">Espace <span className="text-amber-400">Marchand</span></span>
        </div>
        <Link href="/" className="text-xs text-white/60 hover:text-white border border-white/10 px-3 py-1.5 rounded-lg bg-white/5 transition">
          Retour au site
        </Link>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-10 space-y-8">
        {/* Welcome Banner */}
        <div className="bg-gradient-to-r from-amber-500/20 to-orange-600/10 border border-amber-400/20 rounded-2xl p-6">
          <h1 className="text-2xl font-black text-white">Félicitations pour votre inscription ! 🎉</h1>
          <p className="text-white/70 text-xs mt-1">Bienvenue sur Brand Ship CI. Votre compte marchand est validé. Commencez à ajouter vos stocks à Adjamé, Koumassi ou n'importe où pour activer vos ventes.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-[#0d1f3c] border border-white/5 p-5 rounded-xl">
            <span className="text-white/40 text-[10px] uppercase font-bold tracking-wider block">Produits au catalogue</span>
            <span className="text-3xl font-black text-white block mt-1">{productsCount}</span>
          </div>
          <div className="bg-[#0d1f3c] border border-white/5 p-5 rounded-xl">
            <span className="text-white/40 text-[10px] uppercase font-bold tracking-wider block">Commandes reçues</span>
            <span className="text-3xl font-black text-emerald-400 block mt-1">0 FCFA</span>
          </div>
          <div className="bg-[#0d1f3c] border border-white/5 p-5 rounded-xl">
            <span className="text-white/40 text-[10px] uppercase font-bold tracking-wider block">Influenceurs affiliés</span>
            <span className="text-3xl font-black text-blue-400 block mt-1">0</span>
          </div>
        </div>

        {/* Action / Remplissage du catalogue */}
        <div className="bg-[#0d1f3c] border border-white/5 rounded-2xl p-6 text-center space-y-4 max-w-md mx-auto">
          <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-xl mx-auto">📦</div>
          <div>
            <h3 className="font-bold text-sm">Votre catalogue est vide</h3>
            <p className="text-white/40 text-xs mt-1">Ajoutez vos premiers articles pour que les influenceurs de Côte d'Ivoire puissent les propulser.</p>
          </div>
          <button onClick={() => setProductsCount(prev => prev + 1)} className="w-full bg-amber-400 hover:bg-amber-300 text-gray-900 font-black text-xs py-3 rounded-xl transition">
            + Ajouter un produit grossiste
          </button>
        </div>
      </main>
    </div>
  );
}
