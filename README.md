# BRANDSHIP CI

**Marketplace social commerce B2B2C pour la Côte d'Ivoire.**
Marchands (grossistes) ↔ Influenceurs/Vendeurs ↔ Clients — avec paiement Mobile Money, livraison suivie et modération centralisée.

> 📄 La spécification technique et fonctionnelle complète est dans [`BRANDSHIP_CI_Specification.md`](./BRANDSHIP_CI_Specification.md). Ce README en est le résumé d'entrée — se référer au document complet pour l'implémentation (schéma Prisma complet, fonctions de calcul, DB, etc.).

---

## Le concept en une phrase

Le catalogue grossiste n'est **jamais visible du grand public** : un Marchand publie ses produits, un Influenceur les sélectionne, fixe sa propre marge et les diffuse dans sa boutique personnalisée et sur ses réseaux sociaux — seuls les produits qu'un Influenceur a choisi de publier apparaissent sur la marketplace publique.

```
MARCHAND (Entreprise/Grossiste)
   │  publie des produits (prix de gros, stock) — visibles UNIQUEMENT par les Influenceurs
   ▼
INFLUENCEUR / VENDEUR
   │  sélectionne, fixe SA marge, publie dans SA boutique (logo, nom, slug)
   │  diffuse sur réseaux sociaux + marketplace publique + Live Shopping
   ▼
CLIENT FINAL (public)
   │  achète sur la marketplace publique ou via la boutique de l'influenceur
   ▼
MARCHAND traite la commande → LIVREUR livre → Séquestre 10 jours → Commissions reversées
```

## Les 5 rôles

| Rôle | Rôle principal |
|---|---|
| **Admin BrandShip** | Configuration financière, modération, arbitrage des litiges, supervision globale |
| **Marchand** | Publie le catalogue de gros, traite les commandes, encaisse directement les clients |
| **Influenceur / Vendeur** | Sélectionne des produits, fixe sa marge, anime sa boutique et ses réseaux sociaux |
| **Livreur / Logistique** | Fixe ses tarifs de transport par zone, livre les commandes assignées |
| **Client** | Achète sur la marketplace publique ou via une boutique d'influenceur |

## Fonctionnalités clés

- **Formule de prix transparente** : `Prix_Final = Prix_Grossiste + Commission_BrandShip (2%) + Marge_Influenceur + Frais_Livraison`
- **Séquestre de 10 jours** avant reversement des commissions (Marchand, Influenceur, Livreur, Parrain, BrandShip)
- **Paiement Mobile Money** via agrégateur (Orange Money, Wave, MTN MoMo, Moov Money)
- **Boutiques personnalisées** pour chaque Influenceur (logo, nom, slug, thème, marge)
- **Système de parrainage** Influenceur (50 FCFA/vente validée, un seul niveau)
- **Codes promo** (déduits de la marge de l'influenceur) et **codes d'avoir** (retour produit, réutilisables chez la marque du Marchand émetteur)
- **Module publicitaire (Ad Manager)** pour Marchands et Influenceurs, avec facturation **View-to-Pay** (25% plateforme / 75% budget de diffusion, 1 FCFA par vue qualifiante = clic + 15s de visionnage)
- **Gains Client/Visiteur** sur les publicités vues, retrait réservé aux comptes vérifiés
- **Live Shopping multi-plateforme** (YouTube, Facebook, TikTok, Instagram en simultané) avec overlay produit
- **Messagerie intégrée** type Alibaba (Client↔Influenceur, Influenceur↔Marchand) avec statut en ligne/hors ligne
- **Support & Assistance** ("Nous contacter") avec tickets suivis
- **Abonnement mensuel Livreur** (10 000 FCFA, premier mois offert) et **packs SMS Business** pour le Marchand
- **Score de confiance / dépôt de garantie** pour sécuriser l'encaissement direct des nouveaux Marchands
- **Suspension automatique** des Marchands en cas de reversements impayés

## Stack technique recommandée

| Couche | Choix |
|---|---|
| Backend | Node.js + Express (ou NestJS) |
| Base de données | PostgreSQL + Prisma ORM |
| Temps réel | WebSocket (Socket.io) |
| Frontend | Next.js (React) |
| Cache / files d'attente | Redis + BullMQ |
| Stockage images | Cloudinary ou AWS S3 |
| Paiement | Agrégateur Mobile Money (CinetPay ou PayDunya) |
| Notifications | Twilio/WhatsApp Business API + push web |
| Hébergement | Vercel (frontend) + Railway/Render (backend + PostgreSQL) |

## Charte graphique

Couleurs de la Côte d'Ivoire, déclinées en nuances premium/épurées :
- 🟠 **Orange** (`#F77F00` / `#FF8200`) — CTA, accents, prix
- ⚪ **Blanc** (`#FFFFFF` / `#FAFAFA`) — fond, respiration
- 🟢 **Vert** (`#009A44` / `#00A651`) — validation, succès, statuts livrés

## Sommaire de la spécification

La spécification complète (16 sections) couvre :

0. Contexte marché & meilleures pratiques 2026
1. Vision & positionnement
2. Rôles & matrice de permissions
3. Logique financière (prix, séquestre, commissions, parrainage, abonnement Livreur, score de confiance)
4. Dashboard Marchand
5. Dashboard Influenceur / Vendeur
6. Dashboard Logistique / Livreur
7. Interface Boutique publique (Client)
8. Dashboard Admin
9. Module Publicitaire (Ad Manager, View-to-Pay, gains visiteur, packs SMS)
10. Messagerie intégrée
11. Support & Assistance
12. Base de données — schéma Prisma complet
13. Intégration paiement Mobile Money
14. Stack technique
15. Roadmap (MVP → Automatisation → Scale)
16. Points de vigilance

## Statut du projet

📋 **Phase de spécification** — architecture, logique financière et schéma de données finalisés. Développement du MVP à venir (voir section 15, Roadmap, dans la spécification).

## Points de vigilance à connaître avant de démarrer le build

- Le take rate transactionnel est structurellement bas — voir l'analyse de rentabilité pour les recommandations (paliers progressifs, groupement des reversements)
- Les API de Live Shopping ont des niveaux d'accès très différents selon le réseau (TikTok/Instagram plus restreints que YouTube/Facebook)
- Le mécanisme de gains Client/Visiteur sur les publicités doit être surveillé de près pour le risque de fraude (clics artificiels)

---

*Document généré dans le cadre de la conception de BRANDSHIP CI — voir [`BRANDSHIP_CI_Specification.md`](./BRANDSHIP_CI_Specification.md) pour tous les détails techniques.*
