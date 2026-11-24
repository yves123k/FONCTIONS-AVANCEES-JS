// Séance 5 – Atelier 2 : un délai maximum.
//   node seance-5/delais.js

import { API, obtenirJSON } from "../outils/api.js";
import { verifier, bilan } from "../outils/verifier.js";

// 1. Avec AbortSignal.timeout
async function lireAvecDelai(url, ms) {
  // À compléter
}

// 2. Sans AbortSignal.timeout : AbortController + setTimeout + finally
async function lireAvecDelaiManuel(url, ms) {
  // À compléter
}

// 3. S'arrête si l'utilisateur annule (signal) OU si le délai est dépassé (AbortSignal.any)
async function lireAnnulableAvecDelai(url, { signal, delai }) {
  // À compléter
}

// ---------- Exécution : ne pas modifier ----------
const nomErreur = async (promesse) => {
  try {
    return await promesse;
  } catch (e) {
    return e.name;
  }
};

console.log("\n1. AbortSignal.timeout");
verifier("0,5 s avec un délai de 1 s : réponse", await nomErreur(lireAvecDelai(`${API}/lent?ms=500`, 1000)), { message: "Réponse après 500 ms" });
verifier("3 s avec un délai de 1 s : TimeoutError", await nomErreur(lireAvecDelai(`${API}/lent?ms=3000`, 1000)), "TimeoutError");

console.log("\n2. Version manuelle");
verifier("0,5 s avec un délai de 1 s : réponse", await nomErreur(lireAvecDelaiManuel(`${API}/lent?ms=500`, 1000)), { message: "Réponse après 500 ms" });
verifier("3 s avec un délai de 1 s : arrêtée", await nomErreur(lireAvecDelaiManuel(`${API}/lent?ms=3000`, 1000)), "AbortError");

console.log("\n3. Annulation OU délai");
const c1 = new AbortController();
setTimeout(() => c1.abort(), 300);
verifier("l'utilisateur annule à 0,3 s", await nomErreur(lireAnnulableAvecDelai(`${API}/lent?ms=3000`, { signal: c1.signal, delai: 1000 })), "AbortError");
const c2 = new AbortController();
verifier("personne n'annule, délai de 1 s", await nomErreur(lireAnnulableAvecDelai(`${API}/lent?ms=3000`, { signal: c2.signal, delai: 1000 })), "TimeoutError");
bilan();
