// Séance 2 – Atelier 1 : destructuration, décomposition, ?. et ??
//   node seance-2/destructuration.js

import { plats, commandes } from "../donnees/menu.js";
import { verifier, bilan } from "../outils/verifier.js";

// 1. "Commande 101 – Koffi (Cocody)" — destructurez dans les paramètres
function resumerCommande(commande) {
  const {
    id,
    client,
    adresse: { quartier },
  } = commande;
  return `Commande ${id} - ${client} (${quartier})`;
}

// 2. categorie vaut "plat" et disponible vaut true par défaut
function creerPlat({ nom, prix, categorie, disponible }) {
  // À compléter
}

// 3. Une copie du plat sans la propriété id
function sansIdentifiant(plat) {
  // À compléter
}

// 4. { premier, reste }
function premierEtLeReste(liste) {
  // À compléter
}

// 5. [a, b] devient [b, a]
function echanger(paire) {
  // À compléter
}

// 6. La somme de tous les arguments
function total(...prix) {
  // À compléter
}

// 7. Les réglages par défaut, remplacés par les choix du client
function fusionnerReglages(choix) {
  // À compléter
}

// 8. Le quartier de la commande, ou "inconnu" — une seule ligne avec find, ?. et ??
function quartierDeLaCommande(liste, id) {
  // À compléter
}

// 9. Le prix le plus élevé, avec Math.max et ...
function prixLePlusEleve(liste) {
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
verifier(
  "1. resumerCommande",
  essayer(() => resumerCommande(commandes[0])),
  "Commande 101 – Koffi (Cocody)",
);
verifier(
  "2. creerPlat avec valeurs par défaut",
  essayer(() => creerPlat({ prix: 500, nom: "Jus de baobab" })),
  { nom: "Jus de baobab", prix: 500, categorie: "plat", disponible: true },
);
verifier(
  "2. creerPlat avec toutes les valeurs",
  essayer(() =>
    creerPlat({
      nom: "Thé",
      prix: 300,
      categorie: "boisson",
      disponible: false,
    }),
  ),
  { nom: "Thé", prix: 300, categorie: "boisson", disponible: false },
);
verifier(
  "3. sansIdentifiant",
  essayer(() => sansIdentifiant(plats[8])),
  {
    nom: "Bissap",
    categorie: "boisson",
    prix: 500,
    disponible: true,
    epice: false,
  },
);
verifier("3. le plat d'origine garde son id", plats[8].id, "B01");
console.log("\nÉtape 2");
verifier(
  "4. premierEtLeReste",
  essayer(() => premierEtLeReste(["a", "b", "c"])),
  { premier: "a", reste: ["b", "c"] },
);
verifier(
  "5. echanger",
  essayer(() => echanger([1, 2])),
  [2, 1],
);
verifier(
  "6. total(1000, 500, 300)",
  essayer(() => total(1000, 500, 300)),
  1800,
);
verifier(
  "6. total()",
  essayer(() => total()),
  0,
);
console.log("\nÉtape 3");
verifier(
  "7. fusionnerReglages",
  essayer(() => fusionnerReglages({ piment: "fort", couverts: 2 })),
  { livraison: true, couverts: 2, piment: "fort" },
);
verifier(
  "8. quartier de la commande 104",
  essayer(() => quartierDeLaCommande(commandes, 104)),
  "Marcory",
);
verifier(
  "8. commande inconnue",
  essayer(() => quartierDeLaCommande(commandes, 999)),
  "inconnu",
);
verifier(
  "9. prixLePlusEleve",
  essayer(() => prixLePlusEleve(plats)),
  3500,
);
bilan();
