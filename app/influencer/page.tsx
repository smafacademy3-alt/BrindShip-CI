"use client";

import Link from "next/link";

export default function InfluencerDashboard() {
  return (
    <div className="min-h-screen bg-[#071020] text-white font-sans antialiased">
      {/* Top Bar */}
      <header className="border-b border-white/5 bg-[#0d1f3c]/40 backdrop-blur-md px-6 h-16 flex items-center justify-between sticky top-0 z-30">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-blue-500 flex items-center justify-center text-white font-bold">✨</div>
          <span className="font-black text-base tracking-tight">Espace <span className="text-blue-400">Influenceur</span></span>
        </div>
        <Link href="/" className="text-xs text-white/60 hover:text-white border border-white/10 px-3 py-1.5 rounded-lg bg-white/5 transition">
          Retour au site
        </Link>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-10 space-y-8">
        {/* Welcome Banner */}
        <div className="bg-gradient-to-r from-blue-500/20 to-indigo-600/10 border border-blue-400/20 rounded-2xl p-6">
          <h1 className="text-2xl font-black text-white">Inscription validée, Créateur ! 🚀</h1>
          <p className="text-white/70 text-xs mt-1">Votre corner est prêt. Parcourez les catalogues des grossistes, récupérez vos liens personnalisés et commencez à encaisser vos commissions Mobile Money.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-[#0d1f3c] border border-white/5 p-5 rounded-xl">
            <span className="text-white/40 text-[10px] uppercase font-bold tracking-wider block">Clics accumulés</span>
            <span className="text-3xl font-black text-white block mt-1">0</span>
          </div>
          <div className="bg-[#0d1f3c] border border-white/5 p-5 rounded-xl">
            <span className="text-white/40 text-[10px] uppercase font-bold tracking-wider block">Ventes générées</span>
            <span className="text-3xl font-black text-emerald-400 block mt-1">0</span>
          </div>
          <div className="bg-[#0d1f3c] border border-white/5 p-5 rounded-xl">
            <span className="text-white/40 text-[10px] uppercase font-bold tracking-wider block">Commissions gagnées</span>
            <span className="text-3xl font-black text-amber-400 block mt-1">0 FCFA</span>
          </div>
        </div>

        {/* Product Catalog Marketplace Selection */}
        <div className="space-y-4">
          <h2 className="text-lg font-black text-white">Produits recommandés pour vos réseaux</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-[#0d1f3c] border border-white/5 rounded-2xl p-4 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="text-3xl bg-white/5 p-2 rounded-xl">👗</span>
                <div>
                  <h4 className="font-bold text-xs text-white">Robe Moderne Premium</h4>
                  <p className="text-[10px] text-emerald-400 font-bold mt-0.5">Gain : +5 000 FCFA / vente</p>
                </div>
              </div>
              <button onClick={() => alert("Lien d'affilié copié ! Partagez-le sur TikTok / WhatsApp.")} className="bg-blue-500 hover:bg-blue-400 text-white font-bold text-[10px] px-3 py-2 rounded-lg transition shrink-0">
                🔗 Prendre mon Lien
              </button>
            </div>

            <div className="bg-[#0d1f3c] border border-white/5 rounded-2xl p-4 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="text-3xl bg-white/5 p-2 rounded-xl">📱</span>
                <div>
                  <h4 className="font-bold text-xs text-white">Électronique de Pointe</h4>
                  <p className="text-[10px] text-emerald-400 font-bold mt-0.5">Gain : +4 000 FCFA / vente</p>
                </div>
              </div>
              <button onClick={() => alert("Lien d'affilié copié !")} className="bg-blue-500 hover:bg-blue-400 text-white font-bold text-[10px] px-3 py-2 rounded-lg transition shrink-0">
                🔗 Prendre mon Lien
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
