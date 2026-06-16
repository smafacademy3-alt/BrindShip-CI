"use client";

import { useState } from "react";
import Link from "next/link";

// Interfaces pour la structure des données
interface Product {
  id: number;
  name: string;
  price: string;
  commission: string;
  stock: number;
  image: string;
  status: "disponible" | "rupture";
}

interface Order {
  id: string;
  clientName: string;
  clientPhone: string;
  productName: string;
  totalPrice: string;
  commissionToPay: string;
  status: "En attente" | "En cours de livraison" | "Livré" | "Annulé";
  location: string;
  influencerName: string;
}

export default function MerchantDashboard() {
  const [activeTab, setActiveTab] = useState<"dashboard" | "catalogue" | "orders" | "profil">("dashboard");
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);

  // Formulaire Nouvel Article
  const [newProdName, setNewProdName] = useState("");
  const [newProdPrice, setNewProdPrice] = useState("");
  const [newProdCommission, setNewProdCommission] = useState("");
  const [newProdStock, setNewProdStock] = useState(50);
  const [newProdEmoji, setNewProdEmoji] = useState("📦");

  // Données initiales du catalogue du grossiste
  const [myProducts, setMyProducts] = useState<Product[]>([
    { id: 1, name: "Robe Moderne Premium", price: "25 000 FCFA", commission: "5 000 FCFA", stock: 45, image: "👗", status: "disponible" },
    { id: 2, name: "Électronique de Pointe", price: "18 000 FCFA", commission: "4 000 FCFA", stock: 12, image: "📱", status: "disponible" },
    { id: 3, name: "Pack Teint Éclat Bio", price: "30 000 FCFA", commission: "7 500 FCFA", stock: 0, image: "✨", status: "rupture" },
  ]);

  // Suivi des commandes reçues via le réseau d'influenceurs
  const [orders, setOrders] = useState<Order[]>([
    { id: "BS-9841", clientName: "Awa Touré", clientPhone: "07 45 89 12 00", productName: "Robe Moderne Premium", totalPrice: "25 000 FCFA", commissionToPay: "5 000 FCFA", status: "En cours de livraison", location: "Cocody Angré", influencerName: "Marie_Boutique_CI" },
    { id: "BS-9842", clientName: "Koffi Kra", clientPhone: "05 01 22 44 88", productName: "Électronique de Pointe", totalPrice: "18 000 FCFA", commissionToPay: "4 000 FCFA", status: "Livré", location: "Yopougon Maroc", influencerName: "Inoussa_Tech_Vibe" },
    { id: "BS-9843", clientName: "Fanta Diomandé", clientPhone: "01 77 11 33 55", productName: "Robe Moderne Premium", totalPrice: "25 000 FCFA", commissionToPay: "5 000 FCFA", status: "En attente", location: "Marcory Zone 4", influencerName: "Marie_Boutique_CI" },
  ]);

  // Ajouter un produit au catalogue
  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProdName || !newProdPrice) return;

    const freshProduct: Product = {
      id: Date.now(),
      name: newProdName,
      price: `${parseInt(newProdPrice).toLocaleString()} FCFA`,
      commission: `${parseInt(newProdCommission).toLocaleString()} FCFA`,
      stock: Number(newProdStock),
      image: newProdEmoji,
      status: Number(newProdStock) > 0 ? "disponible" : "rupture"
    };

    setMyProducts([freshProduct, ...myProducts]);
    setIsAddProductOpen(false);
    
    // Reset Form
    setNewProdName("");
    setNewProdPrice("");
    setNewProdCommission("");
    setNewProdStock(50);
    setNewProdEmoji("📦");
  };

  return (
    <div className="min-h-screen bg-[#071020] text-white font-sans antialiased selection:bg-amber-400 selection:text-gray-900 pb-20 relative">
      
      {/* --- EN-TÊTE FIXE --- */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-[#071020]/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-400 flex items-center justify-center text-gray-900 font-bold text-base">
              🏪
            </div>
            <span className="font-black text-lg tracking-tight">
              Espace <span className="text-amber-400">Marchand</span> <span className="text-xs text-white/40 px-1.5 py-0.5 rounded-md bg-white/5 border border-white/10 ml-1">Grossiste</span>
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

      {/* --- REPTACLE PRINCIPAL --- */}
      <main className="pt-20 px-6 max-w-7xl mx-auto">
        
        {/* --- ONGLET : TABLEAU DE BORD ACCUEIL --- */}
        {activeTab === "dashboard" && (
          <section className="space-y-10">
            {/* Bannière Grossiste */}
            <div className="bg-gradient-to-r from-amber-500/20 to-orange-600/10 border border-amber-400/20 rounded-2xl p-6">
              <h1 className="text-2xl font-black text-white">Vos stocks sont votre puissance ! 📦</h1>
              <p className="text-white/70 text-xs mt-1">Ajoutez vos articles de prêt-à-porter, beauté ou tech. Les influenceurs affiliés s'occupent d'attirer les clients à Abidjan et partout en Côte d'Ivoire.</p>
            </div>

            {/* Statistiques Métriques */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-[#0d1f3c] border border-white/5 p-5 rounded-2xl flex flex-col justify-between h-36">
                <span className="text-white/40 text-[10px] uppercase font-bold tracking-wider">Valeur Totale du Stock</span>
                <span className="text-4xl font-black text-amber-400">1 425 000 <span className="text-xs font-normal">FCFA</span></span>
              </div>
              <div className="bg-[#0d1f3c] border border-white/5 p-5 rounded-2xl flex flex-col justify-between h-36">
                <span className="text-white/40 text-[10px] uppercase font-bold tracking-wider">Commandes du Jour</span>
                <span className="text-4xl font-black text-emerald-400">{orders.filter(o => o.status !== "Annulé").length}</span>
              </div>
              <div className="bg-[#0d1f3c] border border-white/5 p-5 rounded-2xl flex flex-col justify-between h-36">
                <span className="text-white/40 text-[10px] uppercase font-bold tracking-wider">Commissions à Verser</span>
                <span className="text-4xl font-black text-blue-400">14 000 <span className="text-xs font-normal">FCFA</span></span>
              </div>
            </div>

            {/* Section Commandes Récentes Rapides */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-black text-white">Flux des livraisons récentes</h2>
                <button onClick={() => setActiveTab("orders")} className="text-xs text-amber-400 hover:underline">Voir tout &gt;</button>
              </div>
              <div className="bg-[#0d1f3c] border border-white/5 rounded-2xl overflow-hidden divide-y divide-white/5 text-xs">
                {orders.slice(0, 2).map((order) => (
                  <div key={order.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-black text-white">{order.id}</span>
                        <span className={`px-2 py-0.5 rounded text-[9px] font-bold ${order.status === "Livré" ? "bg-emerald-500/20 text-emerald-400" : "bg-amber-400/20 text-amber-400"}`}>{order.status}</span>
                      </div>
                      <p className="text-white/60 mt-1">{order.productName} — Acheteur: <span className="text-white">{order.clientName} ({order.location})</span></p>
                    </div>
                    <div className="text-left sm:text-right">
                      <div className="font-black text-white">{order.totalPrice}</div>
                      <p className="text-[10px] text-blue-400">Via @{order.influencerName}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* --- ONGLET : GESTION DU CATALOGUE --- */}
        {activeTab === "catalogue" && (
          <section className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-black text-white">Gestion de votre Catalogue</h2>
                <p className="text-xs text-white/50">Mettez à jour vos prix grossistes et vos volumes disponibles.</p>
              </div>
              <button 
                onClick={() => setIsAddProductOpen(true)}
                className="bg-amber-400 hover:bg-amber-300 text-gray-900 font-black text-xs px-5 py-3 rounded-xl transition shadow-lg shadow-amber-400/10"
              >
                + Ajouter un nouvel article
              </button>
            </div>

            {/* Grille des articles */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {myProducts.map((product) => (
                <div key={product.id} className="bg-[#0d1f3c] border border-white/5 rounded-2xl p-5 flex flex-col justify-between gap-4 relative">
                  <div>
                    <div className={`w-full aspect-square rounded-xl bg-gradient-to-br from-white/5 to-white/10 flex items-center justify-center text-5xl mb-4 shadow-inner relative`}>
                      {product.image}
                      <span className={`absolute bottom-3 right-3 px-2 py-0.5 rounded-full text-[9px] font-bold uppercase ${product.status === "disponible" ? "bg-emerald-500/20 text-emerald-400" : "bg-red-500/20 text-red-400"}`}>
                        {product.status === "disponible" ? `${product.stock} en stock` : "Rupture"}
                      </span>
                    </div>
                    <h3 className="font-black text-sm text-white mb-1">{product.name}</h3>
                    <div className="flex justify-between items-center bg-[#071020]/50 p-2.5 rounded-xl text-xs mt-3">
                      <div>
                        <span className="text-white/40 text-[9px] block uppercase font-bold">Prix de Base</span>
                        <span className="font-bold text-white">{product.price}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-blue-400 text-[9px] block uppercase font-bold">Com. Apporteur</span>
                        <span className="font-bold text-blue-400">+{product.commission}</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 border-t border-white/5 pt-3">
                    <button onClick={() => alert("Modification du stock")} className="bg-white/5 hover:bg-white/10 text-white text-[11px] font-bold py-2 rounded-lg transition text-center">
                      📦 Modifier Stock
                    </button>
                    <button onClick={() => alert("Éditer l'article")} className="bg-white/5 hover:bg-white/10 text-amber-400 text-[11px] font-bold py-2 rounded-lg transition text-center">
                      ✏️ Éditer Prix
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* --- ONGLET : GESTION DES COMMANDES CLIENTS --- */}
        {activeTab === "orders" && (
          <section className="space-y-6">
            <div>
              <h2 className="text-xl font-black text-white">Commandes & Suivi Logistique</h2>
              <p className="text-xs text-white/50">Préparez les colis pour le livreur papsletx dès qu'une vente est validée.</p>
            </div>

            {/* Liste complète des commandes */}
            <div className="bg-[#0d1f3c] border border-white/5 rounded-2xl overflow-hidden divide-y divide-white/5 text-xs">
              {orders.map((order) => (
                <div key={order.id} className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-white/[0.01] transition-all">
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2">
                      <span className="font-black text-base text-white">{order.id}</span>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        order.status === "Livré" ? "bg-emerald-500/20 text-emerald-400" : 
                        order.status === "En attente" ? "bg-amber-400/20 text-amber-400" : "bg-blue-500/20 text-blue-400"
                      }`}>{order.status}</span>
                    </div>
                    <p className="text-white font-bold">{order.productName} <span className="text-white/40 font-normal">({order.totalPrice})</span></p>
                    <p className="text-white/60">Destinataire : <span className="text-white">{order.clientName}</span> · 📞 {order.clientPhone} · 📍 Location : <span className="text-amber-400 font-medium">{order.location}</span></p>
                  </div>

                  <div className="flex items-center gap-4 justify-between md:justify-end border-t md:border-0 border-white/5 pt-3 md:pt-0">
                    <div className="text-left md:text-right text-xs">
                      <span className="text-white/30 block text-[10px]">Par l'influenceur</span>
                      <span className="font-bold text-blue-400">@{order.influencerName}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <button onClick={() => alert("Statut changé en : Livré")} className="bg-emerald-500 hover:bg-emerald-400 text-white font-bold text-[11px] px-3 py-2 rounded-lg transition">
                        ✓ Livré
                      </button>
                      <button onClick={() => alert("Commande Annulée")} className="bg-white/5 hover:bg-red-500/20 hover:text-red-400 text-white/40 font-bold text-[11px] px-2.5 py-2 rounded-lg transition">
                        ✕
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* --- ONGLET : MON PROFIL COMPTE --- */}
        {activeTab === "profil" && (
          <section className="text-center max-w-lg mx-auto space-y-6 pt-6 pb-12">
            <div className="w-20 h-20 rounded-full bg-amber-400/10 border-4 border-amber-400 flex items-center justify-center text-3xl font-black text-amber-400 mx-auto">🏬</div>
            <div className="space-y-1">
              <h2 className="text-xl font-black text-white">Abidjan Luxe Grossiste</h2>
              <p className="text-xs text-white/60">Boutique & Entrepôt · Adjamé, Côte d'Ivoire</p>
            </div>
            <div className="bg-[#0d1f3c] border border-white/5 p-4 rounded-xl text-left text-xs space-y-2">
              <div className="flex justify-between"><span>Responsable :</span> <span className="font-bold text-white">Inoussa K.</span></div>
              <div className="flex justify-between"><span>Téléphone Dépôt :</span> <span className="font-bold text-white">07 88 99 00 11</span></div>
              <div className="flex justify-between"><span>Type de Compte :</span> <span className="font-bold text-amber-400 font-bold">Grossiste Vérifié</span></div>
            </div>
          </section>
        )}
      </main>

      {/* =========================================================
          🔥 MODAL PREMUM : AJOUTER UN PRODUIT AU CATALOGUE
          ========================================================= */}
      {isAddProductOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 transition-opacity animate-fadeIn">
          <div className="w-full max-w-md bg-[#0d1f3c] border border-white/10 rounded-2xl p-6 shadow-2xl text-white max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-5">
              <h2 className="text-lg font-black text-white">➕ Ajouter un article grossiste</h2>
              <button 
                onClick={() => setIsAddProductOpen(false)}
                className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-white/60 hover:text-white transition"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddProduct} className="space-y-4">
              <div>
                <label className="block text-white/60 text-[10px] font-bold uppercase mb-1">Désignation / Nom de l'article</label>
                <input 
                  type="text" 
                  value={newProdName} 
                  onChange={(e) => setNewProdName(e.target.value)}
                  placeholder="Ex: Sac à main Croco Luxe" 
                  className="w-full bg-[#071020] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400" 
                  required 
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-white/60 text-[10px] font-bold uppercase mb-1">Prix Grossiste (FCFA)</label>
                  <input 
                    type="number" 
                    value={newProdPrice} 
                    onChange={(e) => setNewProdPrice(e.target.value)}
                    placeholder="Ex: 15000" 
                    className="w-full bg-[#071020] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400" 
                    required 
                  />
                </div>
                <div>
                  <label className="block text-blue-400 text-[10px] font-bold uppercase mb-1">Commission de l'Influenceur</label>
                  <input 
                    type="number" 
                    value={newProdCommission} 
                    onChange={(e) => setNewProdCommission(e.target.value)}
                    placeholder="Ex: 3000" 
                    className="w-full bg-[#071020] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400" 
                    required 
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-white/60 text-[10px] font-bold uppercase mb-1">Quantité initiale en Stock</label>
                  <input 
                    type="number" 
                    value={newProdStock} 
                    onChange={(e) => setNewProdStock(Number(e.target.value))}
                    className="w-full bg-[#071020] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400" 
                    required 
                  />
                </div>
                <div>
                  <label className="block text-white/60 text-[10px] font-bold uppercase mb-1">Visuel Emoji descriptif</label>
                  <select 
                    value={newProdEmoji} 
                    onChange={(e) => setNewProdEmoji(e.target.value)}
                    className="w-full bg-[#071020] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
                  >
                    <option value="📦">📦 Colis Standard</option>
                    <option value="👗">👗 Vêtement / Robe</option>
                    <option value="👞">👞 Chaussures</option>
                    <option value="📱">📱 Smartphone / Tech</option>
                    <option value="✨">✨ Produit Beauté / Cosmetique</option>
                    <option value="👜">👜 Sac / Maroquinerie</option>
                  </select>
                </div>
              </div>

              <div className="pt-4">
                <button 
                  type="submit" 
                  className="w-full bg-amber-400 hover:bg-amber-300 text-gray-900 font-black text-xs py-3.5 rounded-xl transition shadow-xl"
                >
                  🚀 Publier l'article au catalogue affilié
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

      {/* =========================================================
          🔥 BARRE DE NAVIGATION INFÉRIEURE (WEB APP MOBILE UI)
          ========================================================= */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 bg-[#0d1f3c]/90 backdrop-blur-md border-t border-white/5 px-6 pt-2 pb-5 text-gray-400">
        <div className="flex items-center justify-around">
          <button onClick={() => setActiveTab("dashboard")} className={`flex flex-col items-center gap-1.5 p-2 ${activeTab === "dashboard" ? "text-amber-400" : ""}`}>
            <span className="text-xl">🏠</span>
            <span className="text-[10px] font-bold">Accueil</span>
          </button>
          <button onClick={() => setActiveTab("catalogue")} className={`flex flex-col items-center gap-1.5 p-2 ${activeTab === "catalogue" ? "text-amber-400" : ""}`}>
            <span className="text-xl">📦</span>
            <span className="text-[10px] font-bold">Mon Stock</span>
          </button>
          <button onClick={() => setActiveTab("orders")} className={`flex flex-col items-center gap-1.5 p-2 ${activeTab === "orders" ? "text-amber-400" : ""}`}>
            <span className="text-xl">📋</span>
            <span className="text-[10px] font-bold">Commandes</span>
          </button>
          <button onClick={() => setActiveTab("profil")} className={`flex flex-col items-center gap-1.5 p-2 ${activeTab === "profil" ? "text-amber-400" : ""}`}>
            <span className="text-xl">👤</span>
            <span className="text-[10px] font-bold">Compte</span>
          </button>
        </div>
      </nav>

    </div>
  );
}
