# Chez John Doe — kit du module JavaScript avancé (B2 DEV)

Tous les exercices du module, sur un même projet : l'application du restaurant **Chez John Doe**.

## Prérequis

- **Node.js 26 LTS** (au minimum 24) : vérifiez avec `node --version`. Installation : [nodejs.org/fr/download](https://nodejs.org/fr/download), version LTS.
- **VS Code** : ouvrez ce dossier (**Fichier** → **Ouvrir le dossier…**) et utilisez son terminal (**Terminal** → **Nouveau terminal**). PowerShell (Windows) ou zsh (Mac) : les commandes sont les mêmes.
- Aucun paquet à installer : pas de `npm install`.

## Contenu

```
chez-john-doe-js/
├── package.json         "type": "module" : on utilise import / export
├── donnees/menu.js      la carte (plats) et les commandes du restaurant
├── outils/verifier.js   verifier() affiche ✅ ou ❌ ; pause(ms) attend
├── outils/api.js        obtenirJSON() et ErreurHttp (à partir de la séance 4)
├── serveur/serveur.js   le serveur d'entraînement (sous-module 2)
├── seance-1/ … seance-5/   les fichiers de départ des ateliers
└── projet/              le mini-projet évalué
```

## Lancer un exercice

```bash
node seance-1/rappels.js
```

## Lancer le serveur (séances 3 à 5 et mini-projet)

Dans un **deuxième terminal** de VS Code (bouton **+** du panneau du terminal), à laisser ouvert :

```bash
node serveur/serveur.js
```

Le serveur répond sur <http://localhost:3000/api>. Chaque requête s'affiche dans son terminal ;
une requête annulée apparaît avec ⛔. Pour l'arrêter : **Ctrl + C**.

| Route | Comportement |
| --- | --- |
| `GET /api/plats`, `/api/plats/:id` | La carte, un plat (≈ 0,3 s) ; 404 si inconnu |
| `GET /api/commandes`, `/api/commandes/:id` | Les commandes (≈ 0,3 s) |
| `POST /api/commandes` | Crée une commande (JSON) : 201, ou 400 avec `details` |
| `GET /api/stock/:id` | Le stock d'un plat (≈ 0,8 s) |
| `GET /api/lent?ms=3000` | Répond après `ms` millisecondes |
| `GET /api/instable?echecs=2&cle=x` | Échoue (503) les `echecs` premières fois, puis réussit |
| `GET /api/aleatoire` | Échoue une fois sur deux (503) |
| `GET /api/recherche?q=…` | Recherche ; plus `q` est court, plus c'est lent |
| `GET /api/erreur` | Erreur 500 |
| `GET /api/pas-du-json` | Répond du HTML au lieu du JSON |
