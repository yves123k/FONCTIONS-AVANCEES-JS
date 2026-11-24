// Mini-projet – Partie A : le panier et les statistiques (sous-module 1).
// Règles : pas de var ; aucune fonction ne modifie les données qu'elle reçoit.

// A1. Une Map id → plat
export function indexerCarte(plats) {
  // À compléter
}

// A2. Nouveau panier avec la ligne ajoutée. Si le plat y est déjà, sa quantité augmente.
// Lance une erreur "Quantité invalide" si quantite n'est pas un entier ≥ 1.
export function ajouterLigne(panier, platId, quantite) {
  // À compléter
}

// A3. Nouveau panier sans la ligne de ce plat
export function retirerLigne(panier, platId) {
  // À compléter
}

// A4. { lignes: [{ nom, quantite, sousTotal }], total, nombreArticles }
export function resumePanier(panier, index) {
  // À compléter
}

// A5. Renvoie une fonction qui renvoie "CJD-001", puis "CJD-002"… (prefixe = "CJD")
export function creerGenerateurReference(prefixe) {
  // À compléter
}

// A6. { chiffreAffaires, clients, ventesParPlat }
//   chiffreAffaires : total des commandes LIVRÉES
//   clients : Set de tous les clients
//   ventesParPlat : Map nom du plat → quantité vendue (commandes livrées)
export function statistiques(commandes, plats) {
  // À compléter
}
