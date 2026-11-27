# Étape 3 : Prévoir, puis vérifier

| N°  | Prévision         | Pourquoi                                     | Juste ? |
| :-: | :---------------- | :------------------------------------------- | :-----: |
|  1  | Chez John Doe     | Accès à la variable du bloc parent.          |   Oui   |
|  2  | Erreur            | `total` est locale à la fonction.            |   Oui   |
|  3  | Abidjan           | Liée à son lieu de création, pas d'appel.    |   Oui   |
|  4  | Erreur            | `message` ne sort pas du bloc `if`.          |   Oui   |
|  5  | Bissap, Garba     | La variable locale masque l'externe.         |   Oui   |
|  6  | Erreur            | Lecture de `quantite` avant son `let`.       |   Oui   |
|  7  | 10                | La fonction interne a accès à `n` (5 * 2).   |   Oui   |
|  8  | 4, 4, 4 / 1, 2, 3 | `var` est partagée, `let` a sa propre copie. |   Oui   |
