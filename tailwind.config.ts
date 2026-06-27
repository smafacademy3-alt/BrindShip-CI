import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Couleurs de la Côte d'Ivoire
        'brandship-orange': '#FF8200', // Pour les boutons d'action et alertes
        'brandship-green': '#009E60',  // Pour les succès et les gains (200 Fcfa)
        'brandship-white': '#FFFFFF',  // Pour la clarté
        
        // Nuances pour les Dashboards Professionnels
        'brandship-dark': '#0B0E14',   // Fond principal des tableaux de bord
        'brandship-dark-card': '#12161F', // Fond des cartes et statistiques
        'brandship-gray': '#F8FAFC',   // Fond de la boutique acheteur
        'brandship-muted': '#94A3B8',  // Texte secondaire
      },
    },
  },
  plugins: [],
};
export default config;
