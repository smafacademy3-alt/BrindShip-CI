# Guide de nettoyage - Suppression des fichiers obsolètes

Ce guide vous aide à nettoyer les fichiers dupliqués à la racine du dépôt après la migration vers Next.js 13+ App Router.

## Fichiers à supprimer

Les fichiers suivants existent maintenant dans `app/` et doivent être supprimés de la racine :

1. **page.tsx** (à la racine)
2. **layout.tsx** (à la racine)
3. **globals.css** (à la racine)

## Option 1 : Via l'interface GitHub (Simple)

### Étape 1 : Accédez aux fichiers
1. Allez sur : https://github.com/smafacademy3-alt/BrindShip-CI
2. Naviguez jusqu'à chaque fichier à supprimer

### Étape 2 : Supprimez le fichier
1. Ouvrez le fichier (ex: `page.tsx`)
2. Cliquez sur l'icône **⋯** (trois points) en haut à droite
3. Sélectionnez **Delete file**
4. Ajoutez le message de commit : `Clean up: Remove obsolete files from root (migrated to app/ directory)`
5. Cliquez sur **Commit changes**

**Répétez** cette opération pour chaque fichier.

---

## Option 2 : Via Git en ligne de commande (Avancé)

### Étape 1 : Clonez ou mettez à jour votre dépôt local
```bash
git clone https://github.com/smafacademy3-alt/BrindShip-CI.git
cd BrindShip-CI
```

### Étape 2 : Créez une branche de nettoyage (optionnel mais recommandé)
```bash
git checkout -b cleanup/remove-obsolete-files
```

### Étape 3 : Supprimez les fichiers
```bash
git rm page.tsx
git rm layout.tsx
git rm globals.css
```

### Étape 4 : Commitez les changements
```bash
git commit -m "Clean up: Remove obsolete files from root (migrated to app/ directory)"
```

### Étape 5 : Poussez vers GitHub
```bash
git push origin cleanup/remove-obsolete-files
```

### Étape 6 : Créez une Pull Request
1. Allez sur GitHub
2. Vous verrez un message pour créer une PR avec votre branche
3. Cliquez sur **Compare & pull request**
4. Ajoutez une description simple
5. Cliquez sur **Create pull request**
6. Reviewez et mergez la PR dans `main`

---

## Option 3 : Suppression directe sur main (Le plus simple)

Si vous êtes seul sur le projet, vous pouvez supprimer directement :

### Via Git CLI
```bash
git clone https://github.com/smafacademy3-alt/BrindShip-CI.git
cd BrindShip-CI

# Supprimez les fichiers
git rm page.tsx layout.tsx globals.css

# Commitez
git commit -m "Clean up: Remove obsolete files from root (migrated to app/ directory)"

# Poussez directement sur main
git push origin main
```

---

## ✅ Vérification après suppression

### 1. Vérifiez que les fichiers existent dans `app/`
```bash
ls app/
# Vous devriez voir : layout.tsx, page.tsx, globals.css
```

### 2. Vérifiez que les fichiers n'existent plus à la racine
```bash
git log --oneline | head -5
# Vous verrez le commit de suppression
```

### 3. Testez localement
```bash
npm install
npm run dev
```

L'application devrait fonctionner sans erreurs à `http://localhost:3000`

---

## ⚠️ Points importants

- **Backup** : Les fichiers supprimés restent dans l'historique Git (vous pouvez les récupérer si nécessaire)
- **Pas de `pages/` directory** : N'oubliez pas que Next.js n'utilisera plus le répertoire `pages/` - tout passe par `app/` maintenant
- **Vercel redéploiera automatiquement** après le push, sans erreur cette fois

---

## 🎉 Après le nettoyage

Votre structure sera propre :

```
BrindShip-CI/
├── app/                    # ← Tout le code frontend ici
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── backend/                # ← Code backend (si applicable)
├── next.config.js          # ← Configuration App Router
└── package.json
```

**Pas de duplication, pas de confusion ! ✨**
