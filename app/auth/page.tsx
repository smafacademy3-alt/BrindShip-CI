"use client";

import { useState } from "react";

export default function AuthPage() {
  // --- États pour la navigation interne ---
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [role, setRole] = useState<"merchant" | "influencer" | "delivery">("influencer");

  // --- États du formulaire ---
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Logique de connexion ou d'inscription à lier avec votre backend (Supabase, Firebase, etc.)
    console.log("Soumission:", { isLogin, role, email, password, fullName, companyName, phone });
  };

  // Définition des couleurs thématiques selon le rôle sélectionné
  const getRoleColorClass = () => {
    if (role === "merchant") return "from-amber-400 to-orange-500 text-amber-400 border-amber-500/30 bg-amber-500";
    if (role === "delivery") return "from-blue-500 to-indigo-600 text-blue-400 border-blue-500/30 bg-blue-500";
    return "from-emerald-400 to-teal-500 text-emerald-400 border-emerald-500/30 bg-emerald-500"; // Influenceur
  };

  return (
    <div className="min-h-screen bg-[#0B0E14] text-[#F8FAFC] font-sans antialiased flex flex-col justify-center items-center p-4">
      
      {/* LOGO PLATEFORME */}
      <div className="flex items-center gap-3 mb-8">
        <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${getRoleColorClass().split(" text-")[0]} flex items-center justify-center text-xl shadow-lg`}>
          {role === "merchant" ? "🏪" : role === "delivery" ? "🚚" : "🚀"}
        </div>
        <div>
          <h1 className="font-bold text-xl tracking-tight text-white">HubEcom</h1>
          <span className="text-[10px] font-mono uppercase tracking-widest text-gray-500">Plateforme Tripartite</span>
        </div>
      </div>

      <div className="w-full max-w-md bg-[#12161F] border border-white/[0.05] rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
        
        {/* BOUTONS DE COMMUTATION (CONNEXION / INSCRIPTION) */}
        <div className="grid grid-cols-2 bg-[#0B0E14] p-1 rounded-xl border border-white/[0.04]">
          <button
            onClick={() => setIsLogin(true)}
            className={`py-2.5 text-xs font-semibold rounded-lg transition-all ${isLogin ? "bg-[#1A1F2C] text-white shadow" : "text-gray-400 hover:text-white"}`}
          >
            Se connecter
          </button>
          <button
            onClick={() => setIsLogin(false)}
            className={`py-2.5 text-xs font-semibold rounded-lg transition-all ${!isLogin ? "bg-[#1A1F2C] text-white shadow" : "text-gray-400 hover:text-white"}`}
          >
            Créer un compte
          </button>
        </div>

        {/* SÉLECTEUR DE RÔLE */}
        <div className="space-y-2">
          <label className="text-[11px] uppercase tracking-wider text-gray-400 font-medium block">Vous êtes un :</label>
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => setRole("influencer")}
              className={`py-3 rounded-xl border text-center transition-all flex flex-col items-center justify-center gap-1 ${role === "influencer" ? "border-emerald-500/40 bg-emerald-500/5 text-emerald-400" : "border-white/[0.05] bg-[#0B0E14] text-gray-400 hover:text-white"}`}
            >
              <span className="text-lg">🚀</span>
              <span className="text-[10px] font-medium">Influenceur</span>
            </button>
            <button
              onClick={() => setRole("merchant")}
              className={`py-3 rounded-xl border text-center transition-all flex flex-col items-center justify-center gap-1 ${role === "merchant" ? "border-amber-500/40 bg-amber-500/5 text-amber-400" : "border-white/[0.05] bg-[#0B0E14] text-gray-400 hover:text-white"}`}
            >
              <span className="text-lg">🏪</span>
              <span className="text-[10px] font-medium">Grossiste</span>
            </button>
            <button
              onClick={() => setRole("delivery")}
              className={`py-3 rounded-xl border text-center transition-all flex flex-col items-center justify-center gap-1 ${role === "delivery" ? "border-blue-500/40 bg-blue-500/5 text-blue-400" : "border-white/[0.05] bg-[#0B0E14] text-gray-400 hover:text-white"}`}
            >
              <span className="text-lg">🚚</span>
              <span className="text-[10px] font-medium">Livreur</span>
            </button>
          </div>
        </div>

        {/* FORMULAIRE */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Champs spécifiques à l'Inscription */}
          {!isLogin && (
            <>
              {role === "influencer" ? (
                <div className="space-y-1.5">
                  <label className="text-xs text-gray-300">Nom complet</label>
                  <input
                    type="text"
                    placeholder="Ex: Jean Hermann"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full bg-[#0B0E14] border border-white/[0.08] focus:border-white/30 rounded-xl px-4 py-3 text-sm text-white outline-none"
                    required
                  />
                </div>
              ) : (
                <div className="space-y-1.5">
                  <label className="text-xs text-gray-300">Nom de l'entreprise / Compagnie</label>
                  <input
                    type="text"
                    placeholder={role === "merchant" ? "Ex: Abidjan Luxe Grossiste" : "Ex: Flash Livraison Sarl"}
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    className="w-full bg-[#0B0E14] border border-white/[0.08] focus:border-white/30 rounded-xl px-4 py-3 text-sm text-white outline-none"
                    required
                  />
                </div>
              )}

              <div className="space-y-1.5">
                <label className="text-xs text-gray-300">Numéro de téléphone (WhatsApp)</label>
                <input
                  type="tel"
                  placeholder="Ex: +225 07 00 00 00 00"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-[#0B0E14] border border-white/[0.08] focus:border-white/30 rounded-xl px-4 py-3 text-sm text-white outline-none"
                  required
                />
              </div>
            </>
          )}

          {/* Champs communs (Connexion et Inscription) */}
          <div className="space-y-1.5">
            <label className="text-xs text-gray-300">Adresse Email</label>
            <input
              type="email"
              placeholder="votre@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#0B0E14] border border-white/[0.08] focus:border-white/30 rounded-xl px-4 py-3 text-sm text-white outline-none"
              required
            />
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between items-center">
              <label className="text-xs text-gray-300">Mot de passe</label>
              {isLogin && (
                <a href="#" className="text-[11px] text-gray-500 hover:text-white transition-colors">
                  Mot de passe oublié ?
                </a>
              )}
            </div>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#0B0E14] border border-white/[0.08] focus:border-white/30 rounded-xl px-4 py-3 text-sm text-white outline-none"
              required
            />
          </div>

          {/* BOUTON DE SOUMISSION DYNAMIQUE */}
          <button
            type="submit"
            className={`w-full bg-gradient-to-r ${getRoleColorClass().split(" text-")[0]} text-black font-bold py-3.5 rounded-xl transition-all shadow-lg mt-2 text-sm`}
          >
            {isLogin ? "Se connecter" : "Finaliser l'inscription"}
          </button>
        </form>

      </div>
    </div>
  );
}
