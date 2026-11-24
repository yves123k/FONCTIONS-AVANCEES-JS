// Serveur d'entraînement « Chez John Doe » — sous-module 2 (asynchronisme).
//
// Lancement (dans un terminal à part, à laisser ouvert) :
//   node serveur/serveur.js
//
// Aucun paquet à installer : seulement Node.js (version 26 LTS conseillée, 24 au minimum).
// Le serveur répond sur http://localhost:3000. Certaines routes sont volontairement
// lentes ou en panne, pour s'entraîner aux délais, aux nouvelles tentatives et à l'annulation.
// Chaque requête est affichée dans ce terminal : regardez-le pendant les ateliers !

import http from "node:http";
import { plats, commandes } from "../donnees/menu.js";

const PORT = Number(process.env.PORT) || 3000;
const nouvellesCommandes = [];
const compteursInstables = new Map(); // clé -> nombre d'échecs déjà renvoyés

const ROUTES = `
  GET  /api/plats                 la carte (≈ 0,3 s)
  GET  /api/plats/:id             un plat, ou 404
  GET  /api/commandes             les commandes (≈ 0,3 s)
  GET  /api/commandes/:id         une commande, ou 404
  POST /api/commandes             créer une commande (JSON), 201 ou 400
  GET  /api/stock/:id             le stock d'un plat (≈ 0,8 s)
  GET  /api/lent?ms=3000          répond après ms millisecondes
  GET  /api/instable?echecs=2     échoue (503) les « echecs » premières fois, puis répond
  GET  /api/aleatoire             échoue une fois sur deux (503)
  GET  /api/recherche?q=garba     recherche un plat ; plus q est court, plus c'est lent
  GET  /api/erreur                erreur serveur (500)
  GET  /api/pas-du-json           répond du HTML au lieu du JSON`;

const heure = () => new Date().toISOString().slice(11, 23);
const sansAccents = (t) => t.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

function envoyer(res, statut, corps, type = "application/json; charset=utf-8") {
  if (res.writableEnded || res.destroyed) return;
  res.writeHead(statut, {
    "Content-Type": type,
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
  });
  res.end(typeof corps === "string" ? corps : JSON.stringify(corps, null, 2));
}

// Répond après « ms » millisecondes — sauf si le client est parti avant
function plusTard(res, ms, action) {
  const minuteur = setTimeout(action, ms);
  res.on("close", () => clearTimeout(minuteur));
}

function lireCorps(req) {
  return new Promise((resolve, reject) => {
    let texte = "";
    req.on("data", (morceau) => (texte += morceau));
    req.on("end", () => {
      try {
        resolve(texte ? JSON.parse(texte) : {});
      } catch {
        reject(new Error("Le corps de la requête n'est pas du JSON valide"));
      }
    });
  });
}

function validerCommande(c) {
  const erreurs = [];
  if (typeof c.client !== "string" || c.client.trim() === "") erreurs.push("client : obligatoire");
  if (!Array.isArray(c.lignes) || c.lignes.length === 0) erreurs.push("lignes : au moins une ligne");
  for (const [i, l] of (Array.isArray(c.lignes) ? c.lignes : []).entries()) {
    const plat = plats.find((p) => p.id === l.platId);
    if (!plat) erreurs.push(`lignes[${i}] : plat inconnu (${l.platId})`);
    else if (!plat.disponible) erreurs.push(`lignes[${i}] : ${plat.nom} n'est pas disponible`);
    if (!Number.isInteger(l.quantite) || l.quantite < 1) erreurs.push(`lignes[${i}] : quantité invalide`);
  }
  return erreurs;
}

