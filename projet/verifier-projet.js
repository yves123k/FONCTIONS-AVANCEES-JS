// Mini-projet – vérification automatique des parties A et B (16 points sur 20).
// Le serveur du kit doit tourner : node serveur/serveur.js
//   node projet/verifier-projet.js
// Les 4 derniers points (qualité, Git, présentation) sont évalués par le formateur.

import { isDeepStrictEqual } from "node:util";
import { plats as platsSource, commandes as commandesSource } from "../donnees/menu.js";
import * as A from "./panier.js";
import * as B from "./api.js";

function gelerTout(v) {
  if (v && typeof v === "object") {
    Object.values(v).forEach(gelerTout);
    Object.freeze(v);
  }
  return v;
}
const plats = gelerTout(structuredClone(platsSource));
const commandes = gelerTout(structuredClone(commandesSource));

const scores = {};
async function critere(partie, description, points, test) {
  let ok = false;
  let detail = "";
  try {
    ok = (await test()) === true;
  } catch (e) {
    detail = ` (${e.name} : ${e.message})`;
  }
  scores[partie] ??= { obtenu: 0, total: 0 };
  scores[partie].total += points;
  if (ok) scores[partie].obtenu += points;
  console.log(`  ${ok ? "✅" : "❌"} ${description} [${ok ? points : 0}/${points}]${detail}`);
}
const egal = isDeepStrictEqual;
const chrono = async (f) => {
  const debut = performance.now();
  let r;
  try {
    r = await f();
  } catch (e) {
    r = e;
  }
  return { r, ms: performance.now() - debut };
};

console.log("\nPartie A – panier et statistiques (7 points)");
await critere("A", "A1 indexerCarte renvoie une Map id → plat", 1, () => {
  const m = A.indexerCarte(plats);
  return m instanceof Map && m.size === 12 && m.get("P03").nom === "Kedjenou de poulet";
});
await critere("A", "A2 ajouterLigne : ajoute, regroupe, sans modifier, refuse 0", 1.5, () => {
  const p0 = gelerTout([]);
  const p1 = gelerTout(A.ajouterLigne(p0, "P01", 2));
  const p2 = A.ajouterLigne(p1, "P01", 1);
  let refuse = false;
  try {
    A.ajouterLigne(p1, "B01", 0);
  } catch {
    refuse = true;
  }
  return egal(p2, [{ platId: "P01", quantite: 3 }]) && p0.length === 0 && refuse;
});
await critere("A", "A3 retirerLigne sans modifier", 0.5, () => {
  const p = gelerTout([{ platId: "P01", quantite: 1 }, { platId: "B01", quantite: 2 }]);
  return egal(A.retirerLigne(p, "P01"), [{ platId: "B01", quantite: 2 }]);
});
await critere("A", "A4 resumePanier", 1.5, () => {
  const p = gelerTout([{ platId: "P03", quantite: 1 }, { platId: "B02", quantite: 2 }]);
  return egal(A.resumePanier(p, A.indexerCarte(plats)), {
    lignes: [{ nom: "Kedjenou de poulet", quantite: 1, sousTotal: 3500 }, { nom: "Gnamakoudji", quantite: 2, sousTotal: 1000 }],
    total: 4500,
    nombreArticles: 3,
  });
});
await critere("A", "A5 creerGenerateurReference : deux générateurs indépendants", 1, () => {
  const g1 = A.creerGenerateurReference("CJD");
  const g2 = A.creerGenerateurReference("WEB");
  return egal([g1(), g1(), g2(), g1()], ["CJD-001", "CJD-002", "WEB-001", "CJD-003"]);
});
await critere("A", "A6 statistiques", 1.5, () => {
  const { chiffreAffaires, clients, ventesParPlat } = A.statistiques(commandes, plats);
  return (
    chiffreAffaires === 12000 &&
    clients instanceof Set && clients.size === 4 &&
    ventesParPlat instanceof Map && ventesParPlat.get("Garba") === 2 && ventesParPlat.get("Alloco poisson") === 3 && !ventesParPlat.has("Kedjenou de poulet")
  );
});

