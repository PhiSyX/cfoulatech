# Exercice 1

## Instruction

Calculer la `<moyenne>` du tableau des `<notes>`.

## Exemple des données

### Tableau `<notes>`

| indice | note |
| ------ | ---- |
| 0      | 18   |
| 1      | 13   |
| 2      | 5    |
| 3      | 9    |
| 4      | 10   |

| taille des notes |
| ---------------- |
| 5                |

## Sortie attendue

| somme attendu | moyenne attendu |
| ------------- | --------------- |
| 55            | 11              |

> La somme des notes est `<somme attendu>`
> La moyenne des notes est de `<moyenne attendu>`

## Réflexion

On a vu que pour accéder à un élément d'un tableau, on doit écrire la syntaxe
suivante : `[indice]`.
On a vu que l'indice correspond à la position d'un tableau.
On a vu que la position de départ d'un tableau est de `0`, qu'il ne peut pas
aller en dessous de `0` (ex: `-1`) et qu'il ne peut pas aller au delà de la
taille d'un tableau (ex: `6` si la taille d'un tableau est de `5`), autrement
une erreur se produit.

On a vu les [opérateurs arithmétiques](https://www.php.net/manual/fr/language.operators.arithmetic.php)
qui nous permettent entre autres d'additionner (`+`) et de diviser (`/`).

## Plan d'action

Lorsqu'on accède à un élément du tableau des `<notes>` via l'indice `<indice>`
Alors je veux l'additionner à l'élément qui suit, à savoir: `<indice> + 1`
Et je veux diviser (`/`) la `<somme attendu>` obtenue par la `<taille des notes>`
Afin d'obtenir la moyenne de `<moyenne attendu>`
Alors j'affiche la sortie attendue
