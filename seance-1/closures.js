// Séance 1 – Atelier 3 : closures. Complétez les fonctions, puis lancez :
//   node seance-1/closures.js

import { plats } from "../donnees/menu.js";
import { verifier, bilan } from "../outils/verifier.js";

// ---------- Étape 1 : le générateur de numéros ----------
// Renvoie une fonction qui renvoie depart + 1, puis depart + 2, etc.
function creerGenerateurDeNumeros(depart) {
  // À compléter
}

// ---------- Étape 2 : la fabrique de remises ----------
// Renvoie une fonction (prix) => prix remisé, arrondi à l'entier (Math.round)
function creerRemise(pourcentage) {
  // À compléter
}

// ---------- Étape 3 : le panier aux données privées ----------
// Renvoie un objet { ajouter, retirer, total, contenu } (voir le tableau du support)
function creerPanier() {
  // À compléter
}

// ---------- Étape 4 (pour aller plus loin) : une seule fois ----------
function uneSeuleFois(fonction) {
  // À compléter
}

// ---------- Vérifications : ne pas modifier ----------
const essayer = (fn) => {
  try {
    return fn();
  } catch (e) {
    return `Erreur : ${e.message}`;
  }
};

console.log("\nÉtape 1 – générateur");
const numeros = essayer(() => {
  const g1 = creerGenerateurDeNumeros(100);
  const g2 = creerGenerateurDeNumeros(500);
  return [g1(), g1(), g2(), g1()];
});
verifier("deux générateurs indépendants", numeros, [101, 102, 501, 103]);

console.log("\nÉtape 2 – remises");
verifier("remise de 10 % sur 3000", essayer(() => creerRemise(10)(3000)), 2700);
verifier("remise de 15 % sur 2500, arrondie", essayer(() => creerRemise(15)(2500)), 2125);
verifier("remise de 15 % sur 700, arrondie", essayer(() => creerRemise(15)(700)), 595);

console.log("\nÉtape 3 – panier");
const resultatPanier = essayer(() => {
  const panier = creerPanier();
  panier.ajouter("P01", 2);
  panier.ajouter("B01", 1);
  panier.ajouter("P01", 1);
  const apresAjouts = panier.contenu();
  const totalAvant = panier.total(plats);
  panier.contenu().push({ platId: "P03", quantite: 10 }); // tentative de triche
  panier.retirer("B01");
  return { apresAjouts, totalAvant, final: panier.contenu(), totalFinal: panier.total(plats), prive: panier.lignes };
});
verifier("ajouter regroupe les quantités", resultatPanier.apresAjouts, [{ platId: "P01", quantite: 3 }, { platId: "B01", quantite: 1 }]);
verifier("total : 3 Garba + 1 Bissap", resultatPanier.totalAvant, 3500);
verifier("retirer et protection de la liste", resultatPanier.final, [{ platId: "P01", quantite: 3 }]);
verifier("total final", resultatPanier.totalFinal, 3000);
verifier("la liste n'est pas accessible de l'extérieur", resultatPanier.prive, undefined);
verifier("deux paniers indépendants", essayer(() => {
  const a = creerPanier();
  const b = creerPanier();
  a.ajouter("P01", 1);
  return b.contenu();
}), []);

console.log("\nÉtape 4 – une seule fois");
verifier("la fonction n'est appelée qu'une fois", essayer(() => {
  let appels = 0;
  const envoyer = uneSeuleFois((id) => {
    appels++;
    return `commande ${id} envoyée`;
  });
  return [envoyer(7), envoyer(8), appels];
}), ["commande 7 envoyée", "commande 7 envoyée", 1]);

bilan();
