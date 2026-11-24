// Séance 3 – Atelier 2 : la cuisine de Chez John Doe.
//   node seance-3/promesses.js

import { verifier, bilan, pause } from "../outils/verifier.js";

// Déjà écrite : prépare un plat en « ms » millisecondes.
// La promesse est rompue pour le Foutou sauce graine (plus d'ingrédients).
function preparerPlat(nom, ms) {
  return new Promise((resolve, reject) => {
    if (nom === "Foutou sauce graine") {
      reject(new Error(`${nom} : plus d'ingrédients`));
      return;
    }
    setTimeout(() => resolve(`${nom} prêt`), ms);
  });
}

// ---------- Étape 1 : then, catch, finally ----------
// Préparez le plat (1000 ms) avec then / catch / finally :
// affichez le message ou « Erreur : … », puis « Ticket fermé ».
// N'oubliez pas de RENVOYER la chaîne de promesses (return preparerPlat(...)...).
function etape1(nom) {
  // À compléter
}

// ---------- Étape 2 : async / await ----------
// Salade d'avocat (500 ms), puis Kedjenou de poulet (1000 ms), puis Dêguê (300 ms),
// l'un APRÈS l'autre. Affichez chaque message. Renvoyez la durée totale en ms.
async function servirMenu() {
  // À compléter
}

// ---------- Étape 3 : les erreurs ----------
// Essaie de préparer « nom » (300 ms). En cas d'erreur : affiche l'erreur et prépare un Garba (300 ms).
// Renvoie toujours un message. Affiche « Ticket fermé » dans tous les cas.
async function servirAvecSecours(nom) {
  // À compléter
}

// Lance l'erreur "Commande vide" si commande.lignes est vide ; renvoie "Commande valide" sinon.
async function verifierCommande(commande) {
  // À compléter
}

// ---------- Exécution et vérifications : ne pas modifier ----------
console.log("\nÉtape 1");
await etape1("Garba");
await etape1("Foutou sauce graine");
await pause(100);

console.log("\nÉtape 2");
const duree = await servirMenu();
verifier("servirMenu dure environ 1800 ms", typeof duree === "number" && duree >= 1750 && duree < 2100, true);

console.log("\nÉtape 3");
verifier("servirAvecSecours(Alloco poisson)", await servirAvecSecours("Alloco poisson"), "Alloco poisson prêt");
verifier("servirAvecSecours(Foutou) sert un Garba", await servirAvecSecours("Foutou sauce graine"), "Garba prêt");
verifier("commande valide", await verifierCommande({ lignes: [{ platId: "P01", quantite: 1 }] }), "Commande valide");
const resultat = await verifierCommande({ lignes: [] }).then(
  () => "pas d'erreur",
  (erreur) => erreur.message,
);
verifier("commande vide → promesse rompue", resultat, "Commande vide");
bilan();
