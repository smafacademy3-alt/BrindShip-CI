"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Logique réelle de connexion liée à l'API backend
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const res = await fetch("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    });

    const data = await res.json();
    setIsLoading(false);

    if (data.success) {
      // Redirection dynamique basée sur le rôle retourné par la base de données
      const dashboardPaths: Record<string, string> = {
        MERCHANT: "/merchant",
        INFLUENCER: "/influencer",
        DRIVER: "/delivery/dashboard",
        ADMIN: "/admin/dashboard",
        BUYER: "/",
      };
      router.push(dashboardPaths[data.role] || "/");
    } else {
      alert(data.error || "Une erreur est survenue");
    }
  };

  return (
    <div className="min-h-screen bg-brandship-dark flex items-center justify-center p-4">
      {/* Conteneur principal */}
      <div className="w-full max-w-md bg-brandship-dark-card border border-brandship-white/10 rounded-2xl shadow-2xl p-8 space-y-8">
        
        {/* En-tête / Logo */}
        <div className="text-center space-y-2">
          <div className="w-16 h-16 mx-auto bg-gradient-to-br from-brandship-orange to-brandship-green rounded-xl flex items-center justify-center shadow-lg shadow-brandship-orange/20">
            <span className="text-3xl">📦</span>
          </div>
          <h1 className="text-2xl font-bold text-brandship-white tracking-tight">
            BrandShip CI
          </h1>
          <p className="text-sm text-brandship-muted font-mono">
            Portail Sécurisé
          </p>
        </div>

        {/* Formulaire de connexion */}
        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-brandship-muted mb-1.5 uppercase tracking-wider">
                Adresse Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="jean.hermann@exemple.ci"
                className="w-full bg-brandship-dark border border-brandship-white/10 rounded-xl px-4 py-3 text-brandship-white placeholder:text-brandship-muted/50 focus:outline-none focus:border-brandship-orange focus:ring-1 focus:ring-brandship-orange transition-all"
              />
            </div>
            
            <div>
              <label className="block text-xs font-medium text-brandship-muted mb-1.5 uppercase tracking-wider">
                Mot de Passe
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-brandship-dark border border-brandship-white/10 rounded-xl px-4 py-3 text-brandship-white placeholder:text-brandship-muted/50 focus:outline-none focus:border-brandship-orange focus:ring-1 focus:ring-brandship-orange transition-all"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-brandship-orange hover:bg-[#E67500] text-white font-bold py-3.5 rounded-xl transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
            ) : (
              "Se Connecter"
            )}
          </button>
        </form>

        {/* Liens annexes */}
        <div className="text-center text-xs text-brandship-muted">
          <p>
            Vous n'avez pas de compte ?{" "}
            <a href="/register" className="text-brandship-orange hover:underline font-medium">
              S'inscrire
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
