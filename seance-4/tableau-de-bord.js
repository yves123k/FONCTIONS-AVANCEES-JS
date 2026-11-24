// Séance 4 – Atelier 2 : le tableau de bord du restaurant.
//   node seance-4/tableau-de-bord.js

import { API, obtenirJSON, chronometrer } from "../outils/api.js";
import { verifier, bilan, pause } from "../outils/verifier.js";

// 1. Carte (/plats) et commandes (/commandes) EN MÊME TEMPS. Renvoie { plats, commandes }
async function chargerTout() {
  // À compléter
}

// 3. Promise.all sur /plats, /commandes et /erreur (les « promotions », en panne)
async function tableauDeBordAll() {
  // À compléter
}

// 4. Promise.allSettled sur les mêmes adresses.
// Renvoie { plats, commandes, promotions, erreurs } : null pour un bloc en échec, erreurs = les messages
async function tableauDeBordAllSettled() {
  // À compléter
}

// 6. La valeur de « promesse » si elle arrive avant « ms » millisecondes, sinon l'erreur "Délai dépassé"
async function avecDelaiMaximum(promesse, ms) {
  // À compléter
}

// 7. Promise.any sur /aleatoire, /instable?echecs=1&cle=<unique> et /lent?ms=1500
async function premiereReponse() {
  // À compléter
}

// ---------- Exécution : ne pas modifier ----------
const essayer = async (fn) => {
  try {
    return await fn();
  } catch (e) {
    return `Erreur : ${e.message}`;
  }
};

console.log("\nÉtape 1 – Promise.all");
const tout = await chronometrer(() => essayer(chargerTout));
console.log(`  Durée : ${tout.ms} ms`);
verifier("chargerTout : 12 plats", tout.resultat?.plats?.length, 12);
verifier("chargerTout : des commandes", Array.isArray(tout.resultat?.commandes), true);
verifier("chargerTout en moins de 500 ms", tout.ms < 500, true);

console.log("\nÉtape 2 – quand une partie échoue");
console.log("  tableauDeBordAll →", String(await essayer(tableauDeBordAll)).slice(0, 80));
const tdb = await essayer(tableauDeBordAllSettled);
verifier("allSettled : la carte est là", tdb?.plats?.length, 12);
verifier("allSettled : les promotions sont null", tdb?.promotions, null);
verifier("allSettled : une erreur", tdb?.erreurs, ["Erreur interne du serveur"]);

console.log("\nÉtape 3 – race et any (regardez le terminal du serveur)");
verifier("délai respecté", await essayer(() => avecDelaiMaximum(obtenirJSON(`${API}/lent?ms=500`), 1000)), { message: "Réponse après 500 ms" });
verifier("délai dépassé", await essayer(() => avecDelaiMaximum(obtenirJSON(`${API}/lent?ms=3000`), 1000)), "Erreur : Délai dépassé");
for (let essai = 1; essai <= 3; essai++) {
  const { resultat, ms } = await chronometrer(() => essayer(premiereReponse));
  console.log(`  premiereReponse, essai ${essai} : ${JSON.stringify(resultat)} (${ms} ms)`);
}
await pause(2500); // laisse finir les requêtes encore en cours, pour le terminal du serveur
bilan();
