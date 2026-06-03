"use client";

import { useState, useEffect, useRef } from "react";

// ─── Données statiques ─────────────────────────────────────────────────────

const STATS = [
  { value: "2K+", label: "Vendeurs actifs" },
  { value: "500+", label: "Produits listés" },
  { value: "98%", label: "Livraison OK" },
];

const CATEGORIES = [
  {
    id: 1,
    title: "Mode & Accessoires",
    subtitle: "Tendances actuelles CI",
    tag: "NOUVEAU",
    color: "from-amber-500 to-orange-600",
    accent: "#F59E0B",
    emoji: "👗",
    items: ["Boubous modernes", "Sacs à main", "Bijoux dorés"],
    bg: "bg-amber-50",
  },
  {
    id: 2,
    title: "Électronique",
    subtitle: "Smartphones & Gadgets",
    tag: "TENDANCE",
    color: "from-blue-500 to-indigo-600",
    accent: "#3B82F6",
    emoji: "📱",
    items: ["Smartphones", "Écouteurs", "Powerbanks"],
    bg: "bg-blue-50",
  },
  {
    id: 3,
    title: "Beauté & Soins",
    subtitle: "Cosmétiques premium",
    tag: "POPULAIRE",
    color: "from-rose-400 to-pink-600",
    accent: "#F43F5E",
    emoji: "✨",
    items: ["Crèmes éclaircissantes", "Parfums", "Soins capillaires"],
    bg: "bg-rose-50",
  },
];

const STEPS = [
  {
    num: "01",
    icon: "🏪",
    title: "Créez votre boutique",
    desc: "En 2 minutes, votre boutique en ligne est prête avec votre nom et vos couleurs. Zéro stock requis.",
    color: "from-blue-600 to-blue-800",
  },
  {
    num: "02",
    icon: "🛍️",
    title: "Sélectionnez vos produits",
    desc: "Parcourez notre catalogue de fournisseurs vérifiés. Choisissez vos produits et fixez votre propre marge.",
    color: "from-indigo-600 to-purple-700",
  },
  {
    num: "03",
    icon: "📲",
    title: "Partagez et vendez",
    desc: "Partagez le lien de votre boutique sur WhatsApp, TikTok, Instagram. Vos clients commandent directement.",
    color: "from-amber-500 to-orange-600",
  },
  {
    num: "04",
    icon: "💰",
    title: "Gagnez de l'argent",
    desc: "À chaque livraison confirmée, vos gains sont crédités instantanément. Retirez via MTN ou Orange Money.",
    color: "from-emerald-500 to-teal-600",
  },
];

const TESTIMONIALS = [
  {
    name: "Koné Aminata",
    role: "Influenceuse Mode, Abidjan",
    avatar: "KA",
    text: "En 3 semaines j'ai gagné 180 000 FCFA. Je n'avais aucun stock, juste mon téléphone et mes abonnés.",
    amount: "180 000 FCFA",
    color: "bg-amber-500",
  },
  {
    name: "Traoré Moussa",
    role: "Vendeur Électronique, Bouaké",
    avatar: "TM",
    text: "Ma boutique fait maintenant 40 commandes par mois. La livraison est gérée, je me concentre sur la vente.",
    amount: "40 cmd/mois",
    color: "bg-blue-500",
  },
  {
    name: "Bamba Fatoumata",
    role: "Revendeuse Beauté, Yamoussoukro",
    avatar: "BF",
    text: "Brand Ship CI a changé ma vie. Je gagne plus que mon ancien salaire depuis le premier mois.",
    amount: "+200 000 FCFA",
    color: "bg-rose-500",
  },
];

// ─── Composants ─────────────────────────────────────────────────────────

