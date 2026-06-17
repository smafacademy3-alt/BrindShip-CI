"use client";

import { useState, ChangeEvent } from "react";
import Link from "next/link";

interface Product {
  id: number;
  name: string;
  price: string;
  commission: string;
  stock: number;
  status: "disponible" | "rupture";
  description: string;
  images: { angle1: string; angle2: string; angle3: string };
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
  verificationDocs: { name: string; size: string }[];
}

export default function PremiumMerchantDashboard() {
  const [activeTab, setActiveTab] = useState<"dashboard" | "catalogue" | "orders" | "promos" | "profil">("catalogue");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // Modals de contrôle
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // --- ÉTAT PROFILE ENTREPRISE COMPLET (Réf: march2 2026-06-17 at 18.09.52.jpeg) ---
  const [isEditingProfile, setIsEditingProfile] = useState(true); // Activé par défaut pour édition directe
  const [profile, setProfile] = useState<CompanyProfile>({
    logo: "", // Base64 de l'image téléversée
    companyName: "Abidjan Luxe Grossiste",
    rccm: "CI-ABJ-03-2026-M-12345",
    address: "Marché d'Adjamé, Pavillon central, Box 45",
    phone: "+225 07 88 99 00 11",
    email: "contact@abidjanluxegrossiste.ci",
    website: "https://abidjanluxegrossiste.ci",
    bio: "Grossiste importateur de vêtements premium et accessoires de mode en Côte d'Ivoire depuis plus de 5 ans.",
    verificationDocs: []
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
      images: { angle1: "", angle2: "", angle3: "" }
    }
  ]);

  // --- ÉTAT COMMANDES REÇUES ---
  const [orders, setOrders] = useState<Order[]>([
    { id: "BS-9841", clientName: "Awa Touré", clientPhone: "07 45 89 12 00", productName: "Robe Moderne Premium", totalPrice: "25 000 FCFA", status: "En cours de livraison", location: "Cocody Angré", influencerName: "Marie_Boutique" }
  ]);

  // --- ÉTAT CODES PROMO ---
  const [promoCodes, setPromoCodes] = useState<PromoCode[]>([
    { id: 1, code: "AKWABA10", percentage: 10, isActive: true }
  ]);

  // Formulaires temporaires de saisie
  const [newProd, setNewProd] = useState({ 
    name: "", 
    price: "", 
    commission: "", 
    stock: "50", 
    description: "", 
    angle1: "", 
    angle2: "", 
    angle3: "" 
  });
  const [newPromo, setNewPromo] = useState({ code: "", percentage: "15" });

  // --- GESTIONNAIRES DE FICHIERS (UPLOADS FONCTIONNELS SUR LE NAVIGATEUR) ---
  const handleProductImageUpload = (e: ChangeEvent<HTMLInputElement>, angleKey: "angle1" | "angle2" | "angle3") => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewProd((prev) => ({ ...prev, [angleKey]: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLogoUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile((prev) => ({ ...prev, logo: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleVerificationDocsUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const uploadedList = Array.from(files).map(file => ({
        name: file.name,
        size: (file.size / 1024 / 1024).toFixed(2) + " MB"
      }));
      setProfile((prev) => ({ 
        ...prev, 
        verificationDocs: [...prev.verificationDocs, ...uploadedList] 
      }));
    }
  };

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
      images: { angle1: newProd.angle1, angle2: newProd.angle2, angle3: newProd.angle3 }
    };
    setMyProducts([fresh, ...myProducts]);
    setIsAddProductOpen(false);
    setNewProd({ name: "", price: "", commission: "", stock: "50", description: "", angle1: "", angle2: "", angle3: "" });
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

  return (
    <div className="min-h-screen bg-[#070b13] text-[#f8fafc] font-sans antialiased">
      
      {/* --- HEADER --- */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#070b13]/80 backdrop-blur-xl border-b border-white/[0.04] px-4 sm:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-amber-500 overflow-hidden flex items-center justify-center text-gray-950 font-bold text-sm shadow-lg shadow-amber-500/10">
            {profile.logo ? (
              <img src={profile.logo} alt="Logo" className="w-full h-full object-cover" />
            ) : (
              "🏪"
            )}
          </div>
          <div>
            <span className="font-semibold text-sm block tracking-tight">{profile.companyName}</span>
            <span className="text-[9px] font-mono text-amber-400 uppercase tracking-widest block">Espace Grossiste</span>
          </div>
        </div>

        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="w-10 h-10 flex flex-col items-center justify-center gap-1.5 rounded-xl bg-white/[0.02] border border-white/[0.05] relative z-50 focus:outline-none"
        >
          <span className={`w-5 h-0.5 bg-white transition-all ${isMenuOpen ? "rotate-45 translate-y-2" : ""}`}></span>
          <span className={`w-5 h-0.5 bg-white transition-all ${isMenuOpen ? "opacity-0" : ""}`}></span>
          <span className={`w-5 h-0.5 bg-white transition-all ${isMenuOpen ? "-rotate-45 -translate-y-2" : ""}`}></span>
        </button>
      </header>

      {/* --- MENU EXPANDED --- */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 bg-[#070b13]/96 backdrop-blur-2xl flex flex-col justify-center px-8 space-y-6">
          <div className="flex flex-col space-y-5 text-xl font-light tracking-wide max-w-sm mx-auto w-full">
            <button onClick={() => { setActiveTab("dashboard"); setIsMenuOpen(false); }} className={`text-left py-2 border-b border-white/[0.03] ${activeTab === "dashboard" ? "text-amber-400" : "text-white/60"}`}>📊 Vue d'ensemble</button>
            <button onClick={() => { setActiveTab("catalogue"); setIsMenuOpen(false); }} className={`text-left py-2 border-b border-white/[0.03] ${activeTab === "catalogue" ? "text-amber-400" : "text-white/60"}`}>📦 Catalogue Produits</button>
            <button onClick={() => { setActiveTab("orders"); setIsMenuOpen(false); }} className={`text-left py-2 border-b border-white/[0.03] ${activeTab === "orders" ? "text-amber-400" : "text-white/60"}`}>📋 Suivi Livraisons</button>
            <button onClick={() => { setActiveTab("promos"); setIsMenuOpen(false); }} className={`text-left py-2 border-b border-white/[0.03] ${activeTab === "promos" ? "text-amber-400" : "text-white/60"}`}>🎟️ Codes Promotionnels</button>
            <button onClick={() => { setActiveTab("profil"); setIsMenuOpen(false); }} className={`text-left py-2 border-b border-white/[0.03] ${activeTab === "profil" ? "text-amber-400" : "text-white/60"}`}>🏢 Profil & Vérifications</button>
          </div>
        </div>
      )}

      {/* --- PRINCIPAL CONTAINER --- */}
      <main className="pt-24 px-4 sm:px-8 pb-12 max-w-5xl mx-auto w-full min-h-screen">
        
        {/* ==================== VUE CATALOGUE ==================== */}
        {activeTab === "catalogue" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-white/[0.03] pb-4">
              <div>
                <h2 className="text-base font-medium">Gestion du Catalogue</h2>
                <p className="text-xs text-white/40">Gérez vos articles et attribuez les commissions d'affiliation.</p>
              </div>
              <button 
                onClick={() => setIsAddProductOpen(true)}
                className="bg-amber-400 hover:bg-amber-500 text-gray-950 font-medium text-xs h-10 px-4 rounded-xl transition-all"
              >
                + Ajouter un nouvel article
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {myProducts.map(product => (
                <div key={product.id} className="bg-[#0c1220]/20 border border-white/[0.03] rounded-xl p-4 flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    <div className="grid grid-cols-3 gap-1 bg-[#070b13]/40 p-1.5 rounded-lg border border-white/[0.03]">
                      <div className="aspect-square bg-white/[0.02] rounded overflow-hidden flex items-center justify-center text-xs text-white/40">
                        {product.images.angle1 ? <img src={product.images.angle1} className="w-full h-full object-cover" /> : "Angle 1"}
                      </div>
                      <div className="aspect-square bg-white/[0.02] rounded overflow-hidden flex items-center justify-center text-xs text-white/40">
                        {product.images.angle2 ? <img src={product.images.angle2} className="w-full h-full object-cover" /> : "Angle 2"}
                      </div>
                      <div className="aspect-square bg-white/[0.02] rounded overflow-hidden flex items-center justify-center text-xs text-white/40">
                        {product.images.angle3 ? <img src={product.images.angle3} className="w-full h-full object-cover" /> : "Angle 3"}
                      </div>
                    </div>
                    <div>
                      <h4 className="text-xs font-medium text-white">{product.name}</h4>
                      <p className="text-[11px] text-white/40 mt-1 line-clamp-2">{product.description}</p>
                    </div>
                  </div>

                  <div className="border-t border-white/[0.03] pt-3 space-y-2">
                    <div className="flex justify-between text-[11px] font-mono">
                      <span>Base: <strong className="text-white">{product.price} FCFA</strong></span>
                      <span>Affilié: <strong className="text-amber-400">+{product.commission} FCFA</strong></span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-[10px]">
                      <button onClick={() => setEditingProduct(product)} className="h-8 rounded-lg bg-white/[0.02] border border-white/[0.06] text-white hover:bg-white/[0.05]">Modifier Stock</button>
                      <button onClick={() => setEditingProduct(product)} className="h-8 rounded-lg bg-white/[0.02] border border-amber-400/20 text-amber-400 hover:bg-amber-400/5">Editer Prix</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ==================== VUE PROFIL (Réf: march2 2026-06-17 at 18.09.52.jpeg) ==================== */}
        {activeTab === "profil" && (
          <div className="space-y-6 max-w-xl mx-auto">
            <div className="flex items-center justify-between border-b border-white/[0.03] pb-4">
              <div>
                <h2 className="text-base font-medium">Profil Entreprise B2B</h2>
                <p className="text-xs text-white/40">Fiche légale et d'identification de votre structure sur BrandShip.</p>
              </div>
              <button 
                onClick={() => setIsEditingProfile(!isEditingProfile)}
                className="text-xs font-medium border border-white/10 hover:bg-white/5 h-9 px-4 rounded-xl"
              >
                {isEditingProfile ? "Annuler" : "Modifier"}
              </button>
            </div>

            <div className="bg-[#0c1220]/20 border border-white/[0.03] rounded-2xl p-6 space-y-5 text-xs">
              
              {/* SECTION LOGO DYNAMIQUE & FONCTIONNEL */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-white/40 font-mono text-[10px] block mb-1">Logo Boutique</label>
                  <div className="flex items-center gap-3 bg-[#070b13] border border-white/[0.05] rounded-xl p-2 relative">
                    <div className="w-12 h-12 rounded-lg bg-white/[0.02] border border-white/[0.1] flex items-center justify-center overflow-hidden text-lg">
                      {profile.logo ? <img src={profile.logo} alt="Logo Preview" className="w-full h-full object-cover" /> : "🏢"}
                    </div>
                    <label className="flex-1 cursor-pointer bg-white/[0.03] hover:bg-white/[0.06] text-center py-2 rounded-lg border border-white/[0.05] transition-all">
                      <span className="text-[11px] text-amber-400 font-medium">Choisir un logo</span>
                      <input type="file" accept="image/*" onChange={handleLogoUpload} className="hidden" />
                    </label>
                  </div>
                </div>

                <div>
                  <label className="text-white/40 font-mono text-[10px] block mb-1">Raison Sociale</label>
                  <input type="text" value={profile.companyName} onChange={(e) => setProfile({ ...profile, companyName: e.target.value })} className="w-full h-11 bg-[#070b13] border border-white/[0.05] rounded-xl px-3 text-white focus:outline-none focus:border-amber-400" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-white/40 font-mono text-[10px] block mb-1">N° Registre du Commerce (RCCM)</label>
                  <input type="text" value={profile.rccm} onChange={(e) => setProfile({ ...profile, rccm: e.target.value })} className="w-full h-11 bg-[#070b13] border border-white/[0.05] rounded-xl px-3 text-white focus:outline-none" />
                </div>
                <div>
                  <label className="text-white/40 font-mono text-[10px] block mb-1">Téléphone Commercial</label>
                  <input type="text" value={profile.phone} onChange={(e) => setProfile({ ...profile, phone: e.target.value })} className="w-full h-11 bg-[#070b13] border border-white/[0.05] rounded-xl px-3 text-white focus:outline-none" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-white/40 font-mono text-[10px] block mb-1">E-mail de Contact</label>
                  <input type="email" value={profile.email} onChange={(e) => setProfile({ ...profile, email: e.target.value })} className="w-full h-11 bg-[#070b13] border border-white/[0.05] rounded-xl px-3 text-white focus:outline-none" />
                </div>
                <div>
                  <label className="text-white/40 font-mono text-[10px] block mb-1">Site internet</label>
                  <input type="url" value={profile.website} onChange={(e) => setProfile({ ...profile, website: e.target.value })} className="w-full h-11 bg-[#070b13] border border-white/[0.05] rounded-xl px-3 text-white focus:outline-none" />
                </div>
              </div>

              <div>
                <label className="text-white/40 font-mono text-[10px] block mb-1">Adresse Géographique</label>
                <input type="text" value={profile.address} onChange={(e) => setProfile({ ...profile, address: e.target.value })} className="w-full h-11 bg-[#070b13] border border-white/[0.05] rounded-xl px-3 text-white focus:outline-none" />
              </div>

              <div>
                <label className="text-white/40 font-mono text-[10px] block mb-1">Présentation / Bio de l'entreprise</label>
                <textarea rows={3} value={profile.bio} onChange={(e) => setProfile({ ...profile, bio: e.target.value })} className="w-full bg-[#070b13] border border-white/[0.05] rounded-xl p-3 text-white focus:outline-none resize-none" />
              </div>

              {/* --- ONGLET COMPLÈTEMENT NOUVEAU & EXIGÉ : IMPORTATION DES DOCUMENTS DE VÉRIFICATION --- */}
              <div className="border-t border-white/[0.04] pt-4 space-y-2">
                <label className="text-white/40 font-mono text-[10px] block uppercase tracking-wider">Documents de vérification requis (Dossier Fiscal, RCCM, Pièce d'identité)</label>
                <div className="bg-[#070b13] border-2 border-dashed border-white/[0.08] hover:border-amber-400/40 rounded-xl p-4 transition-all text-center relative">
                  <input type="file" multiple accept=".pdf,.png,.jpg,.jpeg" onChange={handleVerificationDocsUpload} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                  <p className="text-amber-400 font-medium text-xs">📂 Cliquez ou glissez vos documents ici</p>
                  <p className="text-[10px] text-white/30 mt-1">Formats acceptés : PDF, PNG, JPG (Max 5MB par fichier)</p>
                </div>

                {profile.verificationDocs.length > 0 && (
                  <div className="bg-[#070b13]/60 rounded-xl p-2.5 divide-y divide-white/[0.03] space-y-1.5 font-mono text-[11px]">
                    {profile.verificationDocs.map((doc, idx) => (
                      <div key={idx} className="flex justify-between items-center text-white/70 pt-1.5 first:pt-0">
                        <span className="truncate max-w-[250px]">📄 {doc.name}</span>
                        <span className="text-emerald-400 font-bold text-[10px]">{doc.size} (Prêt)</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <button className="w-full h-11 bg-amber-400 text-gray-950 font-bold text-xs rounded-xl hover:bg-amber-500 transition-all shadow-md">
                Enregistrer les modifications
              </button>
            </div>
          </div>
        )}

        {/* ==================== VUE COMMANDE ==================== */}
        {activeTab === "orders" && (
          <div className="space-y-4">
            <h2 className="text-base font-medium">Flux Expéditions</h2>
            <div className="bg-[#0c1220]/20 border border-white/[0.03] rounded-xl p-4 text-xs text-white/50">
              Aucun incident logistique à signaler en cours.
            </div>
          </div>
        )}

        {/* ==================== VUE PROMOS ==================== */}
        {activeTab === "promos" && (
          <div className="space-y-4">
            <h2 className="text-base font-medium">Codes Promotionnels Actifs</h2>
            <div className="bg-[#0c1220]/20 border border-white/[0.03] rounded-xl p-4 text-xs text-amber-400 font-mono">
              AKWABA10 - Remise de 10% globale appliquée sur votre catalogue.
            </div>
          </div>
        )}

        {/* ==================== VUE VUE D'ENSEMBLE ==================== */}
        {activeTab === "dashboard" && (
          <div className="space-y-4">
            <h2 className="text-base font-medium">Statistiques du Réseau</h2>
            <div className="bg-[#0c1220]/20 border border-white/[0.03] rounded-xl p-4 text-xs text-white/40">
              Tableau analytique synchronisé.
            </div>
          </div>
        )}

      </main>

      {/* ==================== MODAL DE CRÉATION DE PRODUIT (Réf: march.jpeg) ==================== */}
      {isAddProductOpen && (
        <div className="fixed inset-0 z-50 bg-[#070b13]/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-[#0c1220] border border-white/[0.05] rounded-2xl p-6 space-y-4 text-white max-h-[92vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-white/[0.04] pb-3">
              <span className="text-xs font-mono text-amber-400 uppercase tracking-widest font-bold">CRÉATION DE FICHE PRODUIT</span>
              <button onClick={() => setIsAddProductOpen(false)} className="text-white/40 text-xs hover:text-white">Fermer ✕</button>
            </div>

            <form onSubmit={handleCreateProduct} className="space-y-4 text-xs">
              <div>
                <label className="text-white/40 uppercase font-mono block mb-1">DÉSIGNATION DE L'ARTICLE</label>
                <input type="text" required value={newProd.name} onChange={(e) => setNewProd({ ...newProd, name: e.target.value })} placeholder="Ex: Sac à main Croco Luxe" className="w-full h-11 bg-[#070b13] border border-white/[0.05] rounded-xl px-3 focus:outline-none focus:border-amber-400 text-white" />
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="text-white/40 uppercase font-mono block mb-1 text-[10px]">PRIX GROSSISTE</label>
                  <input type="number" required value={newProd.price} onChange={(e) => setNewProd({ ...newProd, price: e.target.value })} placeholder="15000" className="w-full h-11 bg-[#070b13] border border-white/[0.05] rounded-xl px-3 focus:outline-none focus:border-amber-400" />
                </div>
                <div>
                  <label className="text-amber-400 uppercase font-mono block mb-1 text-[10px]">COM. AFFILIÉ</label>
                  <input type="number" required value={newProd.commission} onChange={(e) => setNewProd({ ...newProd, commission: e.target.value })} placeholder="3000" className="w-full h-11 bg-[#070b13] border border-white/[0.05] rounded-xl px-3 focus:outline-none focus:border-amber-400" />
                </div>
                <div>
                  <label className="text-white/40 uppercase font-mono block mb-1 text-[10px]">STOCK INITIAL</label>
                  <input type="number" required value={newProd.stock} onChange={(e) => setNewProd({ ...newProd, stock: e.target.value })} placeholder="50" className="w-full h-11 bg-[#070b13] border border-white/[0.05] rounded-xl px-3 focus:outline-none focus:border-amber-400" />
                </div>
              </div>

              {/* COMPOSANT DE TÉLÉCHARGEMENT COMPLÈTEMENT INTERACTIF SUR 3 ANGLES (Réf: march.jpeg) */}
              <div className="space-y-1.5">
                <label className="text-white/40 uppercase font-mono block text-[10px]">IMAGES DU PRODUIT (03 PROFILS DIFFÉRENTS)</label>
                <div className="grid grid-cols-3 gap-2">
                  
                  {/* Angle 1 */}
                  <label className="aspect-square bg-[#070b13] border border-white/[0.05] hover:border-amber-400/40 rounded-xl flex flex-col items-center justify-center cursor-pointer overflow-hidden transition-all relative">
                    {newProd.angle1 ? (
                      <img src={newProd.angle1} alt="Angle 1" className="w-full h-full object-cover" />
                    ) : (
                      <div className="text-center p-1">
                        <span className="text-base block">📦</span>
                        <span className="text-[9px] text-white/30 font-sans block mt-0.5">Face</span>
                      </div>
                    )}
                    <input type="file" accept="image/*" onChange={(e) => handleProductImageUpload(e, "angle1")} className="hidden" />
                  </label>

                  {/* Angle 2 */}
                  <label className="aspect-square bg-[#070b13] border border-white/[0.05] hover:border-amber-400/40 rounded-xl flex flex-col items-center justify-center cursor-pointer overflow-hidden transition-all relative">
                    {newProd.angle2 ? (
                      <img src={newProd.angle2} alt="Angle 2" className="w-full h-full object-cover" />
                    ) : (
                      <div className="text-center p-1">
                        <span className="text-base block">🔍</span>
                        <span className="text-[9px] text-white/30 font-sans block mt-0.5">Côté</span>
                      </div>
                    )}
                    <input type="file" accept="image/*" onChange={(e) => handleProductImageUpload(e, "angle2")} className="hidden" />
                  </label>

                  {/* Angle 3 */}
                  <label className="aspect-square bg-[#070b13] border border-white/[0.05] hover:border-amber-400/40 rounded-xl flex flex-col items-center justify-center cursor-pointer overflow-hidden transition-all relative">
                    {newProd.angle3 ? (
                      <img src={newProd.angle3} alt="Angle 3" className="w-full h-full object-cover" />
                    ) : (
                      <div className="text-center p-1">
                        <span className="text-base block">📐</span>
                        <span className="text-[9px] text-white/30 font-sans block mt-0.5">Détail</span>
                      </div>
                    )}
                    <input type="file" accept="image/*" onChange={(e) => handleProductImageUpload(e, "angle3")} className="hidden" />
                  </label>

                </div>
              </div>

              <div>
                <label className="text-white/40 uppercase font-mono block mb-1">DESCRIPTION DÉTAILLÉE DU PRODUIT</label>
                <textarea rows={3} required value={newProd.description} onChange={(e) => setNewProd({ ...newProd, description: e.target.value })} placeholder="Matière, dimensions, tailles disponibles pour orienter les acheteurs..." className="w-full bg-[#070b13] border border-white/[0.05] rounded-xl p-3 focus:outline-none focus:border-amber-400 resize-none text-white" />
              </div>

              <button type="submit" className="w-full h-11 bg-amber-400 text-gray-950 font-bold rounded-xl hover:bg-amber-500 transition-all text-xs uppercase tracking-wide">
                🚀 Publier l'article au catalogue affilié
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
