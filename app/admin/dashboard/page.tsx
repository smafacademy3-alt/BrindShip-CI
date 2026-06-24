"use client";

import { useState } from "react";

// --- Types pour la gestion des données ---
type PlatformUser = {
  id: string;
  name: string;
  role: "merchant" | "influencer" | "delivery";
  email: string;
  phone: string;
  status: "active" | "pending";
  dateJoined: string;
};

type AdminOrder = {
  id: string;
  influencer: string;
  merchant: string;
  deliveryCompany: string;
  city: string;
  productPrice: number; // Prix souhaité influenceur
  deliveryPrice: number;
  qty: number;
  status: "Livré" | "En cours" | "Annulé";
};

export default function SuperAdminDashboard() {
  // --- ÉTATS DE NAVIGATION ---
  const [activeTab, setActiveTab] = useState<"overview" | "users" | "orders">("overview");
  const [userFilter, setUserFilter] = useState<"all" | "merchant" | "influencer" | "delivery">("all");

  // --- DONNÉES SIMULÉES EN PRODUCTION ---
  const [users, setUsers] = useState<PlatformUser[]>([
    { id: "USR001", name: "Jean Hermann", role: "influencer", email: "jean@hermann.ci", phone: "+225 07 01 02 03", status: "active", dateJoined: "24/06/2026" },
    { id: "USR002", name: "Abidjan Luxe Grossiste", role: "merchant", email: "contact@abidjanluxe.com", phone: "+225 05 88 99 00", status: "active", dateJoined: "22/06/2026" },
    { id: "USR003", name: "Flash Livraison Sarl", role: "delivery", email: "ops@flashlivraison.ci", phone: "+225 01 44 55 66", status: "active", dateJoined: "20/06/2026" },
    { id: "USR004", name: "Awa Digital Shop", role: "influencer", email: "awa@shop.ci", phone: "+225 07 77 88 99", status: "pending", dateJoined: "24/06/2026" },
  ]);

  const [orders, setOrders] = useState<AdminOrder[]>([
    { id: "CMD-9842", influencer: "Jean Hermann", merchant: "Abidjan Luxe Grossiste", deliveryCompany: "Flash Livraison Sarl", city: "Yamoussoukro", productPrice: 14000, deliveryPrice: 3000, qty: 2, status: "En cours" },
    { id: "CMD-9841", influencer: "Awa Digital Shop", merchant: "Abidjan Luxe Grossiste", deliveryCompany: "Flash Livraison Sarl", city: "Abidjan", productPrice: 20000, deliveryPrice: 1500, qty: 1, status: "Livré" },
    { id: "CMD-9840", influencer: "Jean Hermann", merchant: "Abidjan Luxe Grossiste", deliveryCompany: "Flash Livraison Sarl", city: "Bouaké", productPrice: 12500, deliveryPrice: 3500, qty: 3, status: "Livré" },
  ]);

  // --- RÈGLES DE CALCUL DES REVENUS DE LA PLATEFORME ---
  const BASE_MERCHANT_COST = 10000; // Prix de gros fixe pour simulation

  let totalGmv = 0; // Volume d'affaires total généré sur le marché
  let platformMerchantGains = 0; // Cumul des 2% Grossistes
  let platformInfluencerGains = 0; // Cumul des 10% Influenceurs
  let platformDeliveryGains = 0; // Cumul des 2% Livreurs
  let platformMaintenanceGains = 0; // Cumul des 700 FCFA fixes

  orders.forEach((order) => {
    if (order.status !== "Annulé") {
      const orderProductTotal = (order.productPrice + 700) * order.qty;
      const orderDeliveryTotal = order.deliveryPrice;
      totalGmv += orderProductTotal + orderDeliveryTotal;

      // Calculs précis basés sur vos règles de gestion
      platformMerchantGains += Math.round(BASE_MERCHANT_COST * 0.02) * order.qty;
      platformInfluencerGains += Math.round(order.productPrice * 0.10) * order.qty;
      platformDeliveryGains += Math.round(order.deliveryPrice * 0.02);
      platformMaintenanceGains += 700 * order.qty;
    }
  });

  const totalPlatformRevenue = platformMerchantGains + platformInfluencerGains + platformDeliveryGains + platformMaintenanceGains;

  // --- ACTIONS DE MODÉRATION ---
  const toggleUserStatus = (id: string) => {
    setUsers(users.map(u => u.id === id ? { ...u, status: u.status === "active" ? "pending" : "active" } : u));
  };

  return (
    <div className="min-h-screen bg-[#0B0E14] text-[#F8FAFC] font-sans antialiased pb-12">
      
      {/* ================= SUPER ADMIN HEADER ================= */}
      <header className="sticky top-0 z-50 bg-[#0B0E14]/90 backdrop-blur-md border-b border-white/[0.05] px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-600 to-fuchsia-600 flex items-center justify-center text-lg shadow-lg shadow-fuchsia-600/10">
            👑
          </div>
          <div>
            <h1 className="font-bold text-base leading-tight text-white flex items-center gap-2">
              Super Admin <span className="text-[10px] bg-fuchsia-500/10 text-fuchsia-400 border border-fuchsia-500/20 px-2 py-0.5 rounded font-mono font-normal">HQ</span>
            </h1>
            <span className="text-[10px] font-mono text-gray-500 tracking-wider block mt-0.5">Système Global Nominal</span>
          </div>
        </div>

        {/* Menu de navigation principale */}
        <nav className="flex items-center bg-[#12161F] border border-white/[0.04] p-1 rounded-xl">
          <button 
            onClick={() => setActiveTab("overview")} 
            className={`px-4 py-2 text-xs font-medium rounded-lg transition-all ${activeTab === "overview" ? "bg-white/[0.05] text-white" : "text-gray-400 hover:text-white"}`}
          >
            📊 Vue d'ensemble
          </button>
          <button 
            onClick={() => setActiveTab("users")} 
            className={`px-4 py-2 text-xs font-medium rounded-lg transition-all ${activeTab === "users" ? "bg-white/[0.05] text-white" : "text-gray-400 hover:text-white"}`}
          >
            👥 Utilisateurs ({users.length})
          </button>
          <button 
            onClick={() => setActiveTab("orders")} 
            className={`px-4 py-2 text-xs font-medium rounded-lg transition-all ${activeTab === "orders" ? "bg-white/[0.05] text-white" : "text-gray-400 hover:text-white"}`}
          >
            📦 Commandes ({orders.length})
          </button>
        </nav>
      </header>

      {/* ================= CONTENU PRINCIPAL DYNAMIQUE ================= */}
      <main className="px-6 pt-8 max-w-6xl mx-auto space-y-8">

        {/* 1. ONGLETS VUE D'ENSEMBLE (STATISTIQUES DE LA FORMULE MAGIQUE) */}
        {activeTab === "overview" && (
          <>
            <div>
              <h2 className="text-xl font-bold tracking-tight text-white">Analyse Financière Consolidée</h2>
              <p className="text-xs text-gray-400 mt-1">Données calculées sur les flux croisés des Grossistes, Influenceurs et Transporteurs routiers.</p>
            </div>

            {/* Grille des KPI Principaux */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-[#12161F] border border-white/[0.05] p-5 rounded-2xl">
                <span className="text-[11px] font-mono uppercase text-gray-400">Volume Marché (GMV)</span>
                <p className="text-2xl font-bold font-mono text-white mt-1">{totalGmv.toLocaleString()} F</p>
                <span className="text-[10px] text-gray-500 mt-1 block">Transactions brutes clients</span>
              </div>
              <div className="bg-[#12161F] border border-fuchsia-500/20 p-5 rounded-2xl bg-gradient-to-br from-[#12161F] to-fuchsia-500/[0.02]">
                <span className="text-[11px] font-mono uppercase text-fuchsia-400 font-semibold">Chiffre Plateforme Net</span>
                <p className="text-2xl font-bold font-mono text-fuchsia-400 mt-1">{totalPlatformRevenue.toLocaleString()} F</p>
                <span className="text-[10px] text-gray-400 mt-1 block">Total des commissions collectées</span>
              </div>
              <div className="bg-[#12161F] border border-white/[0.05] p-5 rounded-2xl">
                <span className="text-[11px] font-mono uppercase text-gray-400">Commandes Traitées</span>
                <p className="text-2xl font-bold font-mono text-white mt-1">{orders.length}</p>
                <span className="text-[10px] text-emerald-400 mt-1 block">● {orders.filter(o => o.status === "Livré").length} livraisons terminées</span>
              </div>
              <div className="bg-[#12161F] border border-white/[0.05] p-5 rounded-2xl">
                <span className="text-[11px] font-mono uppercase text-gray-400">Taux de Rétention</span>
                <p className="text-2xl font-bold font-mono text-emerald-400 mt-1">100%</p>
                <span className="text-[10px] text-gray-500 mt-1 block">Zéro incident critique</span>
              </div>
            </div>

            {/* Origine des Revenus Plateforme (Détails précis de vos commissions) */}
            <div className="bg-[#12161F] border border-white/[0.04] rounded-2xl p-6 space-y-6">
              <h3 className="text-sm font-semibold text-white">Ventilation Analytique des Prélèvements Plateforme</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                
                {/* Canal Grossistes */}
                <div className="space-y-2 border-l-2 border-amber-500 pl-4">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-gray-400">Com. Grossistes (2%)</span>
                    <span className="font-mono text-white font-medium">{platformMerchantGains.toLocaleString()} FCFA</span>
                  </div>
                  <div className="w-full bg-[#0B0E14] h-1.5 rounded-full overflow-hidden">
                    <div className="bg-amber-500 h-full" style={{ width: `${(platformMerchantGains/totalPlatformRevenue)*100}%` }}></div>
                  </div>
                </div>

                {/* Canal Influenceurs */}
                <div className="space-y-2 border-l-2 border-emerald-500 pl-4">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-gray-400">Com. Influenceurs (10%)</span>
                    <span className="font-mono text-white font-medium">{platformInfluencerGains.toLocaleString()} FCFA</span>
                  </div>
                  <div className="w-full bg-[#0B0E14] h-1.5 rounded-full overflow-hidden">
                    <div className="bg-emerald-500 h-full" style={{ width: `${(platformInfluencerGains/totalPlatformRevenue)*100}%` }}></div>
                  </div>
                </div>

                {/* Canal Livraison */}
                <div className="space-y-2 border-l-2 border-blue-500 pl-4">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-gray-400">Com. Logistique (2%)</span>
                    <span className="font-mono text-white font-medium">{platformDeliveryGains.toLocaleString()} FCFA</span>
                  </div>
                  <div className="w-full bg-[#0B0E14] h-1.5 rounded-full overflow-hidden">
                    <div className="bg-blue-500 h-full" style={{ width: `${(platformDeliveryGains/totalPlatformRevenue)*100}%` }}></div>
                  </div>
                </div>

                {/* Canal Entretien Fixe */}
                <div className="space-y-2 border-l-2 border-fuchsia-500 pl-4">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-gray-400">Entretien Boutique (700F)</span>
                    <span className="font-mono text-white font-medium">{platformMaintenanceGains.toLocaleString()} FCFA</span>
                  </div>
                  <div className="w-full bg-[#0B0E14] h-1.5 rounded-full overflow-hidden">
                    <div className="bg-fuchsia-500 h-full" style={{ width: `${(platformMaintenanceGains/totalPlatformRevenue)*100}%` }}></div>
                  </div>
                </div>

              </div>
            </div>
          </>
        )}

        {/* 2. ONGLETS USERS (GESTION DES UTILISATEURS / TRIPARTITE) */}
        {activeTab === "users" && (
          <div className="bg-[#12161F] border border-white/[0.04] rounded-2xl p-5 shadow-xl space-y-4">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center border-b border-white/[0.05] pb-4 gap-3">
              <div>
                <h3 className="text-sm font-semibold text-white">Comptes Utilisateurs</h3>
                <p className="text-xs text-gray-500">Modérez et gérez les droits d'accès des trois types d'acteurs de la plateforme.</p>
              </div>
              
              {/* Filtres de rôles */}
              <div className="flex bg-[#0B0E14] p-1 rounded-xl border border-white/[0.04] text-[11px]">
                {["all", "influencer", "merchant", "delivery"].map((f) => (
                  <button
                    key={f}
                    onClick={() => setUserFilter(f as any)}
                    className={`px-3 py-1.5 capitalize font-medium rounded-lg transition-all ${userFilter === f ? "bg-[#1A1F2C] text-white" : "text-gray-400"}`}
                  >
                    {f === "all" ? "Tous" : f === "merchant" ? "Grossistes" : f === "influencer" ? "Influenceurs" : "Livreurs"}
                  </button>
                ))}
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/[0.03] text-[10px] uppercase tracking-wider text-gray-400 font-mono">
                    <th className="pb-3">ID / Acteur</th>
                    <th className="pb-3">Type</th>
                    <th className="pb-3">Contacts</th>
                    <th className="pb-3">Date d'inscription</th>
                    <th className="pb-3 text-right">Statut / Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.02] text-xs">
                  {users.filter(u => userFilter === "all" || u.role === userFilter).map((u) => (
                    <tr key={u.id} className="hover:bg-white/[0.01]">
                      <td className="py-3.5">
                        <div className="font-medium text-white">{u.name}</div>
                        <div className="text-[10px] font-mono text-gray-500 mt-0.5">{u.id}</div>
                      </td>
                      <td className="py-3.5">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-medium ${
                          u.role === "merchant" ? "bg-amber-500/10 text-amber-400" :
                          u.role === "delivery" ? "bg-blue-500/10 text-blue-400" : "bg-emerald-500/10 text-emerald-400"
                        }`}>
                          {u.role.toUpperCase()}
                        </span>
                      </td>
                      <td className="py-3.5 text-gray-300">
                        <div>{u.email}</div>
                        <div className="text-gray-500 font-mono text-[11px] mt-0.5">{u.phone}</div>
                      </td>
                      <td className="py-3.5 text-gray-400 font-mono">{u.dateJoined}</td>
                      <td className="py-3.5 text-right">
                        <button
                          onClick={() => toggleUserStatus(u.id)}
                          className={`px-3 py-1.5 rounded-lg border text-[11px] font-medium transition-all ${
                            u.status === "active" 
                              ? "bg-emerald-500/5 border-emerald-500/20 text-emerald-400 hover:bg-red-500/10 hover:text-red-400 hover:border-red-500/20" 
                              : "bg-amber-500/10 border-amber-500/20 text-amber-400 hover:bg-emerald-500/20"
                          }`}
                        >
                          {u.status === "active" ? "● Actif (Désactiver)" : "◌ En attente (Activer)"}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 3. ONGLETS ORDERS (SUIVI GLOBAL DU LOGISTIQUE & COMMERCE) */}
        {activeTab === "orders" && (
          <div className="bg-[#12161F] border border-white/[0.04] rounded-2xl p-5 shadow-xl space-y-4">
            <div>
              <h3 className="text-sm font-semibold text-white">Registre National des Ventes</h3>
              <p className="text-xs text-gray-500">Historique complet des ventes et suivi de l'état d'avancement des livraisons par zone.</p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/[0.03] text-[10px] uppercase tracking-wider text-gray-400 font-mono">
                    <th className="pb-3">Code / Destination</th>
                    <th className="pb-3">Influenceur / Grossiste</th>
                    <th className="pb-3">Livreur affecté</th>
                    <th className="pb-3">Panier & Qté</th>
                    <th className="pb-3 text-right">État</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.02] text-xs">
                  {orders.map((order) => {
                    const singleProductPricePublic = order.productPrice + 700;
                    const orderTotalPublic = (singleProductPricePublic * order.qty) + order.deliveryPrice;

                    return (
                      <tr key={order.id} className="hover:bg-white/[0.01]">
                        <td className="py-4">
                          <div className="font-mono text-white font-bold">{order.id}</div>
                          <div className="text-gray-400 flex items-center gap-1 mt-0.5">
                            <span>📍</span> {order.city}
                          </div>
                        </td>
                        <td className="py-4">
                          <div className="text-emerald-400 font-medium">📣 {order.influencer}</div>
                          <div className="text-amber-400 text-[11px] mt-0.5">🏪 {order.merchant}</div>
                        </td>
                        <td className="py-4 text-gray-300 font-medium">
                          🚚 {order.deliveryCompany}
                        </td>
                        <td className="py-4">
                          <div className="font-mono text-white font-semibold">{orderTotalPublic.toLocaleString()} FCFA</div>
                          <div className="text-gray-500 text-[11px] mt-0.5">{order.qty} x ({order.productPrice.toLocaleString()} + 700F d'entretien)</div>
                        </td>
                        <td className="py-4 text-right">
                          <span className={`px-2 py-1 rounded-lg text-[10px] font-bold ${
                            order.status === "Livré" ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" : "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                          }`}>
                            {order.status}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </main>

    </div>
  );
}
