// Séance 4 – Atelier 3 : dépendances, pièges et lots.
//   node seance-4/dependances.js

import { plats } from "../donnees/menu.js";
import { API, obtenirJSON, chronometrer } from "../outils/api.js";
import { verifier, bilan } from "../outils/verifier.js";

// ---------- Étape 1 : séquentiel PUIS concurrent ----------
// La commande d'abord, puis tous ses plats en même temps.
// Renvoie { id, client, lignes: [{ nom, quantite, sousTotal }], total }
async function detailCommande(id) {
  // À compléter
}

// ---------- Étape 2 : deux fonctions FAUSSES (ne pas les corriger ici) ----------
async function nomsDesPlatsFaux(ids) {
  const noms = [];
  ids.forEach(async (id) => {
    const plat = await obtenirJSON(`${API}/plats/${id}`);
    noms.push(plat.nom);
  });
  return noms;
}

async function prixDesPlatsFaux(ids) {
  return ids.map(async (id) => (await obtenirJSON(`${API}/plats/${id}`)).prix);
}

// 4. Les versions correctes, concurrentes
async function nomsDesPlats(ids) {
  // À compléter
}

async function prixDesPlats(ids) {
  // À compléter
}

// ---------- Étape 3 : par lots ----------
async function traiterParLots(elements, taille, fonction) {
  // À compléter
}

// ---------- Exécution : ne pas modifier ----------
console.log("\nÉtape 1 – detailCommande(102)");
const detail = await chronometrer(() => detailCommande(102));
console.log(`  Durée : ${detail.ms} ms`);
verifier("total de la commande 102", detail.resultat?.total, 5500);
verifier("première ligne", detail.resultat?.lignes?.[0], { nom: "Kedjenou de poulet", quantite: 1, sousTotal: 3500 });
verifier("moins de 900 ms", detail.ms < 900, true);

console.log("\nÉtape 2 – les pièges");
const ids = ["P01", "P02", "B01"];
console.log("  nomsDesPlatsFaux →", await nomsDesPlatsFaux(ids));
console.log("  prixDesPlatsFaux →", await prixDesPlatsFaux(ids));
verifier("nomsDesPlats", await nomsDesPlats(ids), ["Garba", "Alloco poisson", "Bissap"]);
verifier("prixDesPlats", await prixDesPlats(ids), [1000, 2000, 500]);

console.log("\nÉtape 3 – par lots (regardez le terminal du serveur)");
for (const taille of [1, 4, 6, 12]) {
  const { resultat, ms } = await chronometrer(() => traiterParLots(plats, taille, (p) => obtenirJSON(`${API}/stock/${p.id}`)));
  console.log(`  lots de ${String(taille).padStart(2)} : ${ms} ms, ${resultat?.length} stocks`);
}
const ordre = await traiterParLots([3, 1, 2], 2, async (n) => n * 10);
verifier("traiterParLots garde l'ordre", ordre, [30, 10, 20]);
bilan();
