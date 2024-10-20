# Exercice 3 / 4

## Instruction

Afficher un message différent en fonction de l'action entré par l'utilisateur
via le terminal.

## Exemple des données

| action (readline) | message attendu     | erreur attendu                                          |
| ----------------- | ------------------- | ------------------------------------------------------- |
| 1                 | Vous attaquez       |                                                         |
| 2                 | Vous défendez       |                                                         |
| 3                 | Vous vous soignez   |                                                         |
| 4                 | Vous fuyez          |                                                         |
| 5                 | Vous ne faites rien |                                                         |
| 6                 |                     | Relancez le programme et entrez une action 1,2,3,4 ou 5 |

## Réflexion

On a vu comment on pouvait récupérer une entrée utilisateur via la fonction
[`readline`](https://www.php.net/manual/fr/function.readline.php). On a
également vu comment on pouvait convertir cette entrée via une conversion
explicite d'une chaîne en entier [`(int)`](https://www.php.net/manual/fr/language.types.integer.php#language.types.integer.casting).

On a vu comment on pouvait comparer des valeurs avec des [opérateurs de comparaisons](https://www.php.net/manual/fr/language.operators.comparison.php).
Il me suffit de trouver le bon opérateur pour chaque cas.

## Plan d'action

Lorsque l'utilisateur entre une `<action>`  
Alors je vérifie son action `<action>` avec l'opérateur de comparaison `===`  
Et j'affiche le message `<message attendu>` si c'est vrai  
Sinon j'affiche le message d'erreur `<erreur attendu>`

## Sortie attendue:

1. > Vous attaquez

2. > Vous défendez

3. > Vous vous soignez

4. > Vous fuyez

5. > Vous ne faites rien

6. > Relancez le programme et entrez une action 1,2,3,4 ou 5
