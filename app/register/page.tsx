export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-[#071020] flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow-lg mx-auto mb-4">
            <span className="text-white font-black text-lg">BS</span>
          </div>
          <h1 className="text-3xl font-black text-white mb-2">
            Créez votre boutique
          </h1>
          <p className="text-white/60">Rejoignez Brand Ship CI gratuitement</p>
        </div>

        {/* Form */}
        <form className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-sm">
          {/* Full Name */}
          <div className="mb-4">
            <label htmlFor="fullname" className="block text-white font-semibold mb-2">
              Nom complet
            </label>
            <input
              id="fullname"
              type="text"
              placeholder="Votre nom"
              className="w-full bg-white/10 border border-white/20 text-white placeholder-white/40 rounded-xl px-4 py-3 focus:outline-none focus:border-amber-400 focus:bg-white/15 transition"
            />
          </div>

          {/* Email */}
          <div className="mb-4">
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

          {/* Phone */}
          <div className="mb-4">
            <label htmlFor="phone" className="block text-white font-semibold mb-2">
              Numéro WhatsApp
            </label>
            <input
              id="phone"
              type="tel"
              placeholder="+225 XX XX XX XX"
              className="w-full bg-white/10 border border-white/20 text-white placeholder-white/40 rounded-xl px-4 py-3 focus:outline-none focus:border-amber-400 focus:bg-white/15 transition"
            />
          </div>

          {/* Password */}
          <div className="mb-6">
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

          {/* Terms Checkbox */}
          <div className="mb-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                className="w-4 h-4 bg-white/10 border border-white/20 rounded cursor-pointer accent-amber-400"
              />
              <span className="text-white/70 text-sm">
                J'accepte les{" "}
                <a href="#" className="text-amber-400 hover:text-amber-300">
                  conditions d'utilisation
                </a>
              </span>
            </label>
          </div>

          {/* Register Button */}
          <button
            type="submit"
            className="w-full bg-amber-400 hover:bg-amber-300 text-gray-900 font-black py-3 rounded-xl transition-all mb-4 shadow-lg shadow-amber-500/30"
          >
            Créer mon compte — C'est gratuit
          </button>

          {/* Login Link */}
          <p className="text-center text-white/60 text-sm">
            Vous avez déjà un compte ?{" "}
            <a href="/login" className="text-amber-400 hover:text-amber-300 font-semibold">
              Se connecter
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
