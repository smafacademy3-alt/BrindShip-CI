"use client";

import { useState } from "react";

// --- Type pour structurer l'article du catalogue ---
type Product = {
  id: string;
  title: string;
  description: string;
  basePrice: number;
  stock: number;
};

export default function CatalogManagement() {
  // 1. État contenant les données de l'article (Sans la commission)
  const [product, setProduct] = useState<Product>({
    id: "robe-1",
    title: "Robe Moderne Premium",
    description: "Robe de soirée haut de gamme, tissu respirant ajusté. Idéal pour cérémonies.",
    basePrice: 25000,
    stock: 12,
  });

  // 2. États pour la gestion de l'affichage des fenêtres (Modals)
  const [activeModal, setActiveModal] = useState<"stock" | "price" | null>(null);

  // 3. États temporaires pour stocker les saisies des formulaires
  const [tempStock, setTempStock] = useState<number>(product.stock);
  const [tempBasePrice, setTempBasePrice] = useState<number>(product.basePrice);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // --- Fonctions de sauvegarde ---
  const handleSaveStock = (e: React.FormEvent) => {
    e.preventDefault();
    setProduct((prev) => ({ ...prev, stock: tempStock }));
    setActiveModal(null);
  };

  const handleSavePrice = (e: React.FormEvent) => {
    e.preventDefault();
    setProduct((prev) => ({
      ...prev,
      basePrice: tempBasePrice,
    }));
    setActiveModal(null);
  };

  // --- Fonction de déconnexion ---
  const handleLogout = () => {
    // Remplacer par la logique de votre Auth (ex: signOut() pour NextAuth/Supabase)
    console.log("Déconnexion en cours...");
    window.location.href = "/login"; 
  };

  return (
    <div className="min-h-screen bg-[#0B0E14] text-[#F8FAFC] font-sans antialiased pb-12 relative">
      
      {/* ================= HEADER ================= */}
      <header className="sticky top-0 z-40 bg-[#0B0E14]/90 backdrop-blur-md border-b border-white/[0.05] px-5 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center">
            <span className="text-xl">🏪</span>
          </div>
          <div>
            <h1 className="font-semibold text-[15px] leading-tight text-white">Abidjan Luxe Grossiste</h1>
            <span className="text-[10px] font-mono text-amber-500 font-bold tracking-widest uppercase block mt-0.5">
              Espace Grossiste
            </span>
          </div>
        </div>

        <div className="relative">
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="w-10 h-10 flex flex-col items-center justify-center gap-1.5 rounded-xl border border-white/[0.08] focus:outline-none hover:bg-white/[0.02] transition-colors"
          >
            <span className="w-5 h-0.5 bg-white rounded"></span>
            <span className="w-5 h-0.5 bg-white rounded"></span>
            <span className="w-5 h-0.5 bg-white rounded"></span>
          </button>

          {/* MENU DÉROULANT (Déconnexion) */}
          {isMenuOpen && (
            <div className="absolute right-0 top-12 mt-2 w-48 bg-[#12161F] border border-white/[0.08] rounded-xl shadow-2xl py-2 animate-fade-in z-50">
              <button 
                onClick={handleLogout}
                className="w-full text-left px-4 py-2.5 text-sm text-red-400 hover:bg-red-500/10 transition-colors flex items-center gap-2 font-medium"
              >
                <span>🚪</span> Déconnexion
              </button>
            </div>
          )}
        </div>
      </header>

      {/* ================= MAIN CONTENT ================= */}
      <main className="px-5 pt-6 max-w-xl mx-auto space-y-6">
        
        {/* Section Titre & Bouton Ajouter */}
        <section className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold text-white tracking-tight">Gestion du Catalogue</h2>
            <p className="text-xs text-gray-400 mt-1 leading-relaxed">
              Gérez vos articles et définissez vos prix fournisseurs.
            </p>
          </div>
          <button className="bg-amber-400 hover:bg-amber-500 text-black font-medium text-xs px-3 py-2.5 rounded-xl whitespace-nowrap shadow-md transition-all">
            + Ajouter un nouvel article
          </button>
        </section>

        {/* CARTE PRODUIT */}
        <section className="bg-[#12161F] border border-white/[0.04] rounded-2xl p-4 space-y-4 shadow-xl">
          
          {/* Grille d'images (Angles) */}
          <div className="grid grid-cols-3 gap-2">
            <div className="aspect-square bg-[#1A1F2C] border border-white/[0.03] rounded-xl flex items-center justify-center text-xs text-gray-500 font-medium">
              Angle 1
            </div>
            <div className="aspect-square bg-[#1A1F2C] border border-white/[0.03] rounded-xl flex items-center justify-center text-xs text-gray-500 font-medium">
              Angle 2
            </div>
            <div className="aspect-square bg-[#1A1F2C] border border-white/[0.03] rounded-xl flex items-center justify-center text-xs text-gray-500 font-medium">
              Angle 3
            </div>
          </div>

          {/* Infos Textuelles */}
          <div className="space-y-1">
            <div className="flex justify-between items-baseline">
              <h3 className="text-base font-semibold text-white">{product.title}</h3>
              <span className="text-[11px] px-2 py-0.5 bg-blue-500/10 text-blue-400 rounded border border-blue-500/20">
                Stock: {product.stock} u.
              </span>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Prix Fournisseur Uniquement */}
          <div className="pt-2 border-t border-white/[0.02]">
            <div className="flex flex-col">
              <span className="text-gray-500 text-[10px] uppercase tracking-widest font-mono mb-0.5">Prix Grossiste</span>
              <span className="font-bold text-white text-lg">{product.basePrice.toLocaleString()} FCFA</span>
            </div>
          </div>

          {/* Boutons d'actions interactifs */}
          <div className="grid grid-cols-2 gap-3 pt-1">
            <button 
              onClick={() => {
                setTempStock(product.stock);
                setActiveModal("stock");
              }}
              className="w-full py-2.5 border border-white/[0.1] hover:bg-white/[0.02] text-xs font-medium text-gray-200 rounded-xl transition-colors"
            >
              Modifier Stock
            </button>
            <button 
              onClick={() => {
                setTempBasePrice(product.basePrice);
                setActiveModal("price");
              }}
              className="w-full py-2.5 border border-amber-500/30 bg-amber-500/[0.02] hover:bg-amber-500/[0.06] text-xs font-medium text-amber-400 rounded-xl transition-colors"
            >
              Editer Prix
            </button>
          </div>

        </section>

      </main>

      {/* ================= MODAL : MODIFIER STOCK ================= */}
      {activeModal === "stock" && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
          <form 
            onSubmit={handleSaveStock}
            className="bg-[#12161F] w-full sm:max-w-md rounded-t-2xl sm:rounded-2xl border-t sm:border border-white/[0.08] p-6 space-y-4 shadow-2xl transition-all animate-slide-up"
          >
            <div>
              <h3 className="text-base font-semibold text-white">Modifier le niveau de stock</h3>
              <p className="text-xs text-gray-400 mt-0.5">{product.title}</p>
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] uppercase tracking-wider text-gray-400 font-medium">Quantité disponible en entrepôt</label>
              <input 
                type="number" 
                value={tempStock}
                onChange={(e) => setTempStock(parseInt(e.target.value) || 0)}
                className="w-full bg-[#0B0E14] border border-white/[0.08] focus:border-amber-500/50 rounded-xl px-4 py-3 text-sm text-white outline-none transition-colors"
                min="0"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <button 
                type="button"
                onClick={() => setActiveModal(null)}
                className="py-3 bg-white/[0.05] hover:bg-white/[0.08] text-xs font-medium rounded-xl transition-colors"
              >
                Annuler
              </button>
              <button 
                type="submit"
                className="py-3 bg-amber-400 hover:bg-amber-500 text-black font-semibold text-xs rounded-xl shadow-md transition-colors"
              >
                Enregistrer
              </button>
            </div>
          </form>
        </div>
      )}

      {/* ================= MODAL : ÉDITER PRIX ================= */}
      {activeModal === "price" && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/70 backdrop-blur-sm">
          <form 
            onSubmit={handleSavePrice}
            className="bg-[#12161F] w-full sm:max-w-md rounded-t-2xl sm:rounded-2xl border-t sm:border border-white/[0.08] p-6 space-y-4 shadow-2xl animate-slide-up"
          >
            <div>
              <h3 className="text-base font-semibold text-white">Éditer le Prix Fournisseur</h3>
              <p className="text-xs text-gray-400 mt-0.5">{product.title}</p>
            </div>

            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[11px] uppercase tracking-wider text-gray-400 font-medium">Prix de Gros (FCFA)</label>
                <div className="relative">
                  <input 
                    type="number" 
                    value={tempBasePrice}
                    onChange={(e) => setTempBasePrice(parseInt(e.target.value) || 0)}
                    className="w-full bg-[#0B0E14] border border-white/[0.08] focus:border-amber-500/50 rounded-xl pl-4 pr-12 py-3 text-sm text-white outline-none transition-colors"
                    min="0"
                    required
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-mono text-gray-500">XOF</span>
                </div>
                <p className="text-[10px] text-gray-500 leading-tight">C'est le montant net que vous percevrez à chaque vente. Les influenceurs fixeront leur marge au-dessus de ce prix.</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <button 
                type="button"
                onClick={() => setActiveModal(null)}
                className="py-3 bg-white/[0.05] hover:bg-white/[0.08] text-xs font-medium rounded-xl transition-colors"
              >
                Annuler
              </button>
              <button 
                type="submit"
                className="py-3 bg-amber-400 hover:bg-amber-500 text-black font-semibold text-xs rounded-xl shadow-md transition-colors"
              >
                Mettre à jour
              </button>
            </div>
          </form>
        </div>
      )}

    </div>
  );
}
