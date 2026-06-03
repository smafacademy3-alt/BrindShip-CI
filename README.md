# Brand Ship CI — Documentation Technique MVP

## 🚀 Vue d'ensemble

Brand Ship CI est une plateforme de Social Commerce/BrandShipping pour la Côte d'Ivoire et l'Afrique de l'Ouest. Les influenceurs créent des boutiques en ligne en un clic, sélectionnent des produits fournisseurs, fixent leurs prix et encaissent leurs gains via Mobile Money.

---

## 📁 Structure du Projet

```
brandship/
├── backend/
│   ├── prisma/
│   │   └── schema.prisma          ← Schéma BDD complet (8 modèles)
│   └── src/
│       ├── app.ts                 ← Express + middlewares
│       ├── controllers/
│       │   ├── auth.controller.ts    ← Register/Login/Profile
│       │   ├── order.controller.ts   ← completeOrder (transaction atomique)
│       │   ├── store.controller.ts   ← Boutiques influenceurs
│       │   └── wallet.controller.ts  ← Portefeuille + retraits
│       ├── middleware/
│       │   └── auth.middleware.ts    ← JWT + RBAC
│       ├── routes/
│       │   └── index.ts              ← Toutes les routes
│       ├── types/
│       │   └── index.ts              ← Types TypeScript
│       └── utils/
│           ├── financial.ts          ← Moteur de calcul commissions
│           └── prisma.ts             ← Singleton Prisma
└── frontend/
    └── src/app/
        └── page.tsx               ← Page d'accueil Next.js complète
```

---

## 💰 Règles Financières (Moteur de Calcul)

### Exemple concret : Produit Mode

| Acteur | Montant | Calcul |
|--------|---------|--------|
| Prix plancher fournisseur | 10 000 FCFA | Fixé par le fournisseur |
| Prix souhaité influenceur | 14 000 FCFA | Fixé par l'influenceur |
| **Prix affiché client** | **14 700 FCFA** | 14 000 + 700 frais traitement |
| Commission fournisseur | -200 FCFA | 2% × 10 000 |
| **Fournisseur reçoit** | **9 800 FCFA** | Net |
| Marge brute influenceur | 4 000 FCFA | 14 000 - 10 000 |
| Commission influenceur | -500 FCFA | Fixe plateforme |
| Bonus parrain (si actif) | -200 FCFA | 1 niveau |
| **Influenceur reçoit** | **3 300 FCFA** | Net (avec parrain) |
| **Parrain reçoit** | **200 FCFA** | Bonus automatique |
| **Plateforme collecte** | **1 600 FCFA** | 700 + 200 + 500 + 200 |

### Constants (src/utils/financial.ts)
```typescript
PROCESSING_FEE: 700 FCFA         // Invisible au client
SUPPLIER_COMMISSION_RATE: 2%     // Sur prix plancher
INFLUENCER_COMMISSION: 500 FCFA  // Fixe par vente
REFERRAL_BONUS: 200 FCFA         // 1 niveau, 1 parrain
```

---

## 🗄️ Schéma Base de Données

### Modèles Prisma

| Modèle | Description |
|--------|-------------|
| `User` | Admins, Fournisseurs, Influenceurs. Parrainage réflexif. Portefeuille. |
| `Category` | Catégories de produits avec slug |
| `Product` | Produits fournisseurs. Images Cloudinary. Prix plancher. |
| `Store` | Boutique de l'influenceur avec slug unique |
| `StoreProduct` | Produit dans une boutique avec prix influenceur. `final_price = desired_price + 700` |
| `Order` | Commande COD avec snapshot financier complet |
| `Transaction` | Historique comptable strict (SALE_EARNING, REFERRAL_BONUS, WITHDRAWAL…) |
| `Withdrawal` | Demandes de retrait Mobile Money (MTN/Orange/Wave) |
| `Notification` | Alertes en temps réel |

---

## 🔌 API REST — Routes

### Auth
```
POST /api/v1/auth/register   → Inscription (avec code parrainage optionnel)
POST /api/v1/auth/login      → Connexion par téléphone + mot de passe
GET  /api/v1/auth/profile    → Profil utilisateur connecté [AUTH]
```

### Boutiques
```
POST /api/v1/stores              → Créer une boutique [INFLUENCER]
POST /api/v1/stores/products     → Ajouter produit à boutique [INFLUENCER]
GET  /api/v1/stores/:slug        → Boutique publique [PUBLIC]
```

### Commandes
```
POST /api/v1/orders              → Passer commande [PUBLIC — COD]
POST /api/v1/orders/complete     → Valider livraison + distribuer gains [ADMIN/SUPPLIER]
POST /api/v1/orders/cancel       → Annuler commande [AUTH]
```

### Portefeuille
```
GET  /api/v1/wallet/balance       → Solde + stats [AUTH]
GET  /api/v1/wallet/transactions  → Historique paginé [AUTH]
POST /api/v1/wallet/withdraw      → Demande retrait Mobile Money [AUTH]
```

---

## 🔐 Sécurité

- **JWT** : tokens 7 jours, vérification sur chaque route protégée
- **RBAC** : `requireRole('ADMIN', 'SUPPLIER', 'INFLUENCER')`
- **Transactions Prisma** : `$transaction()` pour toute opération financière (atomique + rollback)
- **bcryptjs** : hash des mots de passe (12 rounds)
- **Helmet.js** : headers HTTP sécurisés
- **Validation prix** : impossible de vendre sous le prix plancher fournisseur

---

## ⚙️ Installation & Démarrage

### Backend
```bash
cd backend
npm install

# Configurer .env
DATABASE_URL="postgresql://user:pass@localhost:5432/brandship"
JWT_SECRET="votre_secret_jwt_solide"
CLOUDINARY_URL="cloudinary://..."
FRONTEND_URL="http://localhost:3000"

# Initialiser la base de données
npx prisma migrate dev --name init
npx prisma generate

# Démarrer en développement
npm run dev        # → http://localhost:4000
```

### Frontend
```bash
cd frontend
npm install
npm run dev        # → http://localhost:3000
```

---

## 🔜 Fonctionnalités à Développer (Roadmap)

### Phase 2
- [ ] Dashboard influenceur (stats, commandes, revenus)
- [ ] Dashboard fournisseur (produits, commandes reçues)
- [ ] Upload images Cloudinary avec compression .webp
- [ ] Notifications en temps réel (Socket.io ou SSE)
- [ ] Intégration Cinetpay/Wave pour les retraits automatiques

### Phase 3
- [ ] App mobile React Native
- [ ] Intégration WhatsApp Business API
- [ ] Programme de parrainage multi-niveaux
- [ ] Analytics et rapports

---

## 📞 Contact

**Brand Ship CI** · Abidjan, Côte d'Ivoire  
Plateforme Social Commerce Afrique de l'Ouest
