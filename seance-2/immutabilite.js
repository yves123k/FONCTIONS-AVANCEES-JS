// Séance 2 – Atelier 2 : un panier qui ne se modifie jamais.
// Les données sont GELÉES : si une fonction modifie l'original, Node.js affiche une erreur.
//   node seance-2/immutabilite.js

import { plats, commandes } from "../donnees/menu.js";
import { verifier, bilan } from "../outils/verifier.js";

// Gèle un objet à tous les niveaux
function gelerTout(valeur) {
  if (valeur && typeof valeur === "object") {
    Object.values(valeur).forEach(gelerTout);
    Object.freeze(valeur);
  }
  return valeur;
}

// ---------- Étape 1 : observer le problème (ne pas corriger celle-ci) ----------
function ajouterAuPanierMauvais(panier, ligne) {
  panier.push(ligne);
  return panier;
}

// ---------- Étape 2 : le panier immuable ----------
// Interdit : push, splice, sort, reverse, et les affectations du type x.quantite = …

// 3.
function ajouterAuPanier(panier, ligne) {
  // À compléter
}

// 4.
function retirerDuPanier(panier, platId) {
  // À compléter
}

// 5.
function changerQuantite(panier, platId, quantite) {
  // À compléter
}

// 6. Du plus grand au plus petit
function trierParQuantite(panier) {
  // À compléter
}

// ---------- Étape 3 : commandes et carte ----------

// 7.
function changerStatut(liste, id, statut) {
  // À compléter
}

// 8. Prix augmentés de « pourcentage » %, arrondis (Math.round)
function augmenterLesPrix(liste, pourcentage) {
  // À compléter
}

// 9. Nouveau quartier dans commande.adresse
function demenager(commande, quartier) {
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
const panier = gelerTout([{ platId: "P01", quantite: 2 }, { platId: "B01", quantite: 1 }]);
const carte = gelerTout(structuredClone(plats));
const liste = gelerTout(structuredClone(commandes));

console.log("\nÉtape 1");
console.log("  ajouterAuPanierMauvais →", essayer(() => ajouterAuPanierMauvais(panier, { platId: "D01", quantite: 1 })));

console.log("\nÉtape 2");
verifier("3. ajouterAuPanier", essayer(() => ajouterAuPanier(panier, { platId: "D01", quantite: 1 })), [{ platId: "P01", quantite: 2 }, { platId: "B01", quantite: 1 }, { platId: "D01", quantite: 1 }]);
verifier("4. retirerDuPanier", essayer(() => retirerDuPanier(panier, "P01")), [{ platId: "B01", quantite: 1 }]);
verifier("5. changerQuantite", essayer(() => changerQuantite(panier, "B01", 4)), [{ platId: "P01", quantite: 2 }, { platId: "B01", quantite: 4 }]);
verifier("6. trierParQuantite", essayer(() => trierParQuantite([...panier].reverse())), [{ platId: "P01", quantite: 2 }, { platId: "B01", quantite: 1 }]);
verifier("le panier d'origine n'a pas changé", panier, [{ platId: "P01", quantite: 2 }, { platId: "B01", quantite: 1 }]);

console.log("\nÉtape 3");
const statuts = essayer(() => changerStatut(liste, 103, "livree"));
verifier("7. changerStatut : la 103 est livrée", statuts?.find?.((c) => c.id === 103)?.statut, "livree");
verifier("7. changerStatut : les autres n'ont pas changé", statuts?.find?.((c) => c.id === 102)?.statut, "en_preparation");
verifier("7. la liste d'origine n'a pas changé", liste.find((c) => c.id === 103).statut, "en_attente");
const augmentes = essayer(() => augmenterLesPrix(carte, 10));
verifier("8. augmenterLesPrix : Garba à 1100", augmentes?.[0]?.prix, 1100);
verifier("8. augmenterLesPrix : Dêguê à 770", augmentes?.at?.(-1)?.prix, 770);
verifier("8. augmenterLesPrix garde les autres propriétés", augmentes?.[0]?.nom, "Garba");
const demenagee = essayer(() => demenager(liste[0], "Riviera"));
verifier("9. demenager : nouveau quartier", demenagee?.adresse?.quartier, "Riviera");
verifier("9. demenager : la ville est gardée", demenagee?.adresse?.ville, "Abidjan");
verifier("9. l'adresse d'origine n'a pas changé", liste[0].adresse.quartier, "Cocody");
bilan();
