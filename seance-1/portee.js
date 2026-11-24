// Séance 1 – Atelier 1 : prévoir, puis vérifier.
// Pour chaque code : écrivez votre prévision dans le tableau du support AVANT de lancer
//   node seance-1/portee.js

console.log("\n--- Code 1 ---");
{
  const restaurant = "Chez John Doe";
  function afficher() {
    console.log(restaurant);
  }
  afficher();
}

console.log("\n--- Code 2 ---");
try {
  function calculer() {
    const total = 3500;
    return total;
  }
  calculer();
  console.log(total);
} catch (e) {
  console.log("Erreur :", e.message);
}

console.log("\n--- Code 3 ---");
{
  const ville = "Abidjan";
  function afficherVille() {
    console.log(ville);
  }
  function livrer() {
    const ville = "Bouaké";
    afficherVille();
  }
  livrer();
}

console.log("\n--- Code 4 ---");
try {
  const total = 4000;
  if (total > 3000) {
    const message = "Livraison offerte";
  }
  console.log(message);
} catch (e) {
  console.log("Erreur :", e.message);
}

console.log("\n--- Code 5 ---");
{
  let boisson = "Garba";
  function commander() {
    let boisson = "Bissap";
    console.log(boisson);
  }
  commander();
  console.log(boisson);
}

console.log("\n--- Code 6 ---");
try {
  console.log(quantite);
  let quantite = 2;
} catch (e) {
  console.log("Erreur :", e.message);
}

console.log("\n--- Code 7 ---");
{
  function exterieure(n) {
    function interieure() {
      return n * 2;
    }
    return interieure();
  }
  console.log(exterieure(5));
}

console.log("\n--- Code 8 ---");
for (var i = 1; i <= 3; i++) {
  setTimeout(() => console.log("var :", i), 100);
}
for (let j = 1; j <= 3; j++) {
  setTimeout(() => console.log("let :", j), 200);
}
