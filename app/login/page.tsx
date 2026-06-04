export default function LoginPage() {
  return (
    <div className="min-h-screen bg-[#071020] flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow-lg mx-auto mb-4">
            <span className="text-white font-black text-lg">BS</span>
          </div>
          <h1 className="text-3xl font-black text-white mb-2">
            Brand Ship <span className="text-amber-400">CI</span>
          </h1>
          <p className="text-white/60">Se connecter à votre compte</p>
        </div>

        {/* Form */}
        <form className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-sm">
          {/* Email */}
          <div className="mb-6">
            <label htmlFor="email" className="block text-white font-semibold mb-2">
              Adresse email
            </label>
            <input
              id="email"
              type="email"
              placeholder="votre@email.com"
              className="w-full bg-white/10 border border-white/20 text-white placeholder-white/40 rounded-xl px-4 py-3 focus:outline-none focus:border-amber-400 focus:bg-white/15 transition"
            />
          </div>

          {/* Password */}
          <div className="mb-8">
            <label htmlFor="password" className="block text-white font-semibold mb-2">
              Mot de passe
            </label>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              className="w-full bg-white/10 border border-white/20 text-white placeholder-white/40 rounded-xl px-4 py-3 focus:outline-none focus:border-amber-400 focus:bg-white/15 transition"
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-amber-400 hover:bg-amber-300 text-gray-900 font-black py-3 rounded-xl transition-all mb-4 shadow-lg shadow-amber-500/30"
          >
            Se connecter
          </button>

          {/* Divider */}
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-[#071020] text-white/40">ou</span>
            </div>
          </div>

          {/* Register Link */}
          <p className="text-center text-white/60 text-sm">
            Pas encore de compte ?{" "}
            <a href="/register" className="text-amber-400 hover:text-amber-300 font-semibold">
              S'inscrire
            </a>
          </p>
        </form>

        {/* Footer */}
        <p className="text-center text-white/25 text-xs mt-8">
          © 2025 Brand Ship CI · Tous droits réservés
        </p>
      </div>
    </div>
  );
}
