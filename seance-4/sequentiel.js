// Séance 4 – Atelier 1 : le stock de toute la carte.
// Serveur lancé dans un autre terminal (node serveur/serveur.js). Regardez-le pendant l'exécution !
//   node seance-4/sequentiel.js

import { plats } from "../donnees/menu.js";
import { API, obtenirJSON, chronometrer } from "../outils/api.js";
import { verifier, bilan } from "../outils/verifier.js";

// 1. Une requête APRÈS l'autre (for…of + await). Renvoie [{ platId, quantite }, …]
async function stocksSequentiels(liste) {
  // À compléter
}

// 3. Toutes les requêtes EN MÊME TEMPS (map + Promise.all)
async function stocksConcurrents(liste) {
  // À compléter
}

// ---------- Exécution : ne pas modifier ----------
console.log("\nVersion séquentielle… (patience)");
const seq = await chronometrer(() => stocksSequentiels(plats));
console.log(`  Durée : ${seq.ms} ms`);
verifier("12 stocks reçus", seq.resultat?.length, 12);
verifier("stock de P01", seq.resultat?.[0], { platId: "P01", quantite: 21 });

console.log("\nVersion concurrente…");
const conc = await chronometrer(() => stocksConcurrents(plats));
console.log(`  Durée : ${conc.ms} ms`);
verifier("mêmes résultats", conc.resultat, seq.resultat);
verifier("au moins 5 fois plus rapide", conc.ms * 5 < seq.ms, true);
bilan();