function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-[#0a1628]/95 backdrop-blur-md shadow-2xl" : "bg-transparent"
      }`}
    >
      <div className="w-full px-6 lg:px-12 flex items-center justify-between h-16">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow-lg">
            <span className="text-white font-black text-sm">BS</span>
          </div>
          <span className="text-white font-black text-xl tracking-tight">
            Brand Ship <span className="text-amber-400">CI</span>
          </span>
        </div>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8 text-sm text-white/80">
          <a href="#how" className="hover:text-amber-400 transition-colors">Comment ça marche</a>
          <a href="#categories" className="hover:text-amber-400 transition-colors">Produits</a>
          <a href="#temoignages" className="hover:text-amber-400 transition-colors">Témoignages</a>
        </div>

        {/* CTA buttons */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="/login"
            className="text-white/90 text-sm font-medium px-4 py-2 rounded-lg hover:bg-white/10 transition"
          >
            Se connecter
          </a>
          <a
            href="/register"
            className="bg-amber-400 hover:bg-amber-300 text-gray-900 font-bold text-sm px-5 py-2 rounded-xl transition-all shadow-lg shadow-amber-500/30"
          >
            Commencez gratuitement
          </a>
        </div>

        {/* Mobile burger */}
        <button onClick={() => setOpen(!open)} className="md:hidden text-white p-2">
          <div className={`w-5 h-0.5 bg-white transition-all mb-1.5 ${open ? "rotate-45 translate-y-2" : ""}`} />
          <div className={`w-5 h-0.5 bg-white transition-all mb-1.5 ${open ? "opacity-0" : ""}`} />
          <div className={`w-5 h-0.5 bg-white transition-all ${open ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-[#0a1628]/98 backdrop-blur-md px-6 py-6 flex flex-col gap-4 border-t border-white/10">
          <a href="#how" className="text-white/80 text-sm" onClick={() => setOpen(false)}>Comment ça marche</a>
          <a href="#categories" className="text-white/80 text-sm" onClick={() => setOpen(false)}>Produits</a>
          <a href="#temoignages" className="text-white/80 text-sm" onClick={() => setOpen(false)}>Témoignages</a>
          <hr className="border-white/10" />
          <a href="/login" className="text-white text-sm font-medium">Se connecter</a>
          <a href="/register" className="bg-amber-400 text-gray-900 font-bold text-sm px-5 py-2.5 rounded-xl text-center">
            Commencez gratuitement
          </a>
        </div>
      )}
    </nav>
  );
}

function HeroSection() {
  const [count, setCount] = useState({ sellers: 0, products: 0, delivery: 0 });

  useEffect(() => {
    const timer = setTimeout(() => {
      const duration = 1500;
      const steps = 50;
      const interval = duration / steps;
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
      }, interval);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-[#071020]">
      {/* Animated background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0d1f42] via-[#071328] to-[#040c1a]" />
        {/* Orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-blue-600/20 blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-amber-500/10 blur-[100px] animate-pulse" style={{ animationDelay: "1s" }} />
        <div className="absolute top-3/4 left-1/2 w-64 h-64 rounded-full bg-indigo-600/15 blur-[80px]" />
        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full min-h-screen flex flex-col lg:flex-row">
        {/* Left — Hero text */}
        <div className="flex-1 flex flex-col justify-center px-6 sm:px-12 lg:px-16 xl:px-24 pt-28 pb-16 lg:pt-0">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 rounded-full px-4 py-1.5 mb-8 w-fit">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
            <span className="text-amber-400 text-xs font-semibold tracking-wider uppercase">
              Plateforme #1 en Côte d'Ivoire
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl xl:text-6xl font-black text-white leading-[1.05] mb-6">
            Vendez sans stock.{" "}
            <span className="relative inline-block">
              <span className="relative z-10 bg-gradient-to-r from-amber-400 to-amber-500 bg-clip-text text-transparent">
                Gagnez
              </span>
              <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 12" fill="none">
                <path d="M2 8 Q100 2 198 8" stroke="#F59E0B" strokeWidth="3" strokeLinecap="round" opacity="0.6" />
              </svg>
            </span>{" "}
            avec votre réseau.
          </h1>

          <p className="text-white/60 text-lg max-w-lg leading-relaxed mb-10">
            Créez votre boutique en ligne en 2 minutes. Choisissez des produits, fixez vos prix,
            partagez sur WhatsApp et Instagram — et encaissez vos gains via Mobile Money.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4 mb-14">
            <a
              href="/register"
              className="group relative overflow-hidden bg-amber-400 hover:bg-amber-300 text-gray-900 font-black text-base px-8 py-4 rounded-2xl transition-all duration-300 shadow-2xl shadow-amber-500/50 hover:shadow-amber-500/70 hover:scale-105"
            >
              <span className="relative z-10">🚀 Commencez gratuitement</span>
            </a>
            <a
              href="/login"
              className="flex items-center gap-2 text-white border border-white/20 hover:border-white/40 font-semibold text-base px-7 py-4 rounded-2xl transition-all hover:bg-white/5"
            >
              Se connecter
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap gap-8">
            {[
              { val: `${count.sellers.toLocaleString()}+`, label: "Vendeurs actifs", icon: "👥" },
              { val: `${count.products}+`, label: "Produits disponibles", icon: "📦" },
              { val: `${count.delivery}%`, label: "Taux de livraison", icon: "✅" },
            ].map((stat, i) => (
              <div key={i} className="flex items-center gap-3">
                <span className="text-2xl">{stat.icon}</span>
                <div>
                  <div className="text-2xl font-black text-white">{stat.val}</div>
                  <div className="text-white/50 text-xs">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right — Category carousel */}
        <div id="categories" className="lg:w-[480px] xl:w-[540px] flex items-center justify-center px-6 sm:px-10 lg:px-8 pb-16 lg:py-24">
          <CategoryCarousel />
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-white/30 text-xs">
        <span>Découvrir</span>
        <div className="w-px h-8 bg-gradient-to-b from-white/30 to-transparent" />
      </div>
    </section>
  );
}

function CategoryCarousel() {
  const [active, setActive] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setActive((p) => (p + 1) % CATEGORIES.length);
    }, 3500);
    return () => clearInterval(intervalRef.current);
  }, []);

  const cat = CATEGORIES[active];

  return (
    <div className="w-full max-w-sm">
      {/* Main card */}
      <div
        key={active}
        className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/10"
        style={{
          animation: "cardIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) both",
        }}
      >
        {/* Gradient header */}
        <div className={`bg-gradient-to-br ${cat.color} p-8 relative overflow-hidden`}>
          <div className="absolute inset-0 opacity-20" style={{
            backgroundImage: "radial-gradient(circle at 70% 30%, rgba(255,255,255,0.3) 0%, transparent 60%)"
          }} />
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-6">
              <span className="bg-white/20 text-white text-xs font-bold px-3 py-1 rounded-full backdrop-blur-sm">
                {cat.tag}
              </span>
              <span className="text-5xl">{cat.emoji}</span>
            </div>
            <h3 className="text-white font-black text-2xl mb-1">{cat.title}</h3>
            <p className="text-white/70 text-sm">{cat.subtitle}</p>
          </div>
        </div>

        {/* Card body */}
        <div className="bg-[#0d1f3c] p-6">
          <ul className="space-y-2 mb-6">
            {cat.items.map((item, i) => (
              <li key={i} className="flex items-center gap-2 text-white/70 text-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                {item}
              </li>
            ))}
          </ul>
          <button className="w-full bg-amber-400 hover:bg-amber-300 text-gray-900 font-black text-sm py-3 rounded-xl transition-all hover:scale-105 hover:shadow-lg hover:shadow-amber-500/30">
            Voir les produits →
          </button>
        </div>
      </div>

      {/* Dot navigation */}
      <div className="flex justify-center gap-2 mt-5">
        {CATEGORIES.map((_, i) => (
          <button
            key={i}
            onClick={() => { setActive(i); clearInterval(intervalRef.current); }}
            className={`transition-all rounded-full ${
              i === active ? "w-8 h-2 bg-amber-400" : "w-2 h-2 bg-white/20 hover:bg-white/40"
            }`}
          />
        ))}
      </div>

      {/* Mini category tabs */}
      <div className="flex gap-2 mt-4">
        {CATEGORIES.map((c, i) => (
          <button
            key={i}
            onClick={() => { setActive(i); clearInterval(intervalRef.current); }}
            className={`flex-1 py-2 rounded-xl text-xs font-semibold transition-all ${
              i === active
                ? "bg-white/15 text-white border border-white/20"
                : "bg-white/5 text-white/40 hover:bg-white/10"
            }`}
          >
            {c.emoji}
          </button>
        ))}
      </div>
    </div>
  );
}

