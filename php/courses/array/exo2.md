# Exercice 2

## Instruction

Afficher le 2ème `<animal>` et le 4ème `<animal>` de la liste des `<animaux>`.

## Exemple des données

### Tableau `<animaux>`

| indice | animal     |
| ------ | ---------- |
| 0      | "chien"    |
| 1      | "chat"     |
| 2      | "éléphant" |
| 3      | "tortue"   |

## Sortie attendue

| animal attendu |
| -------------- |
| "chat"         |
| "tortue"       |

> Le 2ème animal est : `<animal attendu>`
> Le 4ème animal est : `<animal attendu>`

## Réflexion

On a vu que pour accéder à un élément d'un tableau, on doit écrire la syntaxe
suivante : `[indice]`.
On a vu que l'indice correspond à la position d'un tableau.
On a vu que la position de départ d'un tableau est de `0`, qu'il ne peut pas
aller en dessous de `0` (ex: `-1`) et qu'il ne peut pas aller au delà de la
taille d'un tableau (ex: `6` si la taille d'un tableau est de `5`), autrement
une erreur se produit.

## Plan d'action

Étant donnée que l'indice du tableau `<animaux>` commence à `0`

Et que je veux afficher le `2ème` `<animal>`
Alors je dois accéder l'indice `1` du tableau `<animaux>`
Et ensuite afficher au format de la sortie attendue.

Et que je veux afficher le `4ème` `<animal>`
Alors je dois accéder l'indice `3` du tableau `<animaux>`
Et ensuite afficher au format de la sortie attendue.