console.log("\nPartie B – appels au serveur (9 points)");
try {
  await fetch(`${B.API}/plats/P01`);
} catch {
  console.log("  ⚠️  Le serveur ne répond pas : lancez node serveur/serveur.js dans un autre terminal.");
  process.exit(1);
}
const cle = Date.now();
await critere("B", "B1 obtenirRobuste réessaie une erreur 503 et finit par réussir", 1, async () =>
  egal(await B.obtenirRobuste(`${B.API}/instable?echecs=2&cle=a${cle}`), { message: "Réussi après 2 échec(s)" }));
await critere("B", "B1 obtenirRobuste abandonne après 3 essais", 0.5, async () => {
  const { r } = await chrono(() => B.obtenirRobuste(`${B.API}/instable?echecs=5&cle=b${cle}`));
  return r instanceof B.ErreurHttp && r.statut === 503;
});
await critere("B", "B1 obtenirRobuste ne réessaie pas une 404", 0.5, async () => {
  const { r, ms } = await chrono(() => B.obtenirRobuste(`${B.API}/plats/ZZZ`));
  return r instanceof B.ErreurHttp && r.statut === 404 && ms < 600;
});
await critere("B", "B1 obtenirRobuste : délai maximum par essai", 1, async () => {
  const { r, ms } = await chrono(() => B.obtenirRobuste(`${B.API}/lent?ms=3000`, { delai: 400, tentatives: 2 }));
  return r?.name === "TimeoutError" && ms > 800 && ms < 1600;
});
await critere("B", "B1 obtenirRobuste : annulation immédiate, sans nouvel essai", 1, async () => {
  const c = new AbortController();
  setTimeout(() => c.abort(), 200);
  const { r, ms } = await chrono(() => B.obtenirRobuste(`${B.API}/lent?ms=3000`, { signal: c.signal }));
  return r?.name === "AbortError" && ms < 500;
});
await critere("B", "B2 chargerTableauDeBord : données complètes et concurrentes", 1.5, async () => {
  const { r, ms } = await chrono(() => B.chargerTableauDeBord());
  return r?.plats?.length === 12 && Array.isArray(r.commandes) && r.stocks instanceof Map && r.stocks.size === 11 && r.stocks.get("P01") === 21 && egal(r.erreurs, []) && ms < 3500;
});
await critere("B", "B3 envoyerCommande : commande valide (201)", 1, async () => {
  const c = await B.envoyerCommande("Test", [{ platId: "P01", quantite: 1 }]);
  return typeof c?.id === "number" && c.client === "Test";
});
await critere("B", "B3 envoyerCommande : refus 400 avec details", 1, async () => {
  const { r } = await chrono(() => B.envoyerCommande("Test", [{ platId: "P04", quantite: 1 }]));
  return r instanceof B.ErreurHttp && r.statut === 400 && r.details?.length > 0;
});
await critere("B", "B4 creerRecherche : la dernière recherche gagne", 1.5, async () => {
  const rechercher = B.creerRecherche();
  const issues = await Promise.allSettled(["g", "ga", "gar"].map((t, i) => new Promise((ok) => setTimeout(ok, i * 100)).then(() => rechercher(t))));
  return (
    issues[0].status === "rejected" && issues[0].reason.name === "AbortError" &&
    issues[1].status === "rejected" && issues[1].reason.name === "AbortError" &&
    issues[2].status === "fulfilled" && egal(issues[2].value.map((p) => p.nom), ["Garba"])
  );
});

const total = Object.values(scores).reduce((s, p) => s + p.obtenu, 0);
console.log(`\nPartie A : ${scores.A.obtenu}/${scores.A.total} · Partie B : ${scores.B.obtenu}/${scores.B.total}`);
console.log(`Total automatique : ${total}/16 (+ 4 points évalués par le formateur)`);
