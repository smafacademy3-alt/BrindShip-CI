"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const [role, setRole] = useState<"influencer" | "vendor">("influencer");
  const [loading, setLoading] = useState(false);
  
  // États du formulaire
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    referralCode: "", // Pour l'influenceur
    companyName: "",  // Pour le marchand
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulation d'appel API d'inscription
    setTimeout(() => {
      setLoading(false);
      // Redirection dynamique selon le rôle choisi
      if (role === "influencer") {
        router.push("/dashboard/influencer");
      } else {
        router.push("/dashboard/vendor");
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#071020] flex flex-col justify-center items-center px-4 py-12 relative overflow-hidden">
      {/* Orbes de fond décoratifs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-blue-600/10 blur-[120px]" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-amber-500/10 blur-[100px]" />

      <div className="w-full max-w-lg bg-[#0d1f3c] border border-white/10 rounded-3xl p-8 shadow-2xl relative z-10">
        
        {/* En-tête */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-black text-white mb-2">
            Créer votre compte <span className="text-amber-400">Brand Ship CI</span>
          </h1>
          <p className="text-white/60 text-sm">Rejoignez la plateforme #1 de Commerce Social</p>
        </div>

        {/* Sélecteur de Rôle */}
        <div className="flex bg-[#071020] p-1.5 rounded-2xl mb-8 border border-white/5">
          <button
            type="button"
            onClick={() => setRole("influencer")}
            className={`flex-1 py-3 rounded-xl text-sm font-bold transition-all ${
              role === "influencer"
                ? "bg-amber-400 text-gray-900 shadow-md"
                : "text-white/60 hover:text-white"
            }`}
          >
            ✨ Influenceur (Gratuit)
          </button>
          <button
            type="button"
            onClick={() => setRole("vendor")}
            className={`flex-1 py-3 rounded-xl text-sm font-bold transition-all ${
              role === "vendor"
                ? "bg-[#1a3060] text-white border border-white/10 shadow-md"
                : "text-white/60 hover:text-white"
            }`}
          >
            📦 Fournisseur / Marchand
          </button>
        </div>

        {/* Formulaire */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-white/80 text-xs font-bold uppercase tracking-wider mb-2">Nom complet</label>
            <input
              type="text"
              name="fullName"
              required
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Ex: Jean Hermann"
              className="w-full bg-[#071020] border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-white/30 focus:outline-none focus:border-amber-400 text-sm transition"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-white/80 text-xs font-bold uppercase tracking-wider mb-2">Email</label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="nom@exemple.com"
                className="w-full bg-[#071020] border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-white/30 focus:outline-none focus:border-amber-400 text-sm transition"
              />
            </div>
            <div>
              <label className="block text-white/80 text-xs font-bold uppercase tracking-wider mb-2">Téléphone (WhatsApp)</label>
              <input
                type="tel"
                name="phone"
                required
                value={formData.phone}
                onChange={handleChange}
                placeholder="Ex: 0700000000"
                className="w-full bg-[#071020] border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-white/30 focus:outline-none focus:border-amber-400 text-sm transition"
              />
            </div>
          </div>

          <div>
            <label className="block text-white/80 text-xs font-bold uppercase tracking-wider mb-2">Mot de passe</label>
            <input
              type="password"
              name="password"
              required
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full bg-[#071020] border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-white/30 focus:outline-none focus:border-amber-400 text-sm transition"
            />
          </div>

          {/* Champs conditionnels selon le rôle sélectionné */}
          {role === "influencer" ? (
            <div>
              <label className="block text-white/80 text-xs font-bold uppercase tracking-wider mb-2">Code de parrainage (Optionnel)</label>
              <input
                type="text"
                name="referralCode"
                value={formData.referralCode}
                onChange={handleChange}
                placeholder="Entrez un code si disponible"
                className="w-full bg-[#071020] border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-white/30 focus:outline-none focus:border-amber-400 text-sm transition"
              />
            </div>
          ) : (
            <div>
              <label className="block text-white/80 text-xs font-bold uppercase tracking-wider mb-2">Nom de l'entreprise / Boutique</label>
              <input
                type="text"
                name="companyName"
                required
                value={formData.companyName}
                onChange={handleChange}
                placeholder="Ex: Abidjan Tech Distribution"
                className="w-full bg-[#071020] border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-white/30 focus:outline-none focus:border-amber-400 text-sm transition"
              />
            </div>
          )}

          {/* Bouton Soumettre dynamique */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full font-black text-sm py-4 rounded-xl transition-all duration-300 mt-4 flex items-center justify-center gap-2 ${
              role === "influencer"
                ? "bg-amber-400 hover:bg-amber-300 text-gray-900 shadow-xl shadow-amber-500/20"
                : "bg-white text-[#071020] hover:bg-gray-100 shadow-xl shadow-white/10"
            }`}
          >
            {loading ? (
              <span className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
            ) : role === "influencer" ? (
              "Créer mon compte influenceur →"
            ) : (
              "Créer mon compte fournisseur →"
            )}
          </button>
        </form>

        <p className="text-center text-xs text-white/40 mt-6">
          En vous inscrivant, vous acceptez nos <span className="text-amber-400 cursor-pointer underline">CGU</span> et notre <span className="text-amber-400 cursor-pointer underline">Politique de confidentialité</span>.
        </p>
      </div>
    </div>
  );
}
