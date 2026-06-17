"use client";

import { useState } from "react";
import Link from "next/link";

interface Product {
  id: number;
  name: string;
  price: string;
  commission: string;
  stock: number;
  status: "disponible" | "rupture";
  description: string;
  images: { profile1: string; profile2: string; profile3: string };
}

interface Order {
  id: string;
  clientName: string;
  clientPhone: string;
  productName: string;
  totalPrice: string;
  status: "En attente" | "En cours de livraison" | "Livré" | "Retourné / Refusé";
  location: string;
  influencerName: string;
}

interface PromoCode {
  id: number;
  code: string;
  percentage: number;
  isActive: boolean;
}

interface CompanyProfile {
  logo: string;
  companyName: string;
  rccm: string;
  address: string;
  phone: string;
  email: string;
  website: string;
  bio: string;
}

export default function PremiumMerchantDashboard() {
  const [activeTab, setActiveTab] = useState<"dashboard" | "catalogue" | "orders" | "promos" | "profil">("dashboard");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // Modals de contrôle
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // --- ÉTAT PROFILE ENTREPRISE COMPLET ---
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profile, setProfile] = useState<CompanyProfile>({
    logo: "🏪",
    companyName: "Abidjan Luxe Grossiste",
    rccm: "CI-ABJ-03-2026-M-12345",
    address: "Marché d'Adjamé, Pavillon central, Box 45",
    phone: "+225 07 88 99 00 11",
    email: "contact@abidjanluxegrossiste.ci",
    website: "https://abidjanluxegrossiste.ci",
    bio: "Grossiste importateur de vêtements premium et accessoires de mode en Côte d'Ivoire depuis plus de 5 ans."
  });

  // --- ÉTAT CATALOGUE PRODUITS ---
  const [myProducts, setMyProducts] = useState<Product[]>([
    { 
      id: 1, 
      name: "Robe Moderne Premium", 
      price: "25000", 
      commission: "5000", 
      stock: 45, 
      status: "disponible",
      description: "Robe de soirée haut de gamme, tissu respirant ajusté. Idéal pour cérémonies.",
      images: { profile1: "👗", profile2: "✨", profile3: "🧵" }
    },
    { 
      id: 2, 
      name: "Électronique de Pointe", 
      price: "18000", 
      commission: "4000", 
      stock: 12, 
      status: "disponible",
      description: "Écouteurs sans fil avec réduction active du bruit ambiant et autonomie longue durée.",
      images: { profile1: "📱", profile2: "🎧", profile3: "⚡" }
    }
  ]);

  // --- ÉTAT COMMANDES REÇUES ---
  const [orders, setOrders] = useState<Order[]>([
    { id: "BS-9841", clientName: "Awa Touré", clientPhone: "07 45 89 12 00", productName: "Robe Moderne Premium", totalPrice: "25 000 FCFA", status: "En cours de livraison", location: "Cocody Angré", influencerName: "Marie_Boutique" },
    { id: "BS-9842", clientName: "Koffi Kra", clientPhone: "05 01 22 44 88", productName: "Électronique de Pointe", totalPrice: "18 000 FCFA", status: "Livré", location: "Yopougon Maroc", influencerName: "Inoussa_Tech" },
    { id: "BS-9843", clientName: "Fanta Diomandé", clientPhone: "01 77 11 33 55", productName: "Robe Moderne Premium", totalPrice: "25 000 FCFA", status: "En attente", location: "Marcory Zone 4", influencerName: "Marie_Boutique" }
  ]);

  // --- ÉTAT CODES PROMO ---
  const [promoCodes, setPromoCodes] = useState<PromoCode[]>([
    { id: 1, code: "AKWABA10", percentage: 10, isActive: true },
    { id: 2, code: "GROS20", percentage: 20, isActive: true }
  ]);

  // Formulaires dynamiques temporaires
  const [newProd, setNewProd] = useState({ name: "", price: "", commission: "", stock: "50", description: "", img1: "📦", img2: "🔍", img3: "📐" });
  const [newPromo, setNewPromo] = useState({ code: "", percentage: "15" });

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    const fresh: Product = {
      id: Date.now(),
      name: newProd.name,
      price: newProd.price,
      commission: newProd.commission,
      stock: Number(newProd.stock),
      status: Number(newProd.stock) > 0 ? "disponible" : "rupture",
      description: newProd.description,
      images: { profile1: newProd.img1, profile2: newProd.img2, profile3: newProd.img3 }
    };
    setMyProducts([fresh, ...myProducts]);
    setIsAddProductOpen(false);
    setNewProd({ name: "", price: "", commission: "", stock: "50", description: "", img1: "📦", img2: "🔍", img3: "📐" });
  };

  const handleUpdateStockPrice = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;
    setMyProducts(myProducts.map(p => p.id === editingProduct.id ? {
      ...editingProduct,
      status: editingProduct.stock > 0 ? "disponible" : "rupture"
    } : p));
    setEditingProduct(null);
  };

  const handleCreatePromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPromo.code) return;
    setPromoCodes([...promoCodes, { id: Date.now(), code: newPromo.code.toUpperCase().trim(), percentage: Number(newPromo.percentage), isActive: true }]);
    setNewPromo({ code: "", percentage: "15" });
  };

  const handleReturnOrder = (id: string) => {
    setOrders(orders.map(o => o.id === id ? { ...o, status: "Retourné / Refusé" } : o));
  };

  return (
    <div className="min-h-screen bg-[#070b13] text-[#f8fafc] font-sans antialiased">
      
      {/* --- HEADER DESIGN PURIFIÉ --- */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#070b13]/80 backdrop-blur-xl border-b border-white/[0.04] px-4 sm:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-amber-500 flex items-center justify-center text-gray-950 font-bold text-lg shadow-lg shadow-amber-500/10">
            {profile.logo}
          </div>
          <div>
            <span className="font-semibold text-sm block tracking-tight">{profile.companyName}</span>
            <span className="text-[9px] font-mono text-amber-400 uppercase tracking-widest block">Espace Grossiste</span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Link href="/" className="hidden sm:inline-block text-xs text-white/50 hover:text-white transition-colors">Retour au site</Link>
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="w-10 h-10 flex flex-col items-center justify-center gap-1.5 rounded-xl bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.05] transition-all relative z-50 focus:outline-none"
          >
            <span className={`w-5 h-0.5 bg-white transition-all ${isMenuOpen ? "rotate-45 translate-y-2" : ""}`}></span>
            <span className={`w-5 h-0.5 bg-white transition-all ${isMenuOpen ? "opacity-0" : ""}`}></span>
            <span className={`w-5 h-0.5 bg-white transition-all ${isMenuOpen ? "-rotate-45 -translate-y-2" : ""}`}></span>
          </button>
        </div>
      </header>

      {/* --- MENU BURGER PLEIN ÉCRAN MOBILE & DESKTOP --- */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 bg-[#070b13]/96 backdrop-blur-2xl flex flex-col justify-center px-8 space-y-6 animate-fadeIn">
          <div className="flex flex-col space-y-5 text-xl font-light tracking-wide max-w-sm mx-auto w-full">
            <button onClick={() => { setActiveTab("dashboard"); setIsMenuOpen(false); }} className={`text-left py-2 border-b border-white/[0.03] ${activeTab === "dashboard" ? "text-amber-400 font-normal" : "text-white/60"}`}>📊 Vue d'ensemble</button>
            <button onClick={() => { setActiveTab("catalogue"); setIsMenuOpen(false); }} className={`text-left py-2 border-b border-white/[0.03] ${activeTab === "catalogue" ? "text-amber-400 font-normal" : "text-white/60"}`}>📦 Catalogue Produits</button>
            <button onClick={() => { setActiveTab("orders"); setIsMenuOpen(false); }} className={`text-left py-2 border-b border-white/[0.03] ${activeTab === "orders" ? "text-amber-400 font-normal" : "text-white/60"}`}>📋 Suivi Livraisons & Retours</button>
            <button onClick={() => { setActiveTab("promos"); setIsMenuOpen(false); }} className={`text-left py-2 border-b border-white/[0.03] ${activeTab === "promos" ? "text-amber-400 font-normal" : "text-white/60"}`}>🎟️ Codes Promotionnels</button>
            <button onClick={() => { setActiveTab("profil"); setIsMenuOpen(false); }} className={`text-left py-2 border-b border-white/[0.03] ${activeTab === "profil" ? "text-amber-400 font-normal" : "text-white/60"}`}>🏢 Profil Entreprise B2B</button>
          </div>
        </div>
      )}

      {/* --- PANNEAU DE VUE --- */}
      <main className="pt-24 px-4 sm:px-8 pb-12 max-w-5xl mx-auto w-full min-h-screen">
        
        {/* ==================== TAB 1 : DASHBOARD ==================== */}
        {activeTab === "dashboard" && (
          <div className="space-y-8 animate-fadeIn">
            <div className="border border-white/[0.03] bg-gradient-to-b from-white/[0.01] to-transparent rounded-2xl p-6">
              <h1 className="text-xl font-light text-white">Gestionnaire de Flux Grossiste</h1>
              <p className="text-white/40 text-xs mt-1">Supervisez l'évolution de vos stocks d'entrepôt et l'activité commerciale de vos apporteurs d'affaires.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-[#0c1220]/40 border border-white/[0.03] rounded-xl p-5">
                <p className="text-[10px] text-white/40 uppercase font-mono">Articles Actifs</p>
                <p className="text-2xl font-light mt-1 text-amber-400">{myProducts.length}</p>
              </div>
              <div className="bg-[#0c1220]/40 border border-white/[0.03] rounded-xl p-5">
                <p className="text-[10px] text-white/40 uppercase font-mono">Commandes Réseau</p>
                <p className="text-2xl font-light mt-1 text-emerald-400">{orders.length}</p>
              </div>
              <div className="bg-[#0c1220]/40 border border-white/[0.03] rounded-xl p-5">
                <p className="text-[10px] text-white/40 uppercase font-mono">Litiges / Retours</p>
                <p className="text-2xl font-light mt-1 text-red-400">{orders.filter(o => o.status === "Retourné / Refusé").length}</p>
              </div>
            </div>
          </div>
        )}

        {/* ==================== TAB 2 : CATALOGUE (MODIFICATIONS & MULTI-IMAGES) ==================== */}
        {activeTab === "catalogue" && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex items-center justify-between border-b border-white/[0.03] pb-4">
              <div>
                <h2 className="text-base font-medium">Gestion du Catalogue</h2>
                <p className="text-xs text-white/40">Vos prix grossistes et configurations d'affiliation.</p>
              </div>
              <button 
                onClick={() => setIsAddProductOpen(true)}
                className="bg-amber-400 hover:bg-amber-500 text-gray-950 font-medium text-xs h-10 px-4 rounded-xl transition-all"
              >
                + Ajouter un article
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {myProducts.map(product => (
                <div key={product.id} className="bg-[#0c1220]/20 border border-white/[0.03] rounded-xl p-4 flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    {/* Multi-profiles miniatures */}
                    <div className="grid grid-cols-3 gap-1 bg-[#070b13]/40 p-2 rounded-lg border border-white/[0.03]">
                      <div className="aspect-square bg-white/[0.02] rounded flex items-center justify-center text-2xl" title="Profil Principal">{product.images.profile1}</div>
                      <div className="aspect-square bg-white/[0.02] rounded flex items-center justify-center text-xl" title="Profil 2">{product.images.profile2}</div>
                      <div className="aspect-square bg-white/[0.02] rounded flex items-center justify-center text-xl" title="Profil 3">{product.images.profile3}</div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between items-start">
                        <h4 className="text-xs font-medium text-white">{product.name}</h4>
                        <span className={`text-[9px] font-mono px-2 py-0.5 rounded ${product.stock > 0 ? "bg-emerald-500/10 text-emerald-400" : "bg-red-500/10 text-red-400"}`}>
                          {product.stock} dispo
                        </span>
                      </div>
                      <p className="text-[11px] text-white/40 mt-1 line-clamp-2">{product.description}</p>
                    </div>
                  </div>

                  <div className="border-t border-white/[0.03] pt-3 space-y-2">
                    <div className="flex justify-between text-[11px] font-mono">
                      <span>Grossiste: <strong className="text-white">{Number(product.price).toLocaleString()} F</strong></span>
                      <span>Gain Affilié: <strong className="text-blue-400">+{Number(product.commission).toLocaleString()} F</strong></span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-[10px] pt-1">
                      {/* BOUTONS DÉSORMAIS FONCTIONNELS */}
                      <button 
                        onClick={() => setEditingProduct({ ...product })}
                        className="h-8 rounded-lg bg-white/[0.02] border border-white/[0.06] text-white hover:bg-white/[0.06] transition-all"
                      >
                        📦 Ajuster Stock
                      </button>
                      <button 
                        onClick={() => setEditingProduct({ ...product })}
                        className="h-8 rounded-lg bg-white/[0.02] border border-amber-400/20 text-amber-400 hover:bg-amber-400/10 transition-all"
                      >
                        ✏️ Éditer Prix
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ==================== TAB 3 : ENCOURS & RETOURS PRODUITS ==================== */}
        {activeTab === "orders" && (
          <div className="space-y-6 animate-fadeIn">
            <div>
              <h2 className="text-base font-medium">Commandes & Flux Logistique</h2>
              <p className="text-xs text-white/40">Suivi des expéditions et traitement des colis refusés ou non livrés.</p>
            </div>

            <div className="bg-[#0c1220]/20 border border-white/[0.03] rounded-xl overflow-hidden divide-y divide-white/[0.03] text-xs">
              {orders.map(order => (
                <div key={order.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-white">{order.id}</span>
                      <span className={`text-[9px] px-2 py-0.5 rounded ${
                        order.status === "Livré" ? "bg-emerald-500/10 text-emerald-400" :
                        order.status === "Retourné / Refusé" ? "bg-red-500/10 text-red-400 font-bold" : "bg-amber-400/10 text-amber-400"
                      }`}>{order.status}</span>
                    </div>
                    <p className="text-white/70">{order.productName} — Client : <span className="text-white font-medium">{order.clientName} ({order.location})</span></p>
                    <p className="text-[11px] text-white/30">Contact : {order.clientPhone} · Affilié : @{order.influencerName}</p>
                  </div>

                  {order.status !== "Livré" && order.status !== "Retourné / Refusé" && (
                    <button 
                      onClick={() => handleReturnOrder(order.id)}
                      className="bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-400 text-[11px] h-8 px-3 rounded-lg transition-all self-start sm:self-center"
                    >
                      ⚠️ Déclarer Retour / Refusé
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ==================== TAB 4 : CODES PROMO ==================== */}
        {activeTab === "promos" && (
          <div className="space-y-6 animate-fadeIn max-w-md mx-auto">
            <div>
              <h2 className="text-base font-medium">Campagnes & Codes Promos</h2>
              <p className="text-xs text-white/40">Créez des remises applicables sur les produits de votre boutique.</p>
            </div>

            <form onSubmit={handleCreatePromo} className="bg-[#0c1220]/20 border border-white/[0.03] rounded-xl p-5 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] font-mono text-white/40 uppercase block mb-1">Code</label>
                  <input 
                    type="text" 
                    placeholder="Ex: SOLDES225"
                    value={newPromo.code}
                    onChange={(e) => setNewPromo({ ...newPromo, code: e.target.value })}
                    className="w-full h-10 bg-[#070b13] border border-white/[0.05] focus:border-amber-400 rounded-xl px-3 text-xs uppercase text-white font-mono focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-mono text-white/40 uppercase block mb-1">Pourcentage (%)</label>
                  <select 
                    value={newPromo.percentage}
                    onChange={(e) => setNewPromo({ ...newPromo, percentage: e.target.value })}
                    className="w-full h-10 bg-[#070b13] border border-white/[0.05] rounded-xl px-2 text-xs text-white focus:outline-none focus:border-amber-400 font-mono"
                  >
                    <option value="5">5 %</option>
                    <option value="10">10 %</option>
                    <option value="15">15 %</option>
                    <option value="20">20 %</option>
                    <option value="25">25 %</option>
                  </select>
                </div>
              </div>
              <button type="submit" className="w-full h-10 bg-amber-400 text-gray-950 text-xs font-medium rounded-xl hover:bg-amber-500 transition-all">
                Activer le code promo
              </button>
            </form>

            <div className="bg-[#0c1220]/10 border border-white/[0.03] rounded-xl divide-y divide-white/[0.03] text-xs font-mono">
              {promoCodes.map(c => (
                <div key={c.id} className="p-4 flex justify-between items-center">
                  <span className="text-white font-bold">{c.code}</span>
                  <span className="text-amber-400">-{c.percentage}% sur la boutique</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ==================== TAB 5 : PROFIL ENTREPRISE COMPLET (EDITABLE) ==================== */}
        {activeTab === "profil" && (
          <div className="space-y-6 animate-fadeIn max-w-xl mx-auto">
            <div className="flex items-center justify-between border-b border-white/[0.03] pb-4">
              <div>
                <h2 className="text-base font-medium">Profil Entreprise B2B</h2>
                <p className="text-xs text-white/40">Fiche légale et d'identification de votre structure sur BrandShip.</p>
              </div>
              <button 
                onClick={() => setIsEditingProfile(!isEditingProfile)}
                className="text-xs font-medium border border-white/10 hover:bg-white/5 h-9 px-4 rounded-xl transition-all"
              >
                {isEditingProfile ? "Annuler" : "✏️ Modifier le profil"}
              </button>
            </div>

            {!isEditingProfile ? (
              <div className="space-y-4 bg-[#0c1220]/10 border border-white/[0.03] rounded-2xl p-6 text-xs">
                <div className="flex items-center gap-4 border-b border-white/[0.03] pb-4">
                  <span className="text-4xl p-3 bg-white/[0.02] border border-white/[0.05] rounded-xl">{profile.logo}</span>
                  <div>
                    <h3 className="text-sm font-bold text-white">{profile.companyName}</h3>
                    <p className="text-white/40 font-mono text-[11px] mt-0.5">RCCM : {profile.rccm}</p>
                  </div>
                </div>
                <div className="space-y-3 pt-2">
                  <p className="text-white/50 leading-relaxed"><strong className="text-white block mb-0.5">Description de l'activité :</strong> {profile.bio}</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-white/70 font-mono">
                    <div>📍 <span className="text-white/40">Siège :</span> {profile.address}</div>
                    <div>📞 <span className="text-white/40">Téléphone :</span> {profile.phone}</div>
                    <div>✉️ <span className="text-white/40">E-mail :</span> {profile.email}</div>
                    <div>🌐 <span className="text-white/40">Web :</span> {profile.website}</div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-[#0c1220]/20 border border-white/[0.03] rounded-xl p-6 space-y-4 text-xs">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-white/40 font-mono text-[10px] block mb-1">Logo Boutique (Emoji ou URL)</label>
                    <input type="text" value={profile.logo} onChange={(e) => setProfile({ ...profile, logo: e.target.value })} className="w-full h-10 bg-[#070b13] border border-white/[0.05] rounded-xl px-3 text-white focus:outline-none" />
                  </div>
                  <div>
                    <label className="text-white/40 font-mono text-[10px] block mb-1">Raison Sociale</label>
                    <input type="text" value={profile.companyName} onChange={(e) => setProfile({ ...profile, companyName: e.target.value })} className="w-full h-10 bg-[#070b13] border border-white/[0.05] rounded-xl px-3 text-white focus:outline-none" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-white/40 font-mono text-[10px] block mb-1">N° Registre du Commerce (RCCM)</label>
                    <input type="text" value={profile.rccm} onChange={(e) => setProfile({ ...profile, rccm: e.target.value })} className="w-full h-10 bg-[#070b13] border border-white/[0.05] rounded-xl px-3 text-white focus:outline-none" />
                  </div>
                  <div>
                    <label className="text-white/40 font-mono text-[10px] block mb-1">Téléphone Commercial</label>
                    <input type="text" value={profile.phone} onChange={(e) => setProfile({ ...profile, phone: e.target.value })} className="w-full h-10 bg-[#070b13] border border-white/[0.05] rounded-xl px-3 text-white focus:outline-none" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-white/40 font-mono text-[10px] block mb-1">E-mail de Contact</label>
                    <input type="email" value={profile.email} onChange={(e) => setProfile({ ...profile, email: e.target.value })} className="w-full h-10 bg-[#070b13] border border-white/[0.05] rounded-xl px-3 text-white focus:outline-none" />
                  </div>
                  <div>
                    <label className="text-white/40 font-mono text-[10px] block mb-1">Site internet</label>
                    <input type="url" value={profile.website} onChange={(e) => setProfile({ ...profile, website: e.target.value })} className="w-full h-10 bg-[#070b13] border border-white/[0.05] rounded-xl px-3 text-white focus:outline-none" />
                  </div>
                </div>

                <div>
                  <label className="text-white/40 font-mono text-[10px] block mb-1">Adresse Géographique</label>
                  <input type="text" value={profile.address} onChange={(e) => setProfile({ ...profile, address: e.target.value })} className="w-full h-10 bg-[#070b13] border border-white/[0.05] rounded-xl px-3 text-white focus:outline-none" />
                </div>

                <div>
                  <label className="text-white/40 font-mono text-[10px] block mb-1">Présentation / Bio de l'entreprise</label>
                  <textarea rows={3} value={profile.bio} onChange={(e) => setProfile({ ...profile, bio: e.target.value })} className="w-full bg-[#070b13] border border-white/[0.05] rounded-xl p-3 text-white focus:outline-none resize-none" />
                </div>

                <button onClick={() => setIsEditingProfile(false)} className="w-full h-11 bg-amber-400 text-gray-950 font-medium text-xs rounded-xl hover:bg-amber-500 transition-all shadow-lg shadow-amber-400/5">
                  Enregistrer les modifications
                </button>
              </div>
            )}
          </div>
        )}
      </main>

      {/* ==================== MODAL : NOUVEL ARTICLE (3 PROFILS IMAGES + DESCRIPTION) ==================== */}
      {isAddProductOpen && (
        <div className="fixed inset-0 z-50 bg-[#070b13]/80 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
          <div className="w-full max-w-md bg-[#0c1220] border border-white/[0.05] rounded-2xl p-6 space-y-4 text-white max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-white/[0.04] pb-3">
              <span className="text-xs font-mono text-amber-400 uppercase tracking-widest">Création de fiche produit</span>
              <button onClick={() => setIsAddProductOpen(false)} className="text-white/40 text-xs">Fermer ✕</button>
            </div>

            <form onSubmit={handleCreateProduct} className="space-y-4 text-xs">
              <div>
                <label className="text-white/40 uppercase font-mono block mb-1">Désignation de l'article</label>
                <input type="text" required value={newProd.name} onChange={(e) => setNewProd({ ...newProd, name: e.target.value })} placeholder="Ex: Sac à main Croco Luxe" className="w-full h-10 bg-[#070b13] border border-white/[0.05] rounded-xl px-3 focus:outline-none focus:border-amber-400" />
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="text-white/40 uppercase font-mono block mb-1">Prix Grossiste</label>
                  <input type="number" required value={newProd.price} onChange={(e) => setNewProd({ ...newProd, price: e.target.value })} placeholder="15000" className="w-full h-10 bg-[#070b13] border border-white/[0.05] rounded-xl px-3 focus:outline-none focus:border-amber-400" />
                </div>
                <div>
                  <label className="text-blue-400 uppercase font-mono block mb-1">Com. Affilié</label>
                  <input type="number" required value={newProd.commission} onChange={(e) => setNewProd({ ...newProd, commission: e.target.value })} placeholder="3000" className="w-full h-10 bg-[#070b13] border border-white/[0.05] rounded-xl px-3 focus:outline-none focus:border-amber-400" />
                </div>
                <div>
                  <label className="text-white/40 uppercase font-mono block mb-1">Stock Initial</label>
                  <input type="number" required value={newProd.stock} onChange={(e) => setNewProd({ ...newProd, stock: e.target.value })} className="w-full h-10 bg-[#070b13] border border-white/[0.05] rounded-xl px-3 focus:outline-none focus:border-amber-400" />
                </div>
              </div>

              {/* SECTION DES 03 PROFILS D'IMAGES EXIGÉE */}
              <div className="space-y-1.5">
                <label className="text-white/40 uppercase font-mono block">Images du produit (03 Profils Différents)</label>
                <div className="grid grid-cols-3 gap-2">
                  <input type="text" required value={newProd.img1} onChange={(e) => setNewProd({ ...newProd, img1: e.target.value })} placeholder="Profil Face" className="w-full h-10 bg-[#070b13] border border-white/[0.05] rounded-xl px-2 text-center focus:outline-none focus:border-amber-400" />
                  <input type="text" required value={newProd.img2} onChange={(e) => setNewProd({ ...newProd, img2: e.target.value })} placeholder="Profil Côté" className="w-full h-10 bg-[#070b13] border border-white/[0.05] rounded-xl px-2 text-center focus:outline-none focus:border-amber-400" />
                  <input type="text" required value={newProd.img3} onChange={(e) => setNewProd({ ...newProd, img3: e.target.value })} placeholder="Profil Détail" className="w-full h-10 bg-[#070b13] border border-white/[0.05] rounded-xl px-2 text-center focus:outline-none focus:border-amber-400" />
                </div>
              </div>

              <div>
                <label className="text-white/40 uppercase font-mono block mb-1">Description Détaillée du Produit</label>
                <textarea rows={3} required value={newProd.description} onChange={(e) => setNewProd({ ...newProd, description: e.target.value })} placeholder="Matière, dimensions, tailles disponibles pour orienter les acheteurs..." className="w-full bg-[#070b13] border border-white/[0.05] rounded-xl p-3 focus:outline-none focus:border-amber-400 resize-none" />
              </div>

              <button type="submit" className="w-full h-11 bg-amber-400 text-gray-950 font-medium rounded-xl hover:bg-amber-500 transition-all">
                🚀 Publier l'article au catalogue affilié
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ==================== MODAL DE CONFIGURATION DIRECTE : AJUSTER STOCK & PRIX ==================== */}
      {editingProduct && (
        <div className="fixed inset-0 z-50 bg-[#070b13]/80 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
          <div className="w-full max-w-sm bg-[#0c1220] border border-white/[0.05] rounded-2xl p-6 space-y-4 text-white">
            <div className="flex items-center justify-between border-b border-white/[0.04] pb-2">
              <h4 className="text-xs font-mono text-amber-400 uppercase">Mise à jour rapide de l'article</h4>
              <button onClick={() => setEditingProduct(null)} className="text-white/40 text-xs">✕</button>
            </div>

            <form onSubmit={handleUpdateStockPrice} className="space-y-4 text-xs">
              <p className="text-white/60">Modification des valeurs pour : <strong className="text-white">{editingProduct.name}</strong></p>
              
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-white/40 block mb-1 font-mono uppercase text-[10px]">Quantité en Stock</label>
                  <input 
                    type="number" 
                    value={editingProduct.stock} 
                    onChange={(e) => setEditingProduct({ ...editingProduct, stock: Number(e.target.value) })}
                    className="w-full h-10 bg-[#070b13] border border-white/[0.05] rounded-xl px-3 text-white focus:outline-none" 
                  />
                </div>
                <div>
                  <label className="text-white/40 block mb-1 font-mono uppercase text-[10px]">Prix Vente (FCFA)</label>
                  <input 
                    type="number" 
                    value={editingProduct.price} 
                    onChange={(e) => setEditingProduct({ ...editingProduct, price: e.target.value })}
                    className="w-full h-10 bg-[#070b13] border border-white/[0.05] rounded-xl px-3 text-white focus:outline-none" 
                  />
                </div>
              </div>

              <button type="submit" className="w-full h-10 bg-amber-400 text-gray-950 font-medium rounded-xl transition-all">
                Appliquer les changements
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
