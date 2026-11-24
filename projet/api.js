// Mini-projet – Partie B : les appels au serveur (sous-module 2).
// Le serveur du kit doit tourner : node serveur/serveur.js

import { API, ErreurHttp, obtenirJSON } from "../outils/api.js";
import { pause } from "../outils/verifier.js";

export { API, ErreurHttp };

// B1. obtenirJSON avec : délai maximum PAR ESSAI, nouvelles tentatives bornées (erreurs passagères
// seulement, délai qui double), et annulation par « signal ». « options » est transmis à fetch.
export async function obtenirRobuste(url, { delai = 2000, tentatives = 3, signal, options = {} } = {}) {
  // À compléter
}

// B2. Charge EN MÊME TEMPS la carte et les commandes, puis le stock des plats disponibles
// par lots de 4. Une partie en échec ne doit pas empêcher le reste.
// Renvoie { plats, commandes, stocks, erreurs } :
//   plats / commandes : tableaux, ou null en cas d'échec
//   stocks : Map platId → quantité (vide si la carte n'a pas pu être chargée)
//   erreurs : tableau des messages d'erreur
export async function chargerTableauDeBord() {
  // À compléter
}

// B3. Envoie la commande en POST (UNE seule tentative : on ne réessaie pas un POST).
// panier = [{ platId, quantite }]. Renvoie la commande créée ; en cas de refus, l'ErreurHttp
// (avec ses details) doit remonter.
export async function envoyerCommande(client, panier) {
  // À compléter
}

// B4. Renvoie rechercher(texte) : annule la recherche précédente, délai maximum de 3 s,
// renvoie le tableau des résultats.
export function creerRecherche() {
  // À compléter
}
