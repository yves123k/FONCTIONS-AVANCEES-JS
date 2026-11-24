// Séance 3 – Atelier 1, étape 3 : un calcul long bloque la boucle d'événements.
//   node seance-3/bloquant.js

const debut = Date.now();
const depuis = () => `${Date.now() - debut} ms`;

setTimeout(() => console.log(`⏰ Message prévu à 500 ms… affiché à ${depuis()}`), 500);

console.log("Début d'un calcul de 3 secondes…");
while (Date.now() - debut < 3000) {
  // on « travaille » : la pile d'appels n'est jamais vide
}
console.log(`Calcul fini à ${depuis()}`);
