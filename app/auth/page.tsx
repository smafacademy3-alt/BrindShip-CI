"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AuthPage() {
  const router = useRouter();
  
  // --- États pour la navigation interne ---
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [role, setRole] = useState<"merchant" | "influencer" | "delivery" | "admin">("influencer");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // --- États du formulaire ---
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // ================= VERIFICATION SÉCURISÉE ADMIN =================
    if (role === "admin") {
      const secureEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL;
      const securePassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD;

      if (email === secureEmail && password === securePassword) {
        // Connexion réussie -> Redirection vers le Super Admin
        router.push("/admin/dashboard");
        return;
      } else {
        setErrorMessage("Identifiants Super Admin invalides. Accès refusé.");
        return;
      }
    }

    // ================= AUTRES RÔLES (Simulation) =================
    console.log("Connexion utilisateur standard :", { role, email });
    
    // Redirection de test selon le rôle
    if (role === "delivery") router.push("/delivery/dashboard");
    else if (role === "merchant") router.push("/merchant/dashboard");
    else router.push("/influencer/dashboard");
  };

  const getRoleColorClass = () => {
    if (role === "merchant") return "from-amber-400 to-orange-500 text-amber-400 border-amber-500/30 bg-amber-500";
    if (role === "delivery") return "from-blue-500 to-indigo-600 text-blue-400 border-blue-500/30 bg-blue-500";
    if (role === "admin") return "from-violet-600 to-fuchsia-600 text-fuchsia-400 border-fuchsia-500/30 bg-fuchsia-500";
    return "from-emerald-400 to-teal-500 text-emerald-400 border-emerald-500/30 bg-emerald-500";
  };

  return (
    <div className="min-h-screen bg-[#0B0E14] text-[#F8FAFC] font-sans antialiased flex flex-col justify-center items-center p-4">
      
      {/* LOGO */}
      <div className="flex items-center gap-3 mb-8">
        <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${getRoleColorClass().split(" text-")[0]} flex items-center justify-center text-xl shadow-lg`}>
          {role === "merchant" ? "🏪" : role === "delivery" ? "🚚" : role === "admin" ? "👑" : "🚀"}
        </div>
        <div>
          <h1 className="font-bold text-xl tracking-tight text-white">HubEcom</h1>
          <span className="text-[10px] font-mono uppercase tracking-widest text-gray-500">Sécurisé par Environnement</span>
        </div>
      </div>

      <div className="w-full max-w-md bg-[#12161F] border border-white/[0.05] rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
        
        {/* COMMUTATEUR (Masqué si rôle Admin sélectionné car l'admin ne s'enregistre pas publiquement) */}
        {role !== "admin" && (
          <div className="grid grid-cols-2 bg-[#0B0E14] p-1 rounded-xl border border-white/[0.04]">
            <button
              type="button"
              onClick={() => setIsLogin(true)}
              className={`py-2.5 text-xs font-semibold rounded-lg transition-all ${isLogin ? "bg-[#1A1F2C] text-white shadow" : "text-gray-400 hover:text-white"}`}
            >
              Se connecter
            </button>
            <button
              type="button"
              onClick={() => setIsLogin(false)}
              className={`py-2.5 text-xs font-semibold rounded-lg transition-all ${!isLogin ? "bg-[#1A1F2C] text-white shadow" : "text-gray-400 hover:text-white"}`}
            >
              Créer un compte
            </button>
          </div>
        )}

        {/* SÉLECTEUR DE RÔLE (4 RÔLES) */}
        <div className="space-y-2">
          <label className="text-[11px] uppercase tracking-wider text-gray-400 font-medium block">Votre Espace :</label>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => { setRole("influencer"); setIsLogin(true); }}
              className={`py-2.5 rounded-xl border text-center transition-all flex items-center gap-2 px-3 ${role === "influencer" ? "border-emerald-500/40 bg-emerald-500/5 text-emerald-400" : "border-white/[0.05] bg-[#0B0E14] text-gray-400"}`}
            >
              <span className="text-sm">🚀</span>
              <span className="text-[11px] font-medium">Influenceur</span>
            </button>
            <button
              type="button"
              onClick={() => { setRole("merchant"); setIsLogin(true); }}
              className={`py-2.5 rounded-xl border text-center transition-all flex items-center gap-2 px-3 ${role === "merchant" ? "border-amber-500/40 bg-amber-500/5 text-amber-400" : "border-white/[0.05] bg-[#0B0E14] text-gray-400"}`}
            >
              <span className="text-sm">🏪</span>
              <span className="text-[11px] font-medium">Grossiste</span>
            </button>
            <button
              type="button"
              onClick={() => { setRole("delivery"); setIsLogin(true); }}
              className={`py-2.5 rounded-xl border text-center transition-all flex items-center gap-2 px-3 ${role === "delivery" ? "border-blue-500/40 bg-blue-500/5 text-blue-400" : "border-white/[0.05] bg-[#0B0E14] text-gray-400"}`}
            >
              <span className="text-sm">🚚</span>
              <span className="text-[11px] font-medium">Livreur</span>
            </button>
            <button
              type="button"
              onClick={() => { setRole("admin"); setIsLogin(true); }}
              className={`py-2.5 rounded-xl border text-center transition-all flex items-center gap-2 px-3 ${role === "admin" ? "border-fuchsia-500/40 bg-fuchsia-500/5 text-fuchsia-400" : "border-white/[0.05] bg-[#0B0E14] text-gray-400"}`}
            >
              <span className="text-sm">👑</span>
              <span className="text-[11px] font-medium">Super Admin</span>
            </button>
          </div>
        </div>

        {/* AFFICHAGE DES ERREURS */}
        {errorMessage && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-xs px-4 py-3 rounded-xl font-medium text-center">
            ⚠️ {errorMessage}
          </div>
        )}

        {/* FORMULAIRE CONTENANT LES INPUTS */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Champs d'inscription (uniquement si pas admin et pas login) */}
          {!isLogin && role !== "admin" && (
            <>
              {role === "influencer" ? (
                <div className="space-y-1.5">
                  <label className="text-xs text-gray-300">Nom complet</label>
                  <input
                    type="text"
                    placeholder="Ex: Prénom Nom"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full bg-[#0B0E14] border border-white/[0.08] focus:border-white/30 rounded-xl px-4 py-3 text-sm text-white outline-none"
                    required
                  />
                </div>
              ) : (
                <div className="space-y-1.5">
                  <label className="text-xs text-gray-300">Nom de l'entreprise</label>
                  <input
                    type="text"
                    placeholder="Ex: Entreprise Sarl"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    className="w-full bg-[#0B0E14] border border-white/[0.08] focus:border-white/30 rounded-xl px-4 py-3 text-sm text-white outline-none"
                    required
                  />
                </div>
              )}

              <div className="space-y-1.5">
                <label className="text-xs text-gray-300">Numéro WhatsApp</label>
                <input
                  type="tel"
                  placeholder="Ex: +225 07..."
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-[#0B0E14] border border-white/[0.08] focus:border-white/30 rounded-xl px-4 py-3 text-sm text-white outline-none"
                  required
                />
              </div>
            </>
          )}

          {/* Champs d'identifications requis (E-mail & Mot de passe) */}
          <div className="space-y-1.5">
            <label className="text-xs text-gray-300">Adresse Email</label>
            <input
              type="email"
              placeholder="Entrez votre e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#0B0E14] border border-white/[0.08] focus:border-white/30 rounded-xl px-4 py-3 text-sm text-white outline-none"
              required
            />
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between items-center">
              <label className="text-xs text-gray-300">Mot de passe</label>
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

          <button
            type="submit"
            className={`w-full bg-gradient-to-r ${getRoleColorClass().split(" text-")[0]} text-black font-bold py-3.5 rounded-xl transition-all shadow-lg mt-4 text-sm`}
          >
            {role === "admin" ? "Accéder au Panneau Maître" : isLogin ? "Se connecter" : "Créer mon compte"}
          </button>
        </form>

      </div>
    </div>
  );
}
