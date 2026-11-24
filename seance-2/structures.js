// Séance 2 – Atelier 3 : Map et Set.
//   node seance-2/structures.js

import { plats, commandes } from "../donnees/menu.js";
import { verifier, bilan } from "../outils/verifier.js";

// ---------- Étape 1 : Map ----------

// 1. Une Map id → plat
function indexerParId(liste) {
  // À compléter
}

// 2. Une Map nom du client → nombre de commandes
function commandesParClient(liste) {
  // À compléter
}

// 3. Une NOUVELLE Map où le stock du plat a diminué ; erreur "Stock insuffisant" si négatif
function retirerDuStock(stock, platId, quantite) {
  // À compléter
}

// ---------- Étape 2 : Set ----------

// 4. Le Set des noms de clients
function clientsUniques(liste) {
  // À compléter
}

// 5. Le Set des platId commandés au moins une fois
function platsCommandes(liste) {
  // À compléter
}

// 6. Les NOMS des plats qui ne sont dans aucune commande
function platsJamaisCommandes(carte, liste) {
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
console.log("\nÉtape 1");
const index = essayer(() => indexerParId(plats));
verifier("1. indexerParId est une Map", index instanceof Map, true);
verifier("1. index.get('P03')", index?.get?.("P03")?.nom, "Kedjenou de poulet");
verifier("1. 12 plats indexés", index?.size, 12);
const parClient = essayer(() => commandesParClient(commandes));
verifier("2. commandesParClient", parClient instanceof Map ? Object.fromEntries(parClient) : parClient, { Koffi: 2, Mariam: 2, Aya: 1, Ibrahim: 1 });
const stock = new Map([["P01", 5], ["B01", 2]]);
const nouveauStock = essayer(() => retirerDuStock(stock, "P01", 3));
verifier("3. retirerDuStock : il reste 2 Garba", nouveauStock?.get?.("P01"), 2);
verifier("3. le stock d'origine n'a pas changé", stock.get("P01"), 5);
verifier("3. stock insuffisant", essayer(() => retirerDuStock(stock, "B01", 3)), "Erreur : Stock insuffisant");
console.log("\nÉtape 2");
const clients = essayer(() => clientsUniques(commandes));
verifier("4. clientsUniques est un Set", clients instanceof Set, true);
verifier("4. 4 clients différents", clients?.size, 4);
verifier("5. platsCommandes : 11 plats différents", essayer(() => platsCommandes(commandes))?.size, 11);
verifier("6. platsJamaisCommandes", essayer(() => platsJamaisCommandes(plats, commandes)), ["Foutou sauce graine"]);
bilan();
