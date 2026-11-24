// Séance 3 – Atelier 1 : dans quel ordre ?
// Écrivez votre prévision pour chaque code AVANT de lancer :
//   node seance-3/ordre.js
// (Chaque code est isolé : le suivant ne commence que lorsque le précédent est complètement fini.)

import { pause } from "../outils/verifier.js";
const log = (texte) => console.log("  " + texte);

// ---------- Code 1 ----------
function code1() {
  log("A");
  setTimeout(() => log("B"), 0);
  Promise.resolve().then(() => log("C"));
  log("D");
}

// ---------- Code 2 ----------
function code2() {
  log("1");
  setTimeout(() => log("2"), 0);
  log("3");
}

// ---------- Code 3 ----------
function code3() {
  log("début");
  Promise.resolve()
    .then(() => log("then 1"))
    .then(() => log("then 2"));
  log("fin");
}

// ---------- Code 4 ----------
function code4() {
  async function f() {
    log("f1");
    await null;
    log("f2");
  }
  log("avant");
  f();
  log("après");
}

// ---------- Code 5 ----------
function code5() {
  async function f() {
    log("Y");
  }
  log("X");
  f();
  log("Z");
}

// ---------- Code 6 ----------
function code6() {
  setTimeout(() => log("timeout 100"), 100);
  setTimeout(() => log("timeout 0"), 0);
  (async () => {
    log("go");
    await Promise.resolve();
    log("await");
  })();
  log("fini");
}

// ---------- Exécution : ne pas modifier ----------
for (const [numero, code] of [code1, code2, code3, code4, code5, code6].entries()) {
  console.log(`\n--- Code ${numero + 1} ---`);
  code();
  await pause(300);
}
