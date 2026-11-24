// Séance 2 – Atelier 3, étape 4 : chercher dans un tableau ou dans une Map ?
//   node seance-2/mesure.js

const NOMBRE_DE_PLATS = 100_000;
const NOMBRE_DE_RECHERCHES = 10_000;

const plats = Array.from({ length: NOMBRE_DE_PLATS }, (_, i) => ({ id: `X${i}`, nom: `Plat ${i}`, prix: 500 + (i % 50) * 100 }));
const idsCherches = Array.from({ length: NOMBRE_DE_RECHERCHES }, () => `X${Math.floor(Math.random() * NOMBRE_DE_PLATS)}`);

console.log(`${NOMBRE_DE_PLATS} plats, ${NOMBRE_DE_RECHERCHES} recherches par id\n`);

let debut = performance.now();
let total = 0;
for (const id of idsCherches) total += plats.find((p) => p.id === id).prix;
const tempsFind = performance.now() - debut;
console.log(`Tableau + find : ${tempsFind.toFixed(1)} ms`);

debut = performance.now();
const platsParId = new Map(plats.map((p) => [p.id, p])); // on construit l'index UNE fois
let total2 = 0;
for (const id of idsCherches) total2 += platsParId.get(id).prix;
const tempsMap = performance.now() - debut;
console.log(`Map + get      : ${tempsMap.toFixed(1)} ms (construction de la Map comprise)`);

console.log(`\nMêmes résultats : ${total === total2 ? "oui" : "non"}`);
console.log(`La Map est environ ${Math.round(tempsFind / tempsMap)} fois plus rapide.`);
