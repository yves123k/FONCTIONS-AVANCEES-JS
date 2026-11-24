// Séance 1 – Atelier 2 : la carte du restaurant avec les fonctions de rappel.
// Remplacez chaque « return null; » par votre code, puis lancez :
//   node seance-1/rappels.js

import { plats } from "../donnees/menu.js";
import { verifier, bilan } from "../outils/verifier.js";

// ---------- Étape 1 : transformer et filtrer ----------

// 1. Le tableau des noms des plats (map)
function nomsDesPlats(liste) {
  return null;
}

// 2. Seulement les plats disponibles (filter)
function platsDisponibles(liste) {
  return null;
}

// 3. Le plat qui a cet id, ou undefined (find)
function trouverPlat(liste, id) {
  return null;
}

// 4. Les NOMS des boissons (filter puis map)
function boissons(liste) {
  return null;
}

// 5. true s'il y a au moins un plat épicé (some)
function ilYaDesPlatsEpices(liste) {
  return null;
}

// ---------- Étape 2 : calculer avec reduce ----------

// 6. La somme des prix
function prixTotal(liste) {
  return null;
}

// 7. Un objet qui compte les plats par catégorie : { plat: 6, entree: 2, ... }
function nombreParCategorie(liste) {
  return null;
}

// ---------- Étape 3 : vos fonctions qui prennent un rappel ----------

// 8. Une COPIE de la liste, triée selon critere (du plus petit au plus grand)
function trierPar(liste, critere) {
  return null;
}

// 9. Le nombre d'éléments pour lesquels condition renvoie true (avec for…of, sans filter)
function compterSi(liste, condition) {
  return null;
}

// ---------- Vérifications : ne pas modifier ----------
console.log("\nÉtape 1");
verifier("1. nomsDesPlats", nomsDesPlats(plats)?.slice(0, 3), ["Garba", "Alloco poisson", "Kedjenou de poulet"]);
verifier("2. platsDisponibles : 11 plats", platsDisponibles(plats)?.length, 11);
verifier("3. trouverPlat P03", trouverPlat(plats, "P03")?.nom, "Kedjenou de poulet");
verifier("3. trouverPlat inconnu", trouverPlat(plats, "ZZZ"), undefined);
verifier("4. boissons", boissons(plats), ["Bissap", "Gnamakoudji", "Eau minérale"]);
verifier("5. ilYaDesPlatsEpices", ilYaDesPlatsEpices(plats), true);
console.log("\nÉtape 2");
verifier("6. prixTotal", prixTotal(plats), 19500);
verifier("6. prixTotal d'une liste vide", prixTotal([]), 0);
verifier("7. nombreParCategorie", nombreParCategorie(plats), { plat: 6, entree: 2, boisson: 3, dessert: 1 });
console.log("\nÉtape 3");
const tries = trierPar(plats, (p) => p.prix);
verifier("8. trierPar prix : le moins cher", tries?.[0]?.nom, "Eau minérale");
verifier("8. trierPar prix : le plus cher", tries?.at(-1)?.nom, "Kedjenou de poulet");
verifier("8. la liste d'origine n'est pas modifiée", plats[0].nom, "Garba");
verifier("9. compterSi épicés", compterSi(plats, (p) => p.epice), 5);
verifier("9. compterSi prix > 2000", compterSi(plats, (p) => p.prix > 2000), 4);
bilan();