function HowItWorksSection() {
  return (
    <section id="how" className="w-full bg-white py-24 px-6 sm:px-12 lg:px-16 xl:px-24">
      {/* Header */}
      <div className="text-center mb-16">
        <span className="inline-block bg-blue-50 text-blue-700 text-xs font-bold px-4 py-1.5 rounded-full tracking-wider uppercase mb-4">
          Simple & Rapide
        </span>
        <h2 className="text-4xl lg:text-5xl font-black text-gray-900 mb-4">
          Comment ça marche ?
        </h2>
        <p className="text-gray-500 text-lg max-w-xl mx-auto">
          4 étapes simples pour lancer votre activité de revente en ligne dès aujourd'hui.
        </p>
      </div>

      {/* Steps grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-5xl mx-auto">
        {STEPS.map((step, i) => (
          <div
            key={i}
            className="group relative rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1"
          >
            {/* Gradient top bar */}
            <div className={`h-1 w-full bg-gradient-to-r ${step.color}`} />

            <div className="p-8">
              {/* Step number + icon */}
              <div className="flex items-start justify-between mb-6">
                <div>
                  <span className={`text-xs font-black tracking-widest bg-gradient-to-r ${step.color} bg-clip-text text-transparent`}>
                    ÉTAPE {step.num}
                  </span>
                </div>
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center text-2xl shadow-lg`}>
                  {step.icon}
                </div>
              </div>

              <h3 className="text-xl font-black text-gray-900 mb-3">{step.title}</h3>
              <p className="text-gray-500 leading-relaxed text-sm">{step.desc}</p>
            </div>

            {/* Hover effect */}
            <div className={`absolute inset-0 bg-gradient-to-br ${step.color} opacity-0 group-hover:opacity-[0.04] transition-opacity pointer-events-none`} />
          </div>
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="text-center mt-16">
        <a
          href="/register"
          className="inline-flex items-center gap-3 bg-[#0d1f42] hover:bg-[#1a3060] text-white font-black text-base px-10 py-4 rounded-2xl transition-all shadow-2xl shadow-blue-900/30 hover:scale-105"
        >
          Créer ma boutique gratuitement
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </a>
        <p className="text-gray-400 text-sm mt-3">Aucune carte bancaire requise · Gratuit à vie</p>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  return (
    <section id="temoignages" className="w-full bg-gradient-to-br from-[#071020] to-[#0d1f42] py-24 px-6 sm:px-12 lg:px-16 xl:px-24">
      <div className="text-center mb-16">
        <span className="inline-block bg-amber-500/10 text-amber-400 text-xs font-bold px-4 py-1.5 rounded-full tracking-wider uppercase border border-amber-500/20 mb-4">
          Ils ont réussi
        </span>
        <h2 className="text-4xl font-black text-white">
          Ce qu'ils disent de nous
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {TESTIMONIALS.map((t, i) => (
          <div
            key={i}
            className="relative bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-sm hover:bg-white/8 hover:border-white/20 transition-all"
          >
            {/* Quote */}
            <div className="text-5xl text-white/10 font-black mb-4 leading-none">"</div>
            <p className="text-white/70 text-sm leading-relaxed mb-6">{t.text}</p>

            {/* Earnings badge */}
            <div className="bg-white/10 rounded-xl px-4 py-2 mb-6 inline-block">
              <span className="text-amber-400 font-black text-sm">{t.amount}</span>
            </div>

            {/* Author */}
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-full ${t.color} flex items-center justify-center text-white font-black text-sm`}>
                {t.avatar}
              </div>
              <div>
                <div className="text-white font-bold text-sm">{t.name}</div>
                <div className="text-white/40 text-xs">{t.role}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function FinalCTASection() {
  return (
    <section className="w-full bg-gradient-to-r from-amber-400 to-amber-500 py-20 px-6 sm:px-12 relative overflow-hidden">
      {/* Background pattern */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: "radial-gradient(circle at 20% 50%, rgba(0,0,0,0.3) 0%, transparent 50%), radial-gradient(circle at 80% 50%, rgba(0,0,0,0.3) 0%, transparent 50%)",
        }}
      />

      <div className="relative z-10 text-center max-w-3xl mx-auto">
        <h2 className="text-4xl lg:text-5xl font-black text-gray-900 mb-4">
          Prêt à gagner votre premier revenu en ligne ?
        </h2>
        <p className="text-gray-800/70 text-lg mb-8">
          Rejoignez 2 000+ vendeurs qui gagnent déjà leur vie grâce à Brand Ship CI.
          C'est gratuit, simple et sans stock.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <a
            href="/register"
            className="bg-gray-900 hover:bg-gray-800 text-white font-black text-base px-10 py-4 rounded-2xl transition-all shadow-2xl hover:scale-105"
          >
            Créer mon compte — C'est gratuit
          </a>
          <a
            href="https://wa.me/2250000000000"
            className="flex items-center gap-2 bg-white/30 hover:bg-white/50 text-gray-900 font-bold text-base px-8 py-4 rounded-2xl transition-all backdrop-blur-sm"
          >
            <span>💬</span> Nous contacter sur WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="w-full bg-[#040c1a] py-12 px-6 sm:px-12 border-t border-white/5">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 max-w-6xl mx-auto">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center">
            <span className="text-white font-black text-xs">BS</span>
          </div>
          <span className="text-white font-black text-lg">
            Brand Ship <span className="text-amber-400">CI</span>
          </span>
        </div>

        <div className="flex flex-wrap justify-center gap-6 text-white/40 text-sm">
          <a href="/about" className="hover:text-white/70 transition-colors">À propos</a>
          <a href="/terms" className="hover:text-white/70 transition-colors">CGU</a>
          <a href="/privacy" className="hover:text-white/70 transition-colors">Confidentialité</a>
          <a href="/contact" className="hover:text-white/70 transition-colors">Contact</a>
        </div>

        <p className="text-white/25 text-xs">
          © 2025 Brand Ship CI · Abidjan, Côte d'Ivoire
        </p>
      </div>
    </footer>
  );
}

// ─── Page principale ───────────────────────────────────────────────────────

export default function HomePage() {
  return (
    <>
      <style>{`
        @keyframes cardIn {
          from { opacity: 0; transform: scale(0.92) translateY(12px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>

      <main className="w-full min-h-screen overflow-x-hidden">
        <NavBar />
        <HeroSection />
        <HowItWorksSection />
        <TestimonialsSection />
        <FinalCTASection />
        <Footer />
      </main>
    </>
  );
}
