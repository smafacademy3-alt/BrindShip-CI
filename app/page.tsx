"use client";

import { useState, useEffect } from "react";

// ─── Données ──────────────────────────────────────────────────────────────

const SPECIAL_OFFERS = [
  { emoji: "🚚", text: "Livraison Gratuite", color: "bg-blue-100" },
  { emoji: "🎁", text: "Remise 20%", color: "bg-amber-100" },
  { emoji: "📦", text: "Livraison palpetex", color: "bg-green-100" },
  { emoji: "🚚", text: "Livraison Gratuite", color: "bg-blue-100" },
  { emoji: "🎁", text: "Remise 20%", color: "bg-amber-100" },
];

const CATEGORIES = [
  {
    id: 1,
    title: "Mode & Accessoires",
    subtitle: "Choisissez les produits du catalogue et fixez votre prix de vente.",
    emoji: "👗",
    color: "from-amber-50 to-orange-50",
  },
  {
    id: 2,
    title: "Électronique",
    subtitle: "Vendez les produits de fournisseurs locaux ou internationaux.",
    emoji: "📱",
    color: "from-blue-50 to-indigo-50",
  },
  {
    id: 3,
    title: "Beauté",
    subtitle: "Recevez vos gains de vente et de parrainage instantanément.",
    emoji: "✨",
    color: "from-rose-50 to-pink-50",
  },
];

const STEPS = [
  {
    num: "01",
    title: "Créez votre boutique",
    desc: "Choisissez les produits du catalogue et fixez votre prix de vente. Votre boutique est prête en 1 clic.",
    icon: "🏪",
  },
  {
    num: "02",
    title: "Sélectionnez vos produits",
    desc: "Parcourez notre catalogue et choisissez vos produits favoris.",
    icon: "🛍️",
  },
  {
    num: "03",
    title: "Commencez à vendre",
    desc: "Partagez votre lien de boutique sur WhatsApp, TikTok, Instagram.",
    icon: "📲",
  },
  {
    num: "04",
    title: "Gagnez de l'argent",
    desc: "Recevez vos gains de vente et de parrainage instantanément.",
    icon: "💰",
  },
];

// ─── Composants ────────────────────────────────────────────────────────────

function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-[#071020]/95 backdrop-blur-md shadow-xl" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center">
            <span className="text-white font-black text-sm">⚡</span>
          </div>
          <span className="text-white font-black text-xl">
            Brand Ship <span className="text-amber-400">CI</span>
          </span>
        </div>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <a href="/login" className="text-white/80 hover:text-white font-medium transition">
            Se connecter
          </a>
          <a
            href="/register"
            className="bg-amber-400 hover:bg-amber-300 text-gray-900 font-bold px-6 py-2 rounded-lg transition"
          >
            Commencer
          </a>
        </div>
      </div>
    </header>
  );
}

