// Outils communs pour parler au serveur du kit (sous-module 2).
// C'est la version corrigée de l'atelier 3 de la séance 3 : vous pouvez l'importer à partir de la séance 4.

export const API = "http://localhost:3000/api";

export class ErreurHttp extends Error {
  constructor(statut, message, details = []) {
    super(message);
    this.name = "ErreurHttp";
    this.statut = statut;
    this.details = details;
  }
}

export async function obtenirJSON(url, options) {
  const reponse = await fetch(url, options);
  if (!reponse.ok) {
    const corps = await reponse.json().catch(() => null);
    throw new ErreurHttp(reponse.status, corps?.erreur ?? `Erreur HTTP ${reponse.status}`, corps?.details);
  }
  return reponse.json();
}

// Mesure la durée d'une fonction asynchrone : const { resultat, ms } = await chronometrer(() => …)
export async function chronometrer(fonction) {
  const debut = performance.now();
  const resultat = await fonction();
  return { resultat, ms: Math.round(performance.now() - debut) };
}
