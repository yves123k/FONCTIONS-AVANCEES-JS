// Séance 5 – Atelier 1 : annuler une requête et une pause.
// Regardez le terminal du serveur pendant l'exécution !
//   node seance-5/annulation.js

import { API, obtenirJSON } from "../outils/api.js";
import { verifier } from "../outils/verifier.js";

// ---------- Étape 1 ----------
// Demande /api/lent?ms=<ms> et annule au bout de <annulerApres> ms.
// Renvoie les données, ou "annulée". Toute autre erreur est relancée.
async function lireAvecAnnulation(ms, annulerApres) {
  // À compléter
}

// ---------- Étape 2 ----------
// Comme pause(ms), mais annulable par un signal. N'oubliez pas les DEUX nettoyages.
function pauseAnnulable(ms, { signal } = {}) {
  // À compléter
}

// Affiche secondes, secondes - 1, … 1, puis « Partez ! », une ligne par seconde.
async function compteARebours(secondes, { signal } = {}) {
  // À compléter
}

// ---------- Exécution : ne pas modifier ----------
console.log("\nÉtape 1");
verifier("requête de 3 s annulée après 1 s", await lireAvecAnnulation(3000, 1000), "annulée");
verifier("requête de 0,5 s, pas annulée", await lireAvecAnnulation(500, 1000), { message: "Réponse après 500 ms" });

console.log("\nÉtape 2 – compte à rebours annulé au bout de 2,5 s");
const controleur = new AbortController();
setTimeout(() => controleur.abort(), 2500);
const debut = Date.now();
try {
  await compteARebours(5, { signal: controleur.signal });
  console.log("  ?! Le compte à rebours n'a pas été annulé");
} catch (erreur) {
  console.log(`  ${erreur.name} après ${Date.now() - debut} ms`);
}
process.on("exit", () => console.log(`\nProgramme terminé ${Date.now() - debut} ms après le début du compte à rebours (attendu : environ 2500 ms).`));
