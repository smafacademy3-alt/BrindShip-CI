import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Brand Ship CI — Vendez sans stock, gagnez avec votre réseau",
  description:
    "Plateforme de Social Commerce en Côte d'Ivoire. Créez votre boutique en ligne en 2 minutes, revendez des produits et encaissez vos gains via Mobile Money.",
  keywords: "vente en ligne, dropshipping, côte d'ivoire, abidjan, mobile money, influenceur",
  openGraph: {
    title: "Brand Ship CI",
    description: "Vendez sans stock. Gagnez avec votre réseau.",
    locale: "fr_CI",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
