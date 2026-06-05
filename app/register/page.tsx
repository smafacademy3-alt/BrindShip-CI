"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterPage() {
  const router = useRouter();
  const [role, setRole] = useState<"influencer" | "vendor">("influencer");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  // États pour la visibilité des mots de passe
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    referralCode: "",
    companyName: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError(""); // Efface l'erreur dès que l'utilisateur modifie
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation de la confirmation du mot de passe
    if (formData.password !== formData.confirmPassword) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }

    setLoading(true);

    // Simulation d'inscription et redirection automatique
    setTimeout(() => {
      setLoading(false);
      if (role === "influencer") {
        router.push("/dashboard/influencer");
      } else {
        router.push("/dashboard/vendor");
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#071020] flex flex-col justify-center items-center px-4 py-12 relative overflow-hidden">
      {/* Orbes de fond */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-blue-600/10 blur-[120px] -z-10" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-amber-500/10 blur-[100px] -z-10" />

      <div className="w-full max-w-lg bg-[#0d1f3c] border border-white/10 rounded-3xl p-8 shadow-2xl relative z-10">
        
        {/* En-tête */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-black text-white mb-2">
            Créer votre compte <span className="text-amber-400">Brand Ship CI</span>
          </h1>
          <p className="text-white/60 text-sm">Rejoignez la plateforme #1 de Commerce Social</p>
        </div>

        {/* Sélecteur de Rôle */}
        <div className="flex bg-[#071020] p-1.5 rounded-2xl mb-6 border border-white/5">
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

        {/* Message d'erreur s'il y en a une */}
        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl text-xs font-bold text-center">
            ⚠️ {error}
          </div>
        )}

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

          {/* Mots de passe (Côte à côte sur PC, l'un sous l'autre sur Mobile) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Mot de passe */}
            <div>
              <label className="block text-white/80 text-xs font-bold uppercase tracking-wider mb-2">Mot de passe</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full bg-[#071020] border border-white/10 rounded-xl pl-4 pr-12 py-3.5 text-white placeholder-white/30 focus:outline-none focus:border-amber-400 text-sm transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition"
                >
                  {showPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Confirmer le mot de passe */}
            <div>
              <label className="block text-white/80 text-xs font-bold uppercase tracking-wider mb-2">Confirmer le mot de passe</label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full bg-[#071020] border border-white/10 rounded-xl pl-4 pr-12 py-3.5 text-white placeholder-white/30 focus:outline-none focus:border-amber-400 text-sm transition"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition"
                >
                  {showConfirmPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Champs conditionnels selon le rôle */}
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
              "Créer mon compte — C'est gratuit →"
            ) : (
              "Créer mon compte fournisseur →"
            )}
          </button>
        </form>

        <div className="text-center mt-6">
          <p className="text-xs text-white/40">
            Déjà inscrit ?{" "}
            <Link href="/login" className="text-amber-400 hover:underline font-bold">
              Se connecter ici
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