function HeroSection() {
  const [count, setCount] = useState({ sellers: 0, products: 0, delivery: 0 });

  useEffect(() => {
    const timer = setTimeout(() => {
      const duration = 1500;
      const steps = 50;
      let step = 0;
      const id = setInterval(() => {
        step++;
        const progress = step / steps;
        const ease = 1 - Math.pow(1 - progress, 3);
        setCount({
          sellers: Math.round(ease * 2000),
          products: Math.round(ease * 500),
          delivery: Math.round(ease * 98),
        });
        if (step >= steps) clearInterval(id);
      }, duration / steps);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-[#071020] via-[#0d1f42] to-[#040c1a] pt-28">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-blue-600/10 blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-amber-500/5 blur-[100px]" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[calc(100vh-112px)]">
          {/* Left: Hero Text */}
          <div className="flex flex-col justify-center">
            <h1 className="text-5xl lg:text-6xl xl:text-7xl font-black text-white leading-[1.1] mb-6">
              Vendez sans stock.
              <br />
              <span className="bg-gradient-to-r from-amber-400 to-amber-300 bg-clip-text text-transparent">
                Gagnez avec votre
              </span>
              <br />
              réseau.
            </h1>

            <p className="text-white/70 text-lg max-w-lg leading-relaxed mb-10">
              La 1ère plateforme de Commerce Social en Côte d'Ivoire. Connectez fournisseurs et
              influenceurs pour vendre partout.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-16">
              <a
                href="/register"
                className="bg-amber-400 hover:bg-amber-300 text-gray-900 font-black py-4 px-8 rounded-lg transition-all shadow-lg hover:shadow-xl inline-flex items-center justify-center gap-2"
              >
                Commencez gratuitement <span>→</span>
              </a>
              <a
                href="/login"
                className="border-2 border-white/30 hover:border-white/50 text-white font-semibold py-4 px-8 rounded-lg transition-all inline-flex items-center justify-center"
              >
                Se connecter
              </a>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-white/10">
              <div>
                <div className="text-4xl font-black text-white mb-1">
                  {count.sellers.toLocaleString()}+
                </div>
                <div className="text-white/60 text-sm">Vendeurs actifs</div>
              </div>
              <div>
                <div className="text-4xl font-black text-white mb-1">{count.products}+</div>
                <div className="text-white/60 text-sm">Produits</div>
              </div>
              <div>
                <div className="text-4xl font-black text-white mb-1">{count.delivery}%</div>
                <div className="text-white/60 text-sm">Livraison OK</div>
              </div>
            </div>
          </div>

          {/* Right: Offers & Categories */}
          <div className="hidden lg:flex flex-col gap-8">
            {/* Offers Banner */}
            <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-sm">
              <h3 className="text-white font-bold mb-6 text-lg">Offres Spéciales</h3>
              <div className="flex flex-wrap gap-3">
                {SPECIAL_OFFERS.map((offer, i) => (
                  <div
                    key={i}
                    className={`${offer.color} px-4 py-2 rounded-full text-sm font-semibold text-gray-800 whitespace-nowrap`}
                  >
                    {offer.emoji} {offer.text}
                  </div>
                ))}
              </div>
            </div>

            {/* Categories Grid */}
            <div className="space-y-4">
              <h3 className="text-white font-bold text-lg">Onglet de Publicité</h3>
              <div className="grid grid-cols-1 gap-4">
                {CATEGORIES.map((cat) => (
                  <div
                    key={cat.id}
                    className={`bg-gradient-to-br ${cat.color} rounded-2xl p-6 cursor-pointer hover:shadow-lg transition-all`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-black text-gray-900 text-lg">{cat.title}</h4>
                        <p className="text-gray-700 text-sm mt-1">{cat.subtitle}</p>
                      </div>
                      <span className="text-3xl">{cat.emoji}</span>
                    </div>
                    <a href="#" className="text-gray-900 font-semibold text-sm hover:underline">
                      Voir le produit →
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function HowItWorksSection() {
  return (
    <section className="w-full bg-white py-24 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-20">
          <h2 className="text-5xl font-black text-gray-900 mb-4">Comment ça marche ?</h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            3 étapes simples pour commencer à vendre
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {STEPS.map((step, i) => (
            <div key={i} className="relative">
              {/* Connector Line */}
              {i < STEPS.length - 1 && (
                <div className="hidden lg:block absolute top-20 left-full w-8 h-0.5 bg-gradient-to-r from-blue-400 to-transparent" />
              )}

              {/* Card */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 hover:shadow-xl transition-all">
                {/* Step Number Circle */}
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-black text-2xl mb-6 shadow-lg">
                  {step.num}
                </div>

                {/* Icon */}
                <div className="text-5xl mb-4">{step.icon}</div>

                {/* Content */}
                <h3 className="text-xl font-black text-gray-900 mb-3">{step.title}</h3>
                <p className="text-gray-700 text-sm leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-20">
          <a
            href="/register"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-black px-8 py-4 rounded-lg transition-all shadow-lg"
          >
            Créer votre boutique maintenant <span>→</span>
          </a>
          <p className="text-gray-600 text-sm mt-4">Aucune carte bancaire requise · Gratuit à vie</p>
        </div>
      </div>
    </section>
  );
}

function CategoriesSection() {
  return (
    <section className="w-full bg-gradient-to-br from-blue-50 to-indigo-50 py-24 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-5xl font-black text-gray-900 mb-4">Onglet de Publicité</h2>
          <p className="text-gray-600 text-lg">Découvrez nos catégories principales</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {CATEGORIES.map((cat) => (
            <div
              key={cat.id}
              className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all"
            >
              {/* Image Placeholder */}
              <div className={`bg-gradient-to-br ${cat.color} h-48 flex items-center justify-center text-6xl`}>
                {cat.emoji}
              </div>

              {/* Content */}
              <div className="p-8">
                <h3 className="text-2xl font-black text-gray-900 mb-3">{cat.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-6">{cat.subtitle}</p>
                <a href="#" className="inline-flex items-center gap-2 text-blue-600 font-bold hover:text-blue-700">
                  Voir le Produit <span>→</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="w-full bg-[#040c1a] text-white py-16 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12 pb-12 border-b border-white/10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center">
                <span className="text-white font-black">⚡</span>
              </div>
              <span className="text-white font-black text-lg">
                Brand Ship <span className="text-amber-400">CI</span>
              </span>
            </div>
            <p className="text-white/60 text-sm">La plateforme #1 du commerce social en Côte d'Ivoire.</p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-bold mb-4">Produits</h4>
            <ul className="space-y-2 text-white/60 text-sm">
              <li>
                <a href="#" className="hover:text-white transition">
                  Mode
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Électronique
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Beauté
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-bold mb-4">Entreprise</h4>
            <ul className="space-y-2 text-white/60 text-sm">
              <li>
                <a href="#" className="hover:text-white transition">
                  À propos
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Blog
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-bold mb-4">Légal</h4>
            <ul className="space-y-2 text-white/60 text-sm">
              <li>
                <a href="#" className="hover:text-white transition">
                  CGU
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Confidentialité
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Cookies
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-white/40 text-sm">© 2025 Brand Ship CI. Tous droits réservés.</p>
          <div className="flex gap-6">
            <a href="#" className="text-white/60 hover:text-white transition">
              Twitter
            </a>
            <a href="#" className="text-white/60 hover:text-white transition">
              Instagram
            </a>
            <a href="#" className="text-white/60 hover:text-white transition">
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────────────

export default function HomePage() {
  return (
    <main className="w-full overflow-x-hidden">
      <Header />
      <HeroSection />
      <HowItWorksSection />
      <CategoriesSection />
      <Footer />
    </main>
  );
}
