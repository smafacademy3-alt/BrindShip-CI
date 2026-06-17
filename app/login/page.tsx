"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [role, setRole] = useState<"influencer" | "vendor">("influencer");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulation de connexion et redirection vers le bon tableau de bord
    setTimeout(() => {
      setLoading(false);
      if (role === "influencer") {
  router.push("/influencer");
} else {
  router.push("/merchant");
}
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#071020] flex flex-col justify-center items-center px-4 py-12 relative overflow-hidden">
      {/* Orbes de fond décoratifs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-blue-600/10 blur-[120px] -z-10" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-amber-500/10 blur-[100px] -z-10" />

      <div className="w-full max-w-md bg-[#0d1f3c] border border-white/10 rounded-3xl p-8 shadow-2xl relative z-10">
        
        {/* En-tête */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-black text-white mb-2">
            Ravi de vous revoir !
          </h1>
          <p className="text-white/60 text-sm">Connectez-vous à votre espace Brand Ship CI</p>
        </div>

        {/* Sélecteur de Rôle pour savoir vers où rediriger */}
        <div className="flex bg-[#071020] p-1.5 rounded-2xl mb-6 border border-white/5">
          <button
            type="button"
            onClick={() => setRole("influencer")}
            className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all ${
              role === "influencer"
                ? "bg-amber-400 text-gray-900 shadow-md"
                : "text-white/60 hover:text-white"
            }`}
          >
            ✨ Influenceur
          </button>
          <button
            type="button"
            onClick={() => setRole("vendor")}
            className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all ${
              role === "vendor"
                ? "bg-[#1a3060] text-white border border-white/10 shadow-md"
                : "text-white/60 hover:text-white"
            }`}
          >
            📦 Fournisseur
          </button>
        </div>

        {/* Formulaire */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-white/80 text-xs font-bold uppercase tracking-wider mb-2">Adresse Email</label>
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
            <div className="flex justify-between items-center mb-2">
              <label className="block text-white/80 text-xs font-bold uppercase tracking-wider">Mot de passe</label>
              <a href="#" className="text-xs text-amber-400/80 hover:text-amber-400 hover:underline">Mot de passe oublié ?</a>
            </div>
            
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
            ) : (
              "Se connecter à mon espace →"
            )}
          </button>
        </form>

        <div className="text-center mt-6">
          <p className="text-xs text-white/40">
            Nouveau sur la plateforme ?{" "}
            <Link href="/register" className="text-amber-400 hover:underline font-bold">
              Créer un compte ici
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
