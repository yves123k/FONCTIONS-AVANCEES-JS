// Petit outil de vérification utilisé dans les fichiers d'exercices.
//   verifier("le total vaut 3000", total, 3000);
// Affiche ✅ si « obtenu » est égal à « attendu » (même contenu, même pour des tableaux ou des objets),
// ❌ sinon, avec les deux valeurs pour comparer.

import { isDeepStrictEqual, inspect } from "node:util";

let reussis = 0;
let rates = 0;

export function verifier(description, obtenu, attendu) {
  if (isDeepStrictEqual(obtenu, attendu)) {
    reussis++;
    console.log(`  ✅ ${description}`);
  } else {
    rates++;
    console.log(`  ❌ ${description}`);
    console.log(`       attendu : ${inspect(attendu, { depth: 4, breakLength: Infinity })}`);
    console.log(`       obtenu  : ${inspect(obtenu, { depth: 4, breakLength: Infinity })}`);
  }
}

export function bilan() {
  console.log(`\n${reussis} vérification(s) réussie(s), ${rates} ratée(s).`);
}

// Attendre « ms » millisecondes : await pause(500)
// Annulable avec un signal (séance 5) : await pause(500, { signal })
export function pause(ms, { signal } = {}) {
  return new Promise((resolve, reject) => {
    if (signal?.aborted) return reject(signal.reason);
    const quandAnnule = () => {
      clearTimeout(minuteur);
      reject(signal.reason);
    };
    const minuteur = setTimeout(() => {
      signal?.removeEventListener("abort", quandAnnule);
      resolve();
    }, ms);
    signal?.addEventListener("abort", quandAnnule, { once: true });
  });
}
