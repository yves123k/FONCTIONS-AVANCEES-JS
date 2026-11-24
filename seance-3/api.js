// Séance 3 – Atelier 3 : appeler le serveur de Chez John Doe.
// Le serveur doit tourner dans un autre terminal : node serveur/serveur.js
//   node seance-3/api.js

const API = "http://localhost:3000/api";

// ---------- Étape 3 : une erreur HTTP qui garde son statut ----------
class ErreurHttp extends Error {
  constructor(statut, message, details = []) {
    super(message);
    this.name = "ErreurHttp";
    // À compléter : gardez statut et details dans this
  }
}

// ---------- Étape 2 : fetch + vérification de reponse.ok ----------
async function obtenirJSON(url, options) {
  // À compléter
}

// ---------- Étape 1 : la carte ----------
async function lireCarte() {
  // À compléter
}

// ---------- Étape 3 : un message clair pour chaque erreur ----------
function messagePourUtilisateur(erreur) {
  // À compléter
}

// ---------- Étape 4 : envoyer une commande en POST ----------
async function passerCommande(client, lignes) {
  // À compléter
}

// ---------- Exécution : ne pas modifier ----------
console.log("\nÉtape 1 – la carte");
try {
  const plats = await lireCarte();
  console.log("  Plats disponibles :", plats?.filter((p) => p.disponible).map((p) => p.nom).join(", "));
} catch (erreur) {
  console.log("  ❌", erreur.message);
}

console.log("\nÉtapes 2 et 3 – les erreurs");
for (const url of [`${API}/plats/ZZZ`, `${API}/erreur`, `${API}/pas-du-json`, "http://localhost:3999/api/plats"]) {
  try {
    const donnees = await obtenirJSON(url);
    console.log(`  ${url}\n     → pas d'erreur ?!`, donnees);
  } catch (erreur) {
    console.log(`  ${url}\n     → ${erreur.name} : ${erreur.message}\n     → pour l'utilisateur : ${messagePourUtilisateur(erreur)}`);
  }
}

console.log("\nÉtape 4 – les commandes");
try {
  const commande = await passerCommande("Koffi", [{ platId: "P01", quantite: 2 }]);
  console.log("  ✅ Commande créée :", commande);
} catch (erreur) {
  console.log("  ❌", erreur.message, erreur.details ?? "");
}
try {
  await passerCommande("Koffi", [{ platId: "P04", quantite: 1 }]);
  console.log("  ?! La commande invalide a été acceptée");
} catch (erreur) {
  console.log(`  Commande refusée (statut ${erreur.statut}) :`, erreur.message);
  for (const detail of erreur.details ?? []) console.log("     -", detail);
}
