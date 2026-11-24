// Données du restaurant « Chez John Doe » — utilisées dans tout le module.
// Les prix sont en francs CFA.

export const plats = [
  { id: "P01", nom: "Garba", categorie: "plat", prix: 1000, disponible: true, epice: true },
  { id: "P02", nom: "Alloco poisson", categorie: "plat", prix: 2000, disponible: true, epice: false },
  { id: "P03", nom: "Kedjenou de poulet", categorie: "plat", prix: 3500, disponible: true, epice: true },
  { id: "P04", nom: "Foutou sauce graine", categorie: "plat", prix: 3000, disponible: false, epice: false },
  { id: "P05", nom: "Attiéké poulet braisé", categorie: "plat", prix: 3000, disponible: true, epice: true },
  { id: "P06", nom: "Placali sauce kopè", categorie: "plat", prix: 2500, disponible: true, epice: false },
  { id: "E01", nom: "Salade d'avocat", categorie: "entree", prix: 1000, disponible: true, epice: false },
  { id: "E02", nom: "Brochettes de bœuf", categorie: "entree", prix: 1500, disponible: true, epice: true },
  { id: "B01", nom: "Bissap", categorie: "boisson", prix: 500, disponible: true, epice: false },
  { id: "B02", nom: "Gnamakoudji", categorie: "boisson", prix: 500, disponible: true, epice: true },
  { id: "B03", nom: "Eau minérale", categorie: "boisson", prix: 300, disponible: true, epice: false },
  { id: "D01", nom: "Dêguê", categorie: "dessert", prix: 700, disponible: true, epice: false },
];

export const commandes = [
  {
    id: 101,
    client: "Koffi",
    lignes: [{ platId: "P01", quantite: 2 }, { platId: "B01", quantite: 2 }],
    statut: "livree",
    adresse: { quartier: "Cocody", ville: "Abidjan" },
  },
  {
    id: 102,
    client: "Mariam",
    lignes: [{ platId: "P03", quantite: 1 }, { platId: "E02", quantite: 1 }, { platId: "B02", quantite: 1 }],
    statut: "en_preparation",
    adresse: { quartier: "Yopougon", ville: "Abidjan" },
  },
  {
    id: 103,
    client: "Koffi",
    lignes: [{ platId: "P05", quantite: 1 }],
    statut: "en_attente",
    adresse: { quartier: "Cocody", ville: "Abidjan" },
  },
  {
    id: 104,
    client: "Aya",
    lignes: [{ platId: "P02", quantite: 3 }, { platId: "D01", quantite: 3 }, { platId: "B03", quantite: 3 }],
    statut: "livree",
    adresse: { quartier: "Marcory", ville: "Abidjan" },
  },
  {
    id: 105,
    client: "Ibrahim",
    lignes: [{ platId: "P06", quantite: 2 }, { platId: "B01", quantite: 1 }],
    statut: "annulee",
    adresse: { quartier: "Plateau", ville: "Abidjan" },
  },
  {
    id: 106,
    client: "Mariam",
    lignes: [{ platId: "P01", quantite: 1 }, { platId: "E01", quantite: 1 }],
    statut: "en_attente",
    adresse: { quartier: "Yopougon", ville: "Abidjan" },
  },
];
