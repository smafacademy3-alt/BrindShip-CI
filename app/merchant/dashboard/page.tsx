"use client";

import { useState } from "react";

// ==========================================
// TYPES & SYSTEM INTERFACES (TypeScript 5.4)
// ==========================================

type ModuleTab = "overview" | "analytics" | "returns" | "stock" | "marketing" | "finance" | "brand";

interface Order {
  id: string;
  client: string;
  products: string;
  amount: number;
  status: "pending" | "preparing" | "shipped" | "delivered";
  date: string;
}

interface ReturnItem {
  id: string;
  orderId: string;
  client: string;
  product: string;
  reason: string;
  status: "received_req" | "examining" | "approved" | "product_rec" | "refunded" | "closed";
  delayDays: number;
}

interface MLAlert {
  type: "rupture" | "surstock" | "pic" | "saisonnalite" | "hausse";
  product: string;
  horizon: string;
  action: string;
  priority: "urgent" | "medium" | "violet" | "info" | "success";
}

export default function BrandshipMerchantDashboard() {
  // --- ÉTAT GLOBAL DE NAVIGATION AVANCÉE ---
  const [activeTab, setActiveTab] = useState<ModuleTab>("overview");

  // --- ÉTATS INTERNES SIMULÉS (CONFORME SPÉCIFICATIONS 2026) ---
  const [orders, setOrders] = useState<Order[]>([
    { id: "CMD-2026-9842", client: "Aminata Koné", products: "Robe de Soirée Silk (x1)", amount: 45000, status: "pending", date: "26/06/2026" },
    { id: "CMD-2026-9841", client: "Oumar Diop", products: "Chaussures Sport Pro (x2)", amount: 70000, status: "preparing", date: "25/06/2026" },
    { id: "CMD-2026-9840", client: "Marie Kacou", products: "Sac à Main Luxe (x1)", amount: 125000, status: "shipped", date: "24/06/2026" },
    { id: "CMD-2026-9839", client: "Bamba Souleymane", products: "Casque Bluetooth HD (x1)", amount: 35000, status: "delivered", date: "23/06/2026" },
    { id: "CMD-2026-9838", client: "Koffi Yao", products: "Montre Connectée Sport (x1)", amount: 55000, status: "delivered", date: "22/06/2026" },
  ]);

  const [returns, setReturns] = useState<ReturnItem[]>([
    { id: "RET-041", orderId: "CMD-2026-9835", client: "Awa Touré", product: "Robe Soirée M", reason: "Taille non adaptée", status: "received_req", delayDays: 4 },
    { id: "RET-040", orderId: "CMD-2026-9822", client: "Bamba S.", product: "Casque BT", reason: "Produit défectueux", status: "examining", delayDays: 1 },
    { id: "RET-039", orderId: "CMD-2026-9810", client: "Christian N.", product: "Chaussures Pro", reason: "Changement d'avis", status: "approved", delayDays: 2 },
  ]);

  const [mlAlerts] = useState<MLAlert[]>([
    { type: "rupture", product: "Chaussures Sport Pro", horizon: "7j", action: "Commander 150 unités", priority: "urgent" },
    { type: "surstock", product: "Sac à Main Luxe", horizon: "45j", action: "Promouvoir à -20%", priority: "medium" },
    { type: "pic", product: "Montre Connectée", horizon: "14j", action: "Prévoir +200 unités", priority: "violet" },
    { type: "saisonnalite", product: "Robe Soirée Silk", horizon: "30j", action: "Réduire commande 50%", priority: "info" },
    { type: "hausse", product: "Casque Bluetooth HD", horizon: "21j", action: "Augmenter stock 30%", priority: "success" },
  ]);

  const [marketingWorkflows, setMarketingWorkflows] = useState([
    { id: 1, name: "Panier abandonné", trigger: "1h après abandon", channels: "Email + SMS", performance: "42% récupérés", active: true },
    { id: 2, name: "Bienvenue nouveau", trigger: "Inscription", channels: "Email séquence 5j", performance: "68% conversion", active: true },
    { id: 3, name: "Ré-engagement", trigger: "30j inactivité", channels: "Email promo -15%", performance: "23% retour", active: false },
  ]);

  return (
    <div className="min-h-screen bg-[#0B0E14] text-[#F8FAFC] font-sans antialiased flex flex-col selection:bg-blue-500/30">
      
      {/* ==========================================
          GLOBAL SUITE BAR & APP HEADER
          ========================================== */}
      <header className="sticky top-0 z-50 bg-[#0B0E14]/90 backdrop-blur-md border-b border-white/[0.05] px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 via-indigo-600 to-violet-600 flex items-center justify-center text-xl shadow-xl shadow-indigo-600/20">
            📦
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-bold text-lg tracking-tight text-white">Brandship CI</h1>
              <span className="text-[10px] bg-gradient-to-r from-amber-500 to-orange-500 text-black font-extrabold px-2 py-0.5 rounded-full shadow-sm">
                MARCHAND PREMIUM
              </span>
            </div>
            <span className="text-[11px] font-mono text-gray-400 block mt-0.5">ID: BS-KOUASSI-2026 • Workspace Nominal</span>
          </div>
        </div>

        {/* TOP INTERACTIVE ACTIONS */}
        <div className="flex items-center gap-4">
          <div className="text-right hidden md:block">
            <p className="text-xs font-semibold text-white">Kouassi Mode CI</p>
            <p className="text-[10px] font-mono text-emerald-400">DGI Connecté • Reg. Régulier</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-[#12161F] border border-white/[0.08] flex items-center justify-center text-sm font-bold text-blue-400">
            KM
          </div>
        </div>
      </header>

      <div className="flex flex-1 flex-col lg:flex-row">
        
        {/* ==========================================
            VERTICAL NAVIGATION BAR (7 MODULES COUPLÉS)
            ========================================== */}
        <nav className="w-full lg:w-64 bg-[#0F131C] border-r border-white/[0.04] p-4 space-y-1 flex flex-row lg:flex-col overflow-x-auto lg:overflow-x-visible">
          <div className="hidden lg:block pb-4 mb-4 border-b border-white/[0.04]">
            <p className="text-[10px] font-mono uppercase tracking-widest text-gray-500 px-3">Espaces de travail</p>
          </div>

          <button
            onClick={() => setActiveTab("overview")}
            className={`w-full text-left px-3 py-3 rounded-xl text-xs font-medium transition-all flex items-center gap-3 whitespace-nowrap ${activeTab === "overview" ? "bg-blue-500/10 text-blue-400 border border-blue-500/20 font-bold" : "text-gray-400 hover:bg-white/[0.02] hover:text-white border border-transparent"}`}
          >
            <span>📊</span> Module 1 : Vue d'ensemble
          </button>

          <button
            onClick={() => setActiveTab("analytics")}
            className={`w-full text-left px-3 py-3 rounded-xl text-xs font-medium transition-all flex items-center gap-3 whitespace-nowrap ${activeTab === "analytics" ? "bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 font-bold" : "text-gray-400 hover:bg-white/[0.02] hover:text-white border border-transparent"}`}
          >
            <span>📈</span> Module 2 : Analytics Avancées
          </button>

          <button
            onClick={() => setActiveTab("returns")}
            className={`w-full text-left px-3 py-3 rounded-xl text-xs font-medium transition-all flex items-center gap-3 whitespace-nowrap ${activeTab === "returns" ? "bg-orange-500/10 text-orange-400 border border-orange-500/20 font-bold" : "text-gray-400 hover:bg-white/[0.02] hover:text-white border border-transparent"}`}
          >
            <span>🔄</span> Module 3 : Gestion Retours
          </button>

          <button
            onClick={() => setActiveTab("stock")}
            className={`w-full text-left px-3 py-3 rounded-xl text-xs font-medium transition-all flex items-center gap-3 whitespace-nowrap ${activeTab === "stock" ? "bg-purple-500/10 text-purple-400 border border-purple-500/20 font-bold" : "text-gray-400 hover:bg-white/[0.02] hover:text-white border border-transparent"}`}
          >
            <span>🧠</span> Module 4 : Stock Intelligence <span className="text-[9px] bg-purple-500/20 px-1.5 py-0.5 rounded text-purple-300 font-mono">ML</span>
          </button>

          <button
            onClick={() => setActiveTab("marketing")}
            className={`w-full text-left px-3 py-3 rounded-xl text-xs font-medium transition-all flex items-center gap-3 whitespace-nowrap ${activeTab === "marketing" ? "bg-rose-500/10 text-rose-400 border border-rose-500/20 font-bold" : "text-gray-400 hover:bg-white/[0.02] hover:text-white border border-transparent"}`}
          >
            <span>📣</span> Module 5 : Marketing Auto
          </button>

          <button
            onClick={() => setActiveTab("finance")}
            className={`w-full text-left px-3 py-3 rounded-xl text-xs font-medium transition-all flex items-center gap-3 whitespace-nowrap ${activeTab === "finance" ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 font-bold" : "text-gray-400 hover:bg-white/[0.02] hover:text-white border border-transparent"}`}
          >
            <span>🧮</span> Module 6 : Finance & TVA
          </button>

          <button
            onClick={() => setActiveTab("brand")}
            className={`w-full text-left px-3 py-3 rounded-xl text-xs font-medium transition-all flex items-center gap-3 whitespace-nowrap ${activeTab === "brand" ? "bg-amber-500/10 text-amber-400 border border-amber-500/20 font-bold" : "text-gray-400 hover:bg-white/[0.02] hover:text-white border border-transparent"}`}
          >
            <span>👑</span> Module 7 : Ma Réputation
          </button>
        </nav>

        {/* ==========================================
            DYNAMIC MODULE DISPLAY WORKSPACE
            ========================================== */}
        <main className="flex-1 p-6 lg:p-8 overflow-y-auto space-y-8 max-w-7xl mx-auto w-full">

          {/* ==========================================
              MODULE 1 : VUE D'ENSEMBLE
              ========================================== */}
          {activeTab === "overview" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-bold text-white">Performance Opérationnelle</h2>
                  <p className="text-xs text-gray-400 mt-1">Données consolidées en temps réel rafraîchies il y a 5 min.</p>
                </div>
                <div className="text-xs font-mono bg-blue-500/10 border border-blue-500/20 text-blue-400 px-3 py-1.5 rounded-xl font-medium">
                  ● Canal Ventes Directes Synchronisé
                </div>
              </div>

              {/* KPI Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-[#12161F] border border-white/[0.05] p-5 rounded-2xl">
                  <span className="text-[11px] font-mono uppercase text-gray-400 block">Chiffre d'Affaires</span>
                  <p className="text-2xl font-bold font-mono text-white mt-1">12 450 000 F</p>
                  <span className="text-[10px] text-emerald-400 mt-1 block">▲ +14.2% <span className="text-gray-500">vs mois précédent</span></span>
                </div>
                <div className="bg-[#12161F] border border-white/[0.05] p-5 rounded-2xl">
                  <span className="text-[11px] font-mono uppercase text-gray-400 block">Commandes Émises</span>
                  <p className="text-2xl font-bold font-mono text-white mt-1">1 247</p>
                  <span className="text-[10px] text-emerald-400 mt-1 block">▲ +8.5% <span className="text-gray-500">acquisition fluide</span></span>
                </div>
                <div className="bg-[#12161F] border border-white/[0.05] p-5 rounded-2xl">
                  <span className="text-[11px] font-mono uppercase text-gray-400 block">Panier Moyen</span>
                  <p className="text-2xl font-bold font-mono text-white mt-1">24 500 F</p>
                  <span className="text-[10px] text-red-400 mt-1 block">▼ -2.1% <span className="text-gray-500">ajustement marché</span></span>
                </div>
                <div className="bg-[#12161F] border border-white/[0.05] p-5 rounded-2xl">
                  <span className="text-[11px] font-mono uppercase text-gray-400 block">Satisfaction Client</span>
                  <p className="text-2xl font-bold font-mono text-blue-400 mt-1">96%</p>
                  <span className="text-[10px] text-blue-400 mt-1 block">● Excellent <span className="text-gray-500">NPS global cible</span></span>
                </div>
              </div>

              {/* Charts & Actions Panel Container */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Curve & Distribution simulation (2 cols) */}
                <div className="lg:col-span-2 space-y-6">
                  {/* Revenue Curve Mock Visualizer */}
                  <div className="bg-[#12161F] border border-white/[0.05] rounded-2xl p-5 space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="text-sm font-semibold text-white">Évolution des ventes (30 derniers jours)</h3>
                      <div className="flex gap-4 text-[10px] font-mono">
                        <span className="text-blue-400">● Période Actuelle</span>
                        <span className="text-gray-500">--- Période Précédente</span>
                      </div>
                    </div>
                    <div className="h-48 bg-[#0B0E14] rounded-xl relative flex items-end p-4 border border-white/[0.02]">
                      <div className="absolute inset-0 flex flex-col justify-between p-4 opacity-10">
                        <div className="border-b border-white w-full"></div>
                        <div className="border-b border-white w-full"></div>
                        <div className="border-b border-white w-full"></div>
                      </div>
                      <div className="w-full h-24 bg-gradient-to-t from-blue-500/10 to-transparent absolute bottom-0 left-0 right-0"></div>
                      <div className="absolute top-10 right-1/4 bg-blue-500 text-black font-mono font-bold text-[10px] px-2 py-0.5 rounded shadow">
                        Max: 540 000 F
                      </div>
                      <div className="w-full flex justify-between text-[9px] font-mono text-gray-500 z-10">
                        <span>Jour 1</span><span>Jour 10</span><span>Jour 20</span><span>Jour 30</span>
                      </div>
                    </div>
                  </div>

                  {/* Recent Orders Table */}
                  <div className="bg-[#12161F] border border-white/[0.05] rounded-2xl p-5 space-y-4">
                    <h3 className="text-sm font-semibold text-white">5 Commandes récentes nécessitant une action</h3>
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs">
                        <thead>
                          <tr className="border-b border-white/[0.04] text-gray-400 font-mono text-[10px] uppercase">
                            <th className="pb-2">N° Commande</th>
                            <th className="pb-2">Client</th>
                            <th className="pb-2">Produits</th>
                            <th className="pb-2">Montant</th>
                            <th className="pb-2">Statut</th>
                            <th className="pb-2 text-right">Action</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-white/[0.02]">
                          {orders.map((order) => (
                            <tr key={order.id} className="hover:bg-white/[0.01]">
                              <td className="py-3 font-mono text-gray-300">{order.id}</td>
                              <td className="py-3 font-medium text-white">{order.client}</td>
                              <td className="py-3 text-gray-400">{order.products}</td>
                              <td className="py-3 font-mono text-white">{order.amount.toLocaleString()} F</td>
                              <td className="py-3">
                                <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                                  order.status === "pending" ? "bg-red-500/10 text-red-400" :
                                  order.status === "preparing" ? "bg-amber-500/10 text-amber-400" :
                                  order.status === "shipped" ? "bg-emerald-500/10 text-emerald-400" : "bg-blue-500/10 text-blue-400"
                                }`}>
                                  {order.status === "pending" ? "En attente" : order.status === "preparing" ? "En préparation" : order.status === "shipped" ? "Expédiée" : "Livrée"}
                                </span>
                              </td>
                              <td className="py-3 text-right">
                                <button type="button" className="text-blue-400 hover:underline font-medium">Voir</button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                {/* Sidebar Alerts & Categories Donut Mock */}
                <div className="space-y-6">
                  {/* Category Donut Mock */}
                  <div className="bg-[#12161F] border border-white/[0.05] rounded-2xl p-5 space-y-4">
                    <h3 className="text-sm font-semibold text-white">Répartition Catégories</h3>
                    <div className="flex items-center justify-center py-4">
                      <div className="w-32 h-32 rounded-full border-8 border-blue-500 flex items-center justify-center relative">
                        <div className="absolute inset-0 rounded-full border-8 border-transparent border-t-amber-500 rotate-45"></div>
                        <div className="absolute inset-0 rounded-full border-8 border-transparent border-r-emerald-400 rotate-180"></div>
                        <div className="text-center">
                          <span className="text-xs font-mono font-bold text-white block">100%</span>
                          <span className="text-[9px] text-gray-400 uppercase">Total</span>
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-[11px] text-gray-400 font-mono">
                      <div className="flex items-center gap-1.5">
                        <span className="text-blue-500">●</span> Mode (35%)
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-amber-500">●</span> Électronique (25%)
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-emerald-400">●</span> Maison (20%)
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-purple-400">●</span> Beauté (12%)
                      </div>
                    </div>
                  </div>

                  {/* Sidebar Alert Feeds */}
                  <div className="bg-[#12161F] border border-white/[0.05] rounded-2xl p-5 space-y-4">
                    <h3 className="text-sm font-semibold text-white">Alertes critiques</h3>
                    <div className="space-y-3 text-xs">
                      <div className="flex gap-3 bg-red-500/5 p-2.5 rounded-xl border border-red-500/10">
                        <span>⚠️</span>
                        <div>
                          <p className="font-semibold text-red-400">Stock critique détecté</p>
                          <p className="text-[11px] text-gray-400 mt-0.5">5 produits prioritaires épuisés sous 48h.</p>
                        </div>
                      </div>
                      <div className="flex gap-3 bg-amber-500/5 p-2.5 rounded-xl border border-amber-500/10">
                        <span>🔄</span>
                        <div>
                          <p className="font-semibold text-amber-400">Retours en attente</p>
                          <p className="text-[11px] text-gray-400 mt-0.5">3 colis reçus à l'entrepôt à inspecter.</p>
                        </div>
                      </div>
                      <div className="flex gap-3 bg-blue-500/5 p-2.5 rounded-xl border border-blue-500/10">
                        <span>💬</span>
                        <div>
                          <p className="font-semibold text-blue-400">Avis clients non répondus</p>
                          <p className="text-[11px] text-gray-400 mt-0.5">12 évaluations nécessitent un retour de marque.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* ==========================================
              MODULE 2 : ANALYTICS AVANCÉES
              ========================================== */}
          {activeTab === "analytics" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold text-white">Analytique Prédictive de Cohorte</h2>
                <p className="text-xs text-gray-400 mt-1">Algorithmes RFM & XGBoost configurés à 87 % de précision.</p>
              </div>

              {/* Advanced KPIs Banner */}
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4 bg-[#12161F] p-5 rounded-2xl border border-white/[0.04]">
                <div>
                  <span className="text-[10px] uppercase font-mono text-gray-400 block">LTV Client</span>
                  <span className="text-lg font-bold font-mono text-white">485 000 F</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-mono text-gray-400 block">Taux Conversion</span>
                  <span className="text-lg font-bold font-mono text-emerald-400">3.8%</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-mono text-gray-400 block">Panier Abandonné</span>
                  <span className="text-lg font-bold font-mono text-red-400">67%</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-mono text-gray-400 block">CAC Moyen</span>
                  <span className="text-lg font-bold font-mono text-white">45 200 F</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-mono text-gray-400 block">Score Net NPS</span>
                  <span className="text-lg font-bold font-mono text-blue-400">72</span>
                </div>
              </div>

              {/* Heatmap & Funnel Row */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                
                {/* 12x12 Cohort Retention Graphic Mockup */}
                <div className="bg-[#12161F] border border-white/[0.05] p-5 rounded-2xl space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-sm font-semibold text-white">Matrice de Rétention (Cohortes Juin 2025 - Mai 2026)</h3>
                    <span className="text-[10px] text-gray-400 font-mono">Vue M1 à M12</span>
                  </div>
                  <div className="space-y-1.5">
                    {["Cohorte Juin", "Cohorte Sept", "Cohorte Déc", "Cohorte Mars"].map((cohort, i) => (
                      <div key={i} className="flex items-center gap-2 text-[11px]">
                        <span className="w-20 text-gray-400 font-mono">{cohort}</span>
                        <div className="flex-1 grid grid-cols-12 gap-1 text-center font-mono font-bold text-[9px] text-black">
                          <div className="bg-emerald-500 py-1.5 rounded">92%</div>
                          <div className="bg-emerald-400 py-1.5 rounded">74%</div>
                          <div className="bg-emerald-300 py-1.5 rounded">65%</div>
                          <div className="bg-amber-500 py-1.5 rounded text-white">48%</div>
                          <div className="bg-amber-400 py-1.5 rounded text-white">35%</div>
                          {Array.from({ length: 7 }).map((_, idx) => (
                            <div key={idx} className="bg-red-500/20 py-1.5 rounded text-red-400 font-normal">22%</div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between text-[10px] text-gray-500 font-mono pt-2">
                    <span>Légende : Vert (70%+)</span>
                    <span>Orange (30-50%)</span>
                    <span>Rouge (&lt;30%)</span>
                  </div>
                </div>

                {/* Conversion Funnel */}
                <div className="bg-[#12161F] border border-white/[0.05] p-5 rounded-2xl space-y-4">
                  <h3 className="text-sm font-semibold text-white">Tunnel de Conversion Entonnoir</h3>
                  <div className="space-y-3 text-xs">
                    <div>
                      <div className="flex justify-between mb-1 font-mono text-gray-400">
                        <span>Visites Uniques</span>
                        <span className="text-white font-bold">125 000</span>
                      </div>
                      <div className="w-full bg-[#0B0E14] h-6 rounded-lg overflow-hidden relative">
                        <div className="bg-blue-500/80 h-full w-full"></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1 font-mono text-gray-400">
                        <span>Produits Vus (54.4%)</span>
                        <span className="text-white font-bold">68 000</span>
                      </div>
                      <div className="w-full bg-[#0B0E14] h-6 rounded-lg overflow-hidden relative">
                        <div className="bg-blue-500/60 h-full w-[54.4%]"></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1 font-mono text-gray-400">
                        <span>Paniers Créés (27.2%)</span>
                        <span className="text-white font-bold">18 500</span>
                      </div>
                      <div className="w-full bg-[#0B0E14] h-6 rounded-lg overflow-hidden relative">
                        <div className="bg-blue-500/40 h-full w-[27.2%]"></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1 font-mono text-gray-400">
                        <span>Passage au Checkout (44.3%)</span>
                        <span className="text-white font-bold">8 200</span>
                      </div>
                      <div className="w-full bg-[#0B0E14] h-6 rounded-lg overflow-hidden relative">
                        <div className="bg-blue-500/30 h-full w-[11.2%]"></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1 font-mono text-gray-400">
                        <span>Paiement Validé (57.9%)</span>
                        <span className="text-emerald-400 font-bold">4 750</span>
                      </div>
                      <div className="w-full bg-[#0B0E14] h-6 rounded-lg overflow-hidden relative">
                        <div className="bg-emerald-500/40 h-full w-[3.8%]"></div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>

              {/* Geographic Distribution Panel */}
              <div className="bg-[#12161F] border border-white/[0.04] p-5 rounded-2xl space-y-4">
                <h3 className="text-sm font-semibold text-white">Analyse Géographique Côte d'Ivoire</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                  <div className="bg-[#0B0E14] p-3 rounded-xl border border-white/[0.04]">
                    <div className="flex justify-between font-mono mb-1.5">
                      <span className="text-white font-medium">1. Abidjan</span>
                      <span className="text-blue-400 font-bold">8.45M F</span>
                    </div>
                    <p className="text-[11px] text-gray-500">523 Commandes assurées</p>
                  </div>
                  <div className="bg-[#0B0E14] p-3 rounded-xl border border-white/[0.04]">
                    <div className="flex justify-between font-mono mb-1.5">
                      <span className="text-white font-medium">2. Bouaké</span>
                      <span className="text-blue-400 font-bold">2.10M F</span>
                    </div>
                    <p className="text-[11px] text-gray-500">142 Commandes assurées</p>
                  </div>
                  <div className="bg-[#0B0E14] p-3 rounded-xl border border-white/[0.04]">
                    <div className="flex justify-between font-mono mb-1.5">
                      <span className="text-white font-medium">3. Yamoussoukro</span>
                      <span className="text-blue-400 font-bold">980 000 F</span>
                    </div>
                    <p className="text-[11px] text-gray-500">68 Commandes assurées</p>
                  </div>
                </div>
                
                {/* AI Insight Box */}
                <div className="bg-indigo-500/5 border border-indigo-500/20 p-4 rounded-xl text-xs text-indigo-300 flex items-center gap-3">
                  <span>💡</span>
                  <p><strong>Insight Intelligence Artificielle :</strong> Les clients acquis en Décembre 2025 affichent un taux de rétention supérieur de +15 % en raison des campagnes de fidélité automatisées post-achat.</p>
                </div>
              </div>
            </div>
          )}

          {/* ==========================================
              MODULE 3 : GESTION DES RETOURS
              ========================================== */}
          {activeTab === "returns" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold text-white">Régulation des Flux & Retours</h2>
                <p className="text-xs text-gray-400 mt-1">Suivi en direct du cycle d'évaluation logistique.</p>
              </div>

              {/* KPIs Retours */}
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <div className="bg-[#12161F] border border-white/[0.05] p-4 rounded-xl">
                  <span className="text-[10px] font-mono text-gray-400 uppercase">Taux de Retour</span>
                  <p className="text-xl font-bold text-white mt-1">4.2%</p>
                </div>
                <div className="bg-[#12161F] border border-white/[0.05] p-4 rounded-xl">
                  <span className="text-[10px] font-mono text-gray-400 uppercase">Retours Actifs</span>
                  <p className="text-xl font-bold text-amber-400 mt-1">12</p>
                </div>
                <div className="bg-[#12161F] border border-white/[0.05] p-4 rounded-xl">
                  <span className="text-[10px] font-mono text-gray-400 uppercase">Délai Moyen</span>
                  <p className="text-xl font-bold text-white mt-1">2.1 jours</p>
                </div>
                <div className="bg-[#12161F] border border-white/[0.05] p-4 rounded-xl">
                  <span className="text-[10px] font-mono text-gray-400 uppercase">Coût Logistique</span>
                  <p className="text-xl font-bold text-white mt-1">12 500 F</p>
                </div>
                <div className="bg-[#12161F] border border-white/[0.05] p-4 rounded-xl">
                  <span className="text-[10px] font-mono text-gray-400 uppercase">Résolution Positive</span>
                  <p className="text-xl font-bold text-emerald-400 mt-1">94%</p>
                </div>
              </div>

              {/* Kanban Visualizer Pipeline */}
              <div className="bg-[#12161F] border border-white/[0.05] p-5 rounded-2xl space-y-4">
                <h3 className="text-sm font-semibold text-white">Pipeline Automatisé (State Machine)</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-xs">
                  <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400">
                    <p className="font-bold">1. Demande Reçue</p>
                    <span className="text-lg font-mono font-bold block mt-1">12</span>
                  </div>
                  <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
                    <p className="font-bold">2. En examen</p>
                    <span className="text-lg font-mono font-bold block mt-1">5</span>
                  </div>
                  <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                    <p className="font-bold">3. Approuvé</p>
                    <span className="text-lg font-mono font-bold block mt-1">3</span>
                  </div>
                  <div className="p-3 rounded-xl bg-orange-500/10 border border-orange-500/20 text-orange-400">
                    <p className="font-bold">4. Produit Reçu</p>
                    <span className="text-lg font-mono font-bold block mt-1">2</span>
                  </div>
                  <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                    <p className="font-bold">5. Remboursé</p>
                    <span className="text-lg font-mono font-bold block mt-1">29</span>
                  </div>
                  <div className="p-3 rounded-xl bg-gray-500/10 border border-white/[0.08] text-gray-400">
                    <p className="font-bold">6. Clos</p>
                    <span className="text-lg font-mono font-bold block mt-1">45</span>
                  </div>
                </div>
              </div>

              {/* Returns Ledger Table */}
              <div className="bg-[#12161F] border border-white/[0.05] p-5 rounded-2xl">
                <h3 className="text-sm font-semibold text-white mb-4">Registre de Traitement Direct</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-white/[0.04] text-gray-400 font-mono text-[10px] uppercase">
                        <th className="pb-2">ID Retour</th>
                        <th className="pb-2">Client</th>
                        <th className="pb-2">Produit / Motif</th>
                        <th className="pb-2">Alerte SLA</th>
                        <th className="pb-2 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/[0.02]">
                      {returns.map((ret) => (
                        <tr key={ret.id}>
                          <td className="py-3 font-mono text-white">{ret.id}</td>
                          <td className="py-3 text-gray-300">{ret.client}</td>
                          <td className="py-3">
                            <div className="text-white font-medium">{ret.product}</div>
                            <div className="text-[11px] text-gray-500">{ret.reason}</div>
                          </td>
                          <td className="py-3">
                            <span className={`font-mono text-[11px] font-bold ${ret.delayDays > 3 ? "text-red-400" : "text-gray-400"}`}>
                              {ret.delayDays} jours d'attente
                            </span>
                          </td>
                          <td className="py-3 text-right">
                            <button type="button" className="bg-[#0B0E14] border border-white/[0.08] text-xs px-3 py-1.5 rounded-lg text-gray-300 hover:text-white transition-all">
                              Voir détail
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ==========================================
              MODULE 4 : STOCK INTELLIGENCE ML
              ========================================== */}
          {activeTab === "stock" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    Gestion Prédictive des Stocks
                    <span className="text-[10px] font-mono font-bold bg-purple-500/20 text-purple-400 border border-purple-500/30 px-2 py-0.5 rounded">
                      ML ACTIVE
                    </span>
                  </h2>
                  <p className="text-xs text-gray-400 mt-1">Analyse Prophet + LSTM Ensemble exécutée hebdomadairement.</p>
                </div>
                <button type="button" className="text-xs bg-purple-600 hover:bg-purple-700 text-white font-medium px-4 py-2 rounded-xl transition-all shadow-lg shadow-purple-600/10">
                  ⚡ Réentraîner le modèle maintenant
                </button>
              </div>

              {/* KPIs Stock */}
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <div className="bg-[#12161F] border border-white/[0.05] p-4 rounded-xl">
                  <span className="text-[10px] font-mono text-gray-400 uppercase">Valeur Actuelle</span>
                  <p className="text-xl font-bold text-white mt-1">45 200 000 F</p>
                </div>
                <div className="bg-[#12161F] border border-white/[0.05] p-4 rounded-xl">
                  <span className="text-[10px] font-mono text-gray-400 uppercase">Taux de Rotation</span>
                  <p className="text-xl font-bold text-white mt-1">8.2x / an</p>
                </div>
                <div className="bg-[#12161F] border border-white/[0.05] p-4 rounded-xl">
                  <span className="text-[10px] font-mono text-gray-400 uppercase">Alertes Rupture</span>
                  <p className="text-xl font-bold text-red-400 mt-1">3 SKU</p>
                </div>
                <div className="bg-[#12161F] border border-white/[0.05] p-4 rounded-xl">
                  <span className="text-[10px] font-mono text-gray-400 uppercase">Surstock Détecté</span>
                  <p className="text-xl font-bold text-amber-400 mt-1">12 SKU</p>
                </div>
                <div className="bg-[#12161F] border border-purple-500/20 p-4 rounded-xl bg-gradient-to-br from-[#12161F] to-purple-500/[0.02]">
                  <span className="text-[10px] font-mono text-purple-400 uppercase font-semibold">Précision ML</span>
                  <p className="text-xl font-bold text-purple-400 mt-1">94.3%</p>
                </div>
              </div>

              {/* Prediction Visualizer Mockup & ABC Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Prediction Graph Container */}
                <div className="lg:col-span-2 bg-[#12161F] border border-white/[0.05] p-5 rounded-2xl space-y-4">
                  <h3 className="text-sm font-semibold text-white">Demande Estimée vs Seuil d'Alerte Réapprovisionnement</h3>
                  <div className="h-44 bg-[#0B0E14] border border-white/[0.02] rounded-xl relative p-4 flex flex-col justify-between">
                    <div className="w-full border-t border-dashed border-red-500/40 text-[9px] font-mono text-red-400 pt-1">
                      Seuil Critique Rupture (&lt;15 unités)
                    </div>
                    <div className="w-full border-t border-dashed border-amber-500/30 text-[9px] font-mono text-amber-400 pt-1">
                      Point de Commande Optimal (30 unités)
                    </div>
                    <div className="w-full border-t border-dashed border-emerald-500/20 text-[9px] font-mono text-emerald-400 pt-1">
                      Stock de Confort Actuel (50 unités)
                    </div>
                    <div className="absolute inset-y-0 left-1/2 border-l border-purple-500/30 flex items-center">
                      <span className="text-[8px] font-mono bg-purple-500 text-black px-1 rounded -translate-x-1/2 uppercase font-bold tracking-wider">Aujourd'hui</span>
                    </div>
                  </div>
                </div>

                {/* ABC/XYZ Matrix Visualizer */}
                <div className="bg-[#12161F] border border-white/[0.05] p-5 rounded-2xl space-y-3">
                  <h3 className="text-sm font-semibold text-white">Matrice Classification ABC / XYZ</h3>
                  <div className="grid grid-cols-3 gap-1.5 text-center font-mono font-bold text-[10px] text-white">
                    <div className="bg-red-500/20 border border-red-500/40 p-2 rounded text-red-400">AX (15)</div>
                    <div className="bg-amber-500/10 border border-amber-500/30 p-2 rounded text-amber-400">AY (22)</div>
                    <div className="bg-[#0B0E14] border border-white/[0.04] p-2 rounded text-gray-500">AZ (8)</div>
                    <div className="bg-[#0B0E14] border border-white/[0.04] p-2 rounded text-gray-400">BX (28)</div>
                    <div className="bg-blue-500/20 border border-blue-500/40 p-2 rounded text-blue-400">BY (45)</div>
                    <div className="bg-[#0B0E14] border border-white/[0.04] p-2 rounded text-gray-500">BZ (18)</div>
                    <div className="bg-[#0B0E14] border border-white/[0.04] p-2 rounded text-gray-500">CX (12)</div>
                    <div className="bg-[#0B0E14] border border-white/[0.04] p-2 rounded text-gray-500">CY (35)</div>
                    <div className="bg-gray-500/20 border border-white/[0.08] p-2 rounded text-gray-400">CZ (67)</div>
                  </div>
                  <p className="text-[10px] text-gray-400 leading-relaxed mt-1 text-center">Les produits en cellule <strong>CZ</strong> sont inactifs et prioritaires pour élimination ou déstockage immédiat.</p>
                </div>

              </div>

              {/* Actions recommendations ledger */}
              <div className="bg-[#12161F] border border-white/[0.04] p-5 rounded-2xl space-y-4">
                <h3 className="text-sm font-semibold text-white">Actions Précises Recommandées par l'IA</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-white/[0.04] text-gray-400 font-mono text-[10px] uppercase">
                        <th className="pb-2">Type d'événement</th>
                        <th className="pb-2">Produit Impacté</th>
                        <th className="pb-2">Horizon Estimé</th>
                        <th className="pb-2">Action Corrective recommandée</th>
                        <th className="pb-2 text-right">Priorité</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/[0.02]">
                      {mlAlerts.map((alert, idx) => (
                        <tr key={idx}>
                          <td className="py-3 font-semibold capitalize text-white">
                            {alert.type === "pic" ? "🔥 Pic demande" : alert.type === "rupture" ? "🛑 Rupture probable" : alert.type === "surstock" ? "📦 Surstock" : "📊 Info Flux"}
                          </td>
                          <td className="py-3 text-gray-300 font-medium">{alert.product}</td>
                          <td className="py-3 font-mono text-gray-400">{alert.horizon}</td>
                          <td className="py-3 text-gray-300">{alert.action}</td>
                          <td className="py-3 text-right">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              alert.priority === "urgent" ? "bg-red-500/10 text-red-400" :
                              alert.priority === "medium" ? "bg-amber-500/10 text-amber-400" :
                              alert.priority === "violet" ? "bg-purple-500/10 text-purple-400" : "bg-blue-500/10 text-blue-400"
                            }`}>
                              {alert.priority.toUpperCase()}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ==========================================
              MODULE 5 : MARKETING & CAMPAGNES
              ========================================== */}
          {activeTab === "marketing" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    Cibles & Campagnes Automatisées
                    <span className="text-[10px] font-mono font-bold bg-rose-500/20 text-rose-400 border border-rose-500/30 px-2 py-0.5 rounded">
                      AUTO-PILOT ON
                    </span>
                  </h2>
                  <p className="text-xs text-gray-400 mt-1">Génération de revenus automatisée par segmentation RFM permanente.</p>
                </div>
              </div>

              {/* Marketing Performance Cards */}
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <div className="bg-[#12161F] border border-white/[0.05] p-4 rounded-xl">
                  <span className="text-[10px] font-mono text-gray-400 uppercase">Budget Mensuel</span>
                  <p className="text-xl font-bold text-white mt-1">2 500 000 F</p>
                </div>
                <div className="bg-[#12161F] border border-white/[0.05] p-4 rounded-xl">
                  <span className="text-[10px] font-mono text-gray-400 uppercase">Utilisation</span>
                  <p className="text-xl font-bold text-amber-400 mt-1">65%</p>
                </div>
                <div className="bg-[#12161F] border border-white/[0.05] p-4 rounded-xl">
                  <span className="text-[10px] font-mono text-gray-400 uppercase">ROI Moyen</span>
                  <p className="text-xl font-bold text-emerald-400 mt-1">4.2x</p>
                </div>
                <div className="bg-[#12161F] border border-white/[0.05] p-4 rounded-xl">
                  <span className="text-[10px] font-mono text-gray-400 uppercase">Ouverture Mail</span>
                  <p className="text-xl font-bold text-white mt-1">28.5%</p>
                </div>
                <div className="bg-[#12161F] border border-white/[0.05] p-4 rounded-xl">
                  <span className="text-[10px] font-mono text-gray-400 uppercase">Taux Clic</span>
                  <p className="text-xl font-bold text-blue-400 mt-1">4.8%</p>
                </div>
              </div>

              {/* Wizard Simulation & Scenarios Workflow */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* 6-Step Wizard Framework */}
                <div className="lg:col-span-1 bg-[#12161F] border border-white/[0.05] p-5 rounded-2xl space-y-4">
                  <h3 className="text-sm font-semibold text-white">Assistant de Création Rapide</h3>
                  <div className="space-y-2 text-xs">
                    <div className="p-2.5 bg-blue-500/10 rounded-lg text-blue-400 font-medium">1. Définition de l'Objectif (Ventes/Fidélité)</div>
                    <div className="p-2.5 bg-[#0B0E14] text-gray-500 rounded-lg">2. Sélection des segments cibles IA</div>
                    <div className="p-2.5 bg-[#0B0E14] text-gray-500 rounded-lg">3. Choix du canal d'émission (Multi-canal)</div>
                    <div className="p-2.5 bg-[#0B0E14] text-gray-500 rounded-lg">4. Personnalisation du Template intelligent</div>
                  </div>
                  <button type="button" className="w-full bg-rose-500 hover:bg-rose-600 text-white font-bold py-2.5 rounded-xl text-xs transition-all shadow-md shadow-rose-500/10">
                    Lancer l'assistant pas à pas
                  </button>
                </div>

                {/* Workflows table */}
                <div className="lg:col-span-2 bg-[#12161F] border border-white/[0.05] p-5 rounded-2xl space-y-4">
                  <h3 className="text-sm font-semibold text-white">Scénarios Autonomes Actifs</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="border-b border-white/[0.04] text-gray-400 font-mono text-[10px] uppercase">
                          <th className="pb-2">Nom du Scénario</th>
                          <th className="pb-2">Déclencheur</th>
                          <th className="pb-2">Canaux</th>
                          <th className="pb-2">Performance Clé</th>
                          <th className="pb-2 text-right">Statut</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/[0.02]">
                        {marketingWorkflows.map((flow) => (
                          <tr key={flow.id}>
                            <td className="py-3 text-white font-medium">{flow.name}</td>
                            <td className="py-3 text-gray-400 font-mono">{flow.trigger}</td>
                            <td className="py-3 text-gray-300">{flow.channels}</td>
                            <td className="py-3 text-emerald-400 font-mono font-semibold">{flow.performance}</td>
                            <td className="py-3 text-right">
                              <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${flow.active ? "bg-emerald-500/10 text-emerald-400" : "bg-gray-500/10 text-gray-400"}`}>
                                {flow.active ? "ACTIF" : "OFF"}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* ==========================================
              MODULE 6 : FINANCE & COMPTABILITÉ (DGI / TVA)
              ========================================== */}
          {activeTab === "finance" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    Livre de Caisse & Fiscalité DGI
                    <span className="text-[10px] font-mono font-bold bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 px-2 py-0.5 rounded">
                      EXPORT SAGE
                    </span>
                  </h2>
                  <p className="text-xs text-gray-400 mt-1">Conformité légale totale avec l'acte uniforme OHADA et taux de TVA standardisé à 18 %.</p>
                </div>
                <button type="button" className="text-xs bg-cyan-600 hover:bg-cyan-700 text-white font-medium px-4 py-2.5 rounded-xl transition-all shadow-lg shadow-cyan-600/10">
                  📥 Exporter le grand livre (Format SAGE .PNM)
                </button>
              </div>

              {/* Financial Status Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-[#12161F] border border-white/[0.05] p-5 rounded-2xl">
                  <span className="text-[11px] font-mono uppercase text-gray-400 block">CA Brut Mensuel</span>
                  <p className="text-xl font-bold font-mono text-white mt-1">12 450 000 F</p>
                </div>
                <div className="bg-[#12161F] border border-white/[0.05] p-5 rounded-2xl">
                  <span className="text-[11px] font-mono uppercase text-gray-400 block">Commissions Retenues</span>
                  <p className="text-xl font-bold font-mono text-red-400 mt-1">2 738 000 F</p>
                  <span className="text-[10px] text-gray-500 block mt-0.5">Frais de service & taxes inclus</span>
                </div>
                <div className="bg-[#12161F] border border-white/[0.05] p-5 rounded-2xl">
                  <span className="text-[11px] font-mono uppercase text-gray-400 block">Revenu Net Entreprise</span>
                  <p className="text-xl font-bold font-mono text-emerald-400 mt-1">9 712 000 F</p>
                </div>
                <div className="bg-[#12161F] border border-white/[0.05] p-5 rounded-2xl">
                  <span className="text-[11px] font-mono uppercase text-gray-400 block">Solde Disponible Retrait</span>
                  <p className="text-xl font-bold font-mono text-blue-400 mt-1">4 850 000 F</p>
                </div>
              </div>

              {/* DGI Fiscal Declaration Box Form */}
              <div className="bg-[#12161F] border border-white/[0.05] p-6 rounded-2xl space-y-4">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center border-b border-white/[0.05] pb-3 gap-2">
                  <div>
                    <h3 className="text-sm font-semibold text-white">Prise en charge Annexe Fiscale : Déclaration de TVA (Juin 2026)</h3>
                    <p className="text-xs text-gray-400 mt-0.5">Calcul basé sur l'assiette brute d'imposition nationale.</p>
                  </div>
                  <button type="button" className="text-xs bg-emerald-500/10 border border-emerald-500/30 hover:bg-emerald-500/20 text-emerald-400 font-bold px-3 py-1.5 rounded-lg transition-all">
                    📄 Télé-déclarer (Fichier XML DGI)
                  </button>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-xs font-mono">
                  <div className="bg-[#0B0E14] p-3 rounded-xl">
                    <span className="text-gray-500 block text-[10px]">Chiffre d'Affaires HT</span>
                    <span className="text-white font-bold block mt-1">10 375 000 F</span>
                  </div>
                  <div className="bg-[#0B0E14] p-3 rounded-xl">
                    <span className="text-amber-400 block text-[10px]">TVA Collectée (18%)</span>
                    <span className="text-amber-400 font-bold block mt-1">1 867 500 F</span>
                  </div>
                  <div className="bg-[#0B0E14] p-3 rounded-xl">
                    <span className="text-gray-500 block text-[10px]">TVA Déductible</span>
                    <span className="text-white font-bold block mt-1">342 000 F</span>
                  </div>
                  <div className="bg-[#0B0E14] p-3 rounded-xl">
                    <span className="text-red-400 block text-[10px]">TVA Nette à Payer</span>
                    <span className="text-red-400 font-bold block mt-1">1 525 500 F</span>
                  </div>
                  <div className="bg-emerald-500/5 border border-emerald-500/20 p-3 rounded-xl">
                    <span className="text-emerald-400 block text-[10px]">Solde Restant Dû</span>
                    <span className="text-emerald-400 font-extrabold block mt-1">325 500 F</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ==========================================
              MODULE 7 : MA MARQUE & RÉPUTATION
              ========================================== */}
          {activeTab === "brand" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    Identité de Marque & Audit Réputation
                    <span className="text-[10px] font-mono font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30 px-2 py-0.5 rounded">
                      PREMIUM STATUS
                    </span>
                  </h2>
                  <p className="text-xs text-gray-400 mt-1">Évaluation et benchmark de confiance de votre boutique par rapport aux concurrents.</p>
                </div>
              </div>

              {/* KPIs de Réputation */}
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <div className="bg-[#12161F] border border-amber-500/20 p-4 rounded-xl bg-gradient-to-br from-[#12161F] to-amber-500/[0.02]">
                  <span className="text-[10px] font-mono text-amber-400 uppercase font-semibold">Score Confiance</span>
                  <p className="text-xl font-bold text-amber-400 mt-1">92 / 100</p>
                </div>
                <div className="bg-[#12161F] border border-white/[0.05] p-4 rounded-xl">
                  <span className="text-[10px] font-mono text-gray-400 uppercase">Note Étoiles</span>
                  <p className="text-xl font-bold text-white mt-1">4.8 / 5</p>
                </div>
                <div className="bg-[#12161F] border border-white/[0.05] p-4 rounded-xl">
                  <span className="text-[10px] font-mono text-gray-400 uppercase">Volume Avis</span>
                  <p className="text-xl font-bold text-white mt-1">1 247</p>
                </div>
                <div className="bg-[#12161F] border border-white/[0.05] p-4 rounded-xl">
                  <span className="text-[10px] font-mono text-gray-400 uppercase">Taux Réponse</span>
                  <p className="text-xl font-bold text-emerald-400 mt-1">96%</p>
                </div>
                <div className="bg-[#12161F] border border-white/[0.05] p-4 rounded-xl">
                  <span className="text-[10px] font-mono text-gray-400 uppercase">Position Marché</span>
                  <p className="text-xl font-bold text-blue-400 mt-1">#3 National</p>
                </div>
              </div>

              {/* Certifications Badges & Benchmarks Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Badges Grid (6 Badges) */}
                <div className="bg-[#12161F] border border-white/[0.05] p-5 rounded-2xl space-y-4">
                  <h3 className="text-sm font-semibold text-white">Certifications & Badges Obtenus</h3>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="p-2.5 bg-emerald-500/5 border border-emerald-500/20 text-emerald-400 rounded-xl font-medium">
                      ✓ Vendeur Vérifié (+15% trust)
                    </div>
                    <div className="p-2.5 bg-amber-500/5 border border-amber-500/20 text-amber-400 rounded-xl font-medium">
                      👑 Premium (+25% reach)
                    </div>
                    <div className="p-2.5 bg-blue-500/5 border border-blue-500/20 text-blue-400 rounded-xl font-medium">
                      🚚 Livreur Express (+12%)
                    </div>
                    <div className="p-2.5 bg-purple-500/5 border border-purple-500/20 text-purple-400 rounded-xl font-medium">
                      ⭐ Top Rated (+18% clic)
                    </div>
                  </div>
                </div>

                {/* Benchmark Analysis */}
                <div className="lg:col-span-2 bg-[#12161F] border border-white/[0.05] p-5 rounded-2xl space-y-4">
                  <h3 className="text-sm font-semibold text-white">Indice de Performance Comparative (Top 5 Mode)</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="border-b border-white/[0.04] text-gray-400 font-mono text-[10px] uppercase">
                          <th className="pb-2">Marchand</th>
                          <th className="pb-2">Note Publique</th>
                          <th className="pb-2">Volume Affaires Mensuel</th>
                          <th className="pb-2 text-right">Classement</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/[0.02]">
                        <tr className="bg-blue-500/[0.02]">
                          <td className="py-2.5 font-bold text-white">Vous (Kouassi Mode)</td>
                          <td className="py-2.5 font-mono text-emerald-400 font-bold">4.8</td>
                          <td className="py-2.5 font-mono text-white">12.4M F</td>
                          <td className="py-2.5 text-right font-bold text-amber-400">#3</td>
                        </tr>
                        <tr>
                          <td className="py-2.5 text-gray-400">Concurrent A</td>
                          <td className="py-2.5 font-mono text-gray-400">4.6</td>
                          <td className="py-2.5 font-mono text-gray-400">18.2M F</td>
                          <td className="py-2.5 text-right text-gray-400">#1</td>
                        </tr>
                        <tr>
                          <td className="py-2.5 text-gray-400">Concurrent B</td>
                          <td className="py-2.5 font-mono text-gray-400">4.7</td>
                          <td className="py-2.5 font-mono text-gray-400">14.5M F</td>
                          <td className="py-2.5 text-right text-gray-400">#2</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

              </div>
            </div>
          )}

        </main>
      </div>

    </div>
  );
}
