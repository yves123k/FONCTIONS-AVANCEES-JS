// Séance 5 – Atelier 3 : réessayer, et la dernière recherche gagne.
//   node seance-5/robuste.js

import { API, ErreurHttp, obtenirJSON } from "../outils/api.js";
import { verifier, bilan, pause } from "../outils/verifier.js";

// ---------- Étape 1 : nouvelle tentative bornée ----------

// true pour : TimeoutError, TypeError (réseau), ErreurHttp 429, 502, 503, 504. false sinon (et pour AbortError).
function estPassagere(erreur) {
  // À compléter
}

// Réessaie « operation » si l'erreur est passagère, au plus « tentatives » fois,
// avec un délai de delaiInitial, puis × 2, × 4… (+ un peu de hasard) entre les essais.
async function avecNouvellesTentatives(operation, { tentatives = 3, delaiInitial = 200, signal } = {}) {
  // À compléter
}

// ---------- Étape 2 : la dernière recherche gagne ----------

// Renvoie une fonction rechercher(texte) qui annule la recherche précédente avant d'en lancer une nouvelle.
function creerRecherche() {
  // À compléter
}

// ---------- Exécution : ne pas modifier ----------
const resultat = async (promesse) => {
  try {
    return await promesse;
  } catch (e) {
    return e instanceof ErreurHttp ? `${e.name} ${e.statut}` : e.name;
  }
};
let appels = 0;
const compter = (fn) => () => {
  appels++;
  return fn();
};

console.log("\nÉtape 1 – nouvelles tentatives");
const cle = Date.now();
appels = 0;
verifier("instable (2 échecs) : réussi", await resultat(avecNouvellesTentatives(compter(() => obtenirJSON(`${API}/instable?echecs=2&cle=a${cle}`)))), { message: "Réussi après 2 échec(s)" });
verifier("… en 3 essais", appels, 3);
appels = 0;
verifier("instable (5 échecs) : abandon", await resultat(avecNouvellesTentatives(compter(() => obtenirJSON(`${API}/instable?echecs=5&cle=b${cle}`)))), "ErreurHttp 503");
verifier("… après 3 essais", appels, 3);
appels = 0;
verifier("404 : erreur tout de suite", await resultat(avecNouvellesTentatives(compter(() => obtenirJSON(`${API}/plats/ZZZ`)))), "ErreurHttp 404");
verifier("… en 1 seul essai", appels, 1);
appels = 0;
verifier("trop lent à chaque essai : TimeoutError", await resultat(avecNouvellesTentatives(compter(() => obtenirJSON(`${API}/lent?ms=3000`, { signal: AbortSignal.timeout(500) })))), "TimeoutError");
verifier("… après 3 essais", appels, 3);

console.log("\nÉtape 2 – la recherche naïve (chaque réponse s'affiche dès qu'elle arrive)");
const afficher = (texte) => (r) => console.log(`  « ${texte} » → ${r.map((p) => p.nom).join(", ")}`);
async function simulerFrappe(rechercher) {
  const enCours = [];
  for (const texte of ["g", "ga", "gar"]) {
    enCours.push(
      rechercher(texte)
        .then(afficher(texte))
        .catch((e) => {
          if (e.name !== "AbortError") throw e;
          console.log(`  « ${texte} » annulée`);
        }),
    );
    await pause(100);
  }
  await Promise.all(enCours);
}
await simulerFrappe(async (texte) => (await obtenirJSON(`${API}/recherche?q=${encodeURIComponent(texte)}`)).resultats);

console.log("\nÉtape 2 – avec creerRecherche");
const rechercher = creerRecherche();
if (typeof rechercher === "function") await simulerFrappe(rechercher);
else console.log("  ❌ creerRecherche() doit renvoyer une fonction");
bilan();