async function traiter(req, res) {
  const url = new URL(req.url, `http://localhost:${PORT}`);
  const chemin = url.pathname.replace(/\/$/, "");
  const morceaux = chemin.split("/").filter(Boolean); // ["api", "plats", "P01"]
  const [, ressource, id] = morceaux;

  if (req.method === "OPTIONS") return envoyer(res, 204, "");
  if (chemin === "" || chemin === "/api") return envoyer(res, 200, `Serveur Chez John Doe\n${ROUTES}\n`, "text/plain; charset=utf-8");
  if (morceaux[0] !== "api") return envoyer(res, 404, { erreur: "Route inconnue" });

  if (req.method === "POST" && ressource === "commandes" && !id) {
    let corps;
    try {
      corps = await lireCorps(req);
    } catch (e) {
      return envoyer(res, 400, { erreur: e.message });
    }
    const erreurs = validerCommande(corps);
    if (erreurs.length) return plusTard(res, 300, () => envoyer(res, 400, { erreur: "Commande invalide", details: erreurs }));
    const commande = { id: 200 + nouvellesCommandes.length + 1, client: corps.client.trim(), lignes: corps.lignes, statut: "en_attente" };
    nouvellesCommandes.push(commande);
    return plusTard(res, 300, () => envoyer(res, 201, commande));
  }

  if (req.method !== "GET") return envoyer(res, 405, { erreur: "Méthode non autorisée" });

  switch (ressource) {
    case "plats":
      if (!id) return plusTard(res, 300, () => envoyer(res, 200, plats));
      return plusTard(res, 300, () => {
        const plat = plats.find((p) => p.id === id.toUpperCase());
        plat ? envoyer(res, 200, plat) : envoyer(res, 404, { erreur: `Plat ${id} introuvable` });
      });

    case "commandes": {
      const toutes = [...commandes, ...nouvellesCommandes];
      if (!id) return plusTard(res, 300, () => envoyer(res, 200, toutes));
      return plusTard(res, 300, () => {
        const commande = toutes.find((c) => c.id === Number(id));
        commande ? envoyer(res, 200, commande) : envoyer(res, 404, { erreur: `Commande ${id} introuvable` });
      });
    }

    case "stock":
      return plusTard(res, 800, () => {
        const plat = plats.find((p) => p.id === String(id).toUpperCase());
        if (!plat) return envoyer(res, 404, { erreur: `Plat ${id} introuvable` });
        const quantite = plat.disponible ? (plat.id.charCodeAt(2) * 7) % 25 + 3 : 0;
        envoyer(res, 200, { platId: plat.id, quantite });
      });

    case "lent": {
      const ms = Math.min(Number(url.searchParams.get("ms")) || 3000, 60000);
      return plusTard(res, ms, () => envoyer(res, 200, { message: `Réponse après ${ms} ms` }));
    }

    case "instable": {
      const cle = url.searchParams.get("cle") || "defaut";
      const echecs = Number(url.searchParams.get("echecs") ?? 2);
      const deja = compteursInstables.get(cle) || 0;
      if (deja < echecs) {
        compteursInstables.set(cle, deja + 1);
        return plusTard(res, 200, () => envoyer(res, 503, { erreur: `Service indisponible (échec ${deja + 1} sur ${echecs})` }));
      }
      compteursInstables.delete(cle); // on repart de zéro pour le prochain essai
      return plusTard(res, 200, () => envoyer(res, 200, { message: `Réussi après ${echecs} échec(s)` }));
    }

    case "aleatoire":
      return plusTard(res, 200, () =>
        Math.random() < 0.5 ? envoyer(res, 503, { erreur: "Service indisponible, réessayez" }) : envoyer(res, 200, { message: "OK" }),
      );

    case "recherche": {
      const q = sansAccents(url.searchParams.get("q") || "");
      const ms = q.length <= 1 ? 1500 : q.length === 2 ? 900 : 300;
      const resultats = plats.filter((p) => sansAccents(p.nom).includes(q)).map(({ id: platId, nom, prix }) => ({ id: platId, nom, prix }));
      return plusTard(res, ms, () => envoyer(res, 200, { q, resultats }));
    }

    case "erreur":
      return plusTard(res, 200, () => envoyer(res, 500, { erreur: "Erreur interne du serveur" }));

    case "pas-du-json":
      return plusTard(res, 200, () => envoyer(res, 200, "<html><body>Maintenance en cours</body></html>", "text/html; charset=utf-8"));

    default:
      return envoyer(res, 404, { erreur: "Route inconnue" });
  }
}

const serveur = http.createServer((req, res) => {
  const debut = Date.now();
  console.log(`[${heure()}] → ${req.method} ${req.url}`);
  res.on("close", () => {
    const duree = Date.now() - debut;
    if (res.writableFinished) console.log(`[${heure()}] ← ${res.statusCode} ${req.method} ${req.url} (${duree} ms)`);
    else console.log(`[${heure()}] ⛔ ${req.method} ${req.url} annulée par le client après ${duree} ms`);
  });
  traiter(req, res).catch((e) => envoyer(res, 500, { erreur: e.message }));
});

serveur.listen(PORT, () => {
  console.log(`🍲 Serveur Chez John Doe prêt sur http://localhost:${PORT}`);
  console.log(ROUTES);
  console.log("\nCtrl + C pour arrêter.\n");
});
