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
                  <span className="text-[10px] font-mono text-gray-400 uppercase">Coût Est. Retours</span>
                  <p className="text-xl font-bold text-red-400 mt-1">125 000 F</p>
                </div>
                <div className="bg-[#12161F] border border-white/[0.05] p-4 rounded-xl">
                  <span className="text-[10px] font-mono text-gray-400 uppercase">Litiges Ouverts</span>
                  <p className="text-xl font-bold text-white mt-1">0</p>
                </div>
              </div>

              {/* Liste des Retours */}
              <div className="bg-[#12161F] border border-white/[0.05] rounded-2xl p-5 space-y-4">
                <h3 className="text-sm font-semibold text-white">Dossiers de retours en cours</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-white/[0.04] text-gray-400 font-mono text-[10px] uppercase">
                        <th className="pb-2">N° Retour</th>
                        <th className="pb-2">Commande</th>
                        <th className="pb-2">Client & Produit</th>
                        <th className="pb-2">Motif</th>
                        <th className="pb-2">Délai Actuel</th>
                        <th className="pb-2 text-right">Statut / Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/[0.02]">
                      {returns.map((ret) => (
                        <tr key={ret.id} className="hover:bg-white/[0.01]">
                          <td className="py-3 font-mono text-gray-300">{ret.id}</td>
                          <td className="py-3 font-mono text-blue-400">{ret.orderId}</td>
                          <td className="py-3">
                            <p className="font-medium text-white">{ret.client}</p>
                            <p className="text-gray-500">{ret.product}</p>
                          </td>
                          <td className="py-3 text-gray-400">{ret.reason}</td>
                          <td className="py-3">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${ret.delayDays > 3 ? "bg-red-500/10 text-red-400" : "bg-emerald-500/10 text-emerald-400"}`}>
                              {ret.delayDays} jours
                            </span>
                          </td>
                          <td className="py-3 text-right">
                            <button type="button" className="bg-white/10 hover:bg-white/20 text-white px-3 py-1 rounded transition-colors">
                              Gérer
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
              MODULE 4 : STOCK INTELLIGENCE
              ========================================== */}
          {activeTab === "stock" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-bold text-white">Stock Intelligence <span className="bg-purple-500/20 text-purple-300 text-[10px] px-2 py-0.5 rounded ml-2 font-mono">XGBoost ML</span></h2>
                  <p className="text-xs text-gray-400 mt-1">Prévisions de la chaîne d'approvisionnement basées sur le Machine Learning.</p>
                </div>
                <button className="bg-purple-600 hover:bg-purple-500 text-white text-xs px-4 py-2 rounded-xl font-medium transition-colors">
                  Relancer l'Analyse
                </button>
              </div>

              <div className="bg-[#12161F] border border-white/[0.05] rounded-2xl p-5 space-y-4">
                <h3 className="text-sm font-semibold text-white">Recommandations & Alertes IA</h3>
                <div className="space-y-3">
                  {mlAlerts.map((alert, index) => (
                    <div key={index} className={`flex items-center justify-between p-4 rounded-xl border ${
                      alert.priority === "urgent" ? "bg-red-500/5 border-red-500/20" :
                      alert.priority === "medium" ? "bg-amber-500/5 border-amber-500/20" :
                      alert.priority === "violet" ? "bg-purple-500/5 border-purple-500/20" :
                      alert.priority === "success" ? "bg-emerald-500/5 border-emerald-500/20" :
                      "bg-blue-500/5 border-blue-500/20"
                    }`}>
                      <div className="flex items-center gap-4">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
                          alert.priority === "urgent" ? "bg-red-500/20 text-red-400" :
                          alert.priority === "medium" ? "bg-amber-500/20 text-amber-400" :
                          alert.priority === "violet" ? "bg-purple-500/20 text-purple-400" :
                          alert.priority === "success" ? "bg-emerald-500/20 text-emerald-400" :
                          "bg-blue-500/20 text-blue-400"
                        }`}>
                          {alert.priority === "urgent" ? "⚠️" : alert.priority === "success" ? "📈" : "🤖"}
                        </div>
                        <div>
                          <h4 className="text-sm font-semibold text-white">{alert.product}</h4>
                          <p className="text-xs text-gray-400 mt-0.5">Horizon prédictif : <span className="font-mono text-gray-300">{alert.horizon}</span> | Type : <span className="uppercase text-[10px]">{alert.type}</span></p>
                        </div>
                      </div>
                      <div>
                        <button className="bg-white/[0.05] hover:bg-white/[0.1] text-white text-xs px-4 py-2 rounded-lg transition-colors border border-white/[0.05]">
                          {alert.action}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ==========================================
              MODULE 5 : MARKETING AUTO
              ========================================== */}
          {activeTab === "marketing" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold text-white">Marketing Automatisé</h2>
                <p className="text-xs text-gray-400 mt-1">Séquences CRM et relances multi-canales.</p>
              </div>

              <div className="bg-[#12161F] border border-white/[0.05] rounded-2xl p-5 space-y-4">
                <h3 className="text-sm font-semibold text-white">Workflows Actifs</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {marketingWorkflows.map((workflow) => (
                    <div key={workflow.id} className="bg-[#0B0E14] border border-white/[0.05] p-5 rounded-xl space-y-3 relative overflow-hidden">
                      <div className={`absolute top-0 left-0 w-1 h-full ${workflow.active ? "bg-emerald-500" : "bg-gray-600"}`}></div>
                      <div className="flex justify-between items-start">
                        <h4 className="font-semibold text-white">{workflow.name}</h4>
                        <span className={`text-[9px] px-2 py-0.5 rounded uppercase font-bold ${workflow.active ? "bg-emerald-500/10 text-emerald-400" : "bg-gray-800 text-gray-400"}`}>
                          {workflow.active ? "Actif" : "Inactif"}
                        </span>
                      </div>
                      <div className="space-y-1 text-xs text-gray-400">
                        <p><span className="text-gray-500">Déclencheur:</span> {workflow.trigger}</p>
                        <p><span className="text-gray-500">Canaux:</span> {workflow.channels}</p>
                      </div>
                      <div className="pt-3 border-t border-white/[0.05]">
                        <p className="text-sm font-mono text-blue-400 font-bold">{workflow.performance}</p>
                      </div>
                    </div>
                  ))}
                  
                  {/* Bouton Créer */}
                  <button className="bg-dashed border-2 border-dashed border-white/[0.1] hover:border-blue-500/50 hover:bg-blue-500/5 rounded-xl flex flex-col items-center justify-center p-6 text-gray-400 hover:text-blue-400 transition-all min-h-[160px]">
                    <span className="text-2xl mb-2">+</span>
                    <span className="text-xs font-semibold">Créer un nouveau Workflow</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ==========================================
              MODULE 6 : FINANCE & TVA
              ========================================== */}
          {activeTab === "finance" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold text-white">Finance & Fiscalité</h2>
                <p className="text-xs text-gray-400 mt-1">Conformité DGI (Côte d'Ivoire) et calcul de TVA automatisé.</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-[#12161F] border border-white/[0.05] rounded-2xl p-5 space-y-4">
                  <h3 className="text-sm font-semibold text-white">Rapport Mensuel (Juin 2026)</h3>
                  <div className="space-y-4 text-sm">
                    <div className="flex justify-between border-b border-white/[0.05] pb-2">
                      <span className="text-gray-400">CA Brut Total</span>
                      <span className="font-mono text-white">12 450 000 F</span>
                    </div>
                    <div className="flex justify-between border-b border-white/[0.05] pb-2">
                      <span className="text-gray-400">TVA Collectée (18%)</span>
                      <span className="font-mono text-amber-400">2 241 000 F</span>
                    </div>
                    <div className="flex justify-between border-b border-white/[0.05] pb-2">
                      <span className="text-gray-400">Frais de Plateforme (2.5%)</span>
                      <span className="font-mono text-red-400">- 311 250 F</span>
                    </div>
                    <div className="flex justify-between pt-2">
                      <span className="font-semibold text-white">CA Net à Reverser</span>
                      <span className="font-mono text-emerald-400 font-bold text-lg">9 897 750 F</span>
                    </div>
                  </div>
                </div>

                <div className="bg-[#12161F] border border-white/[0.05] rounded-2xl p-5 space-y-4 flex flex-col justify-between">
                  <div>
                    <h3 className="text-sm font-semibold text-white">Export Comptable</h3>
                    <p className="text-xs text-gray-400 mt-2">Générez vos fichiers pour votre expert-comptable ou la déclaration e-impôts.</p>
                  </div>
                  <div className="space-y-2">
                    <button className="w-full bg-cyan-600/10 hover:bg-cyan-600/20 text-cyan-400 border border-cyan-500/20 py-2 rounded-lg text-xs font-semibold transition-colors">
                      Télécharger Excel (.xlsx)
                    </button>
                    <button className="w-full bg-white/5 hover:bg-white/10 text-white py-2 rounded-lg text-xs font-semibold transition-colors">
                      Générer Factures PDF (ZIP)
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ==========================================
              MODULE 7 : MA RÉPUTATION
              ========================================== */}
          {activeTab === "brand" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold text-white">Ma Réputation</h2>
                <p className="text-xs text-gray-400 mt-1">Gérez l'image de votre marque et les avis clients.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-[#12161F] border border-white/[0.05] p-6 rounded-2xl flex flex-col items-center justify-center text-center space-y-2">
                  <span className="text-4xl">⭐</span>
                  <h3 className="text-3xl font-bold text-white">4.8<span className="text-lg text-gray-500">/5</span></h3>
                  <p className="text-xs text-gray-400">Note globale basée sur 1 247 avis</p>
                </div>
                
                <div className="md:col-span-2 bg-[#12161F] border border-white/[0.05] p-5 rounded-2xl space-y-4">
                  <h3 className="text-sm font-semibold text-white">Derniers Avis Marquants</h3>
                  <div className="space-y-4">
                    <div className="border-b border-white/[0.05] pb-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <span className="text-amber-400 text-xs">⭐⭐⭐⭐⭐</span>
                          <p className="text-sm font-medium text-white mt-1">Amina B. - Robe de Soirée Silk</p>
                        </div>
                        <span className="text-[10px] text-gray-500 font-mono">Aujourd'hui</span>
                      </div>
                      <p className="text-xs text-gray-400 mt-1">"Qualité incroyable et livraison super rapide. Je recommande vivement !"</p>
                    </div>
                    <div>
                      <div className="flex justify-between items-start">
                        <div>
                          <span className="text-amber-400 text-xs">⭐⭐⭐⭐</span>
                          <p className="text-sm font-medium text-white mt-1">Jean P. - Montre Connectée</p>
                        </div>
                        <span className="text-[10px] text-gray-500 font-mono">Hier</span>
                      </div>
                      <p className="text-xs text-gray-400 mt-1">"Bon produit, correspond à la description. L'emballage pourrait être amélioré."</p>
                    </div>
                  </div>
                  <button className="text-blue-400 text-xs font-semibold hover:underline w-full text-center">Voir tous les avis (12 à traiter)</button>
                </div>
              </div>
            </div>
          )}

        </main>
      </div>
    </div>
  );
}
