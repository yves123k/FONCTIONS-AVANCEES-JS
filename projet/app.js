// Mini-projet – démonstration : utilise vos fonctions comme une vraie application.
//   node projet/app.js

import { indexerCarte, ajouterLigne, retirerLigne, resumePanier, creerGenerateurReference, statistiques } from "./panier.js";
import { chargerTableauDeBord, envoyerCommande, creerRecherche } from "./api.js";

const format = (n) => `${n.toLocaleString("fr-FR")} F`;

console.log("🍲 Chez John Doe\n");
const { plats, commandes, stocks, erreurs } = await chargerTableauDeBord();
if (erreurs.length) console.log("⚠️ ", erreurs.join(" ; "));
if (!plats) process.exit(1);

const index = indexerCarte(plats);
console.log("Carte :");
for (const p of plats.filter((p) => p.disponible)) console.log(`  ${p.id}  ${p.nom.padEnd(24)} ${format(p.prix).padStart(9)}   stock : ${stocks.get(p.id) ?? "?"}`);

if (commandes) {
  const { chiffreAffaires, clients, ventesParPlat } = statistiques(commandes, plats);
  console.log(`\nChiffre d'affaires : ${format(chiffreAffaires)} · ${clients.size} clients`);
  console.log("Ventes :", [...ventesParPlat].map(([nom, q]) => `${nom} × ${q}`).join(", "));
}

let panier = [];
panier = ajouterLigne(panier, "P03", 1);
panier = ajouterLigne(panier, "B02", 2);
panier = ajouterLigne(panier, "D01", 1);
panier = retirerLigne(panier, "D01");
const { lignes, total, nombreArticles } = resumePanier(panier, index);
console.log(`\nPanier (${nombreArticles} articles) :`);
for (const l of lignes) console.log(`  ${l.quantite} × ${l.nom.padEnd(22)} ${format(l.sousTotal).padStart(9)}`);
console.log(`  Total : ${format(total)}`);

const reference = creerGenerateurReference("CJD");
try {
  const commande = await envoyerCommande("Mariam", panier);
  console.log(`\n✅ Commande ${commande.id} enregistrée (référence ${reference()})`);
} catch (e) {
  console.log("\n❌ Commande refusée :", e.message, e.details ?? "");
}

const rechercher = creerRecherche();
const r = await rechercher("kedj");
console.log(`\nRecherche « kedj » : ${r.map((p) => p.nom).join(", ")}`);
