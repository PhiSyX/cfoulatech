# Exercice 4

## Instruction

Afficher tous les éléments du tableau, mais n'afficher uniquement le jour d'hier
en sachant qu'aujourd'hui nous somme `Vendredi`.

## Exemple de `<tab2dim>` et `<jours de la semaine>`

### `<tab2dim>`

| indice | valeur                  |
| ------ | ----------------------- |
| 0      | "James"                 |
| 1      | "Bond"                  |
| 2      | "M"                     |
| 3      | "07-07-2007"            |
| 4      | `<jours de la semaine>` |
| 5      | "Londres"               |

### `<jours de la semaine>`

| indice | jour       |
| ------ | ---------- |
| 0      | "lundi"    |
| 1      | "mardi"    |
| 2      | "mercredi" |
| 3      | "jeudi"    |
| 4      | "vendredi" |
| 5      | "samedi"   |
| 6      | "dimanche" |

| prénom attendu | nom attendu | genre attendu | date naissance attendu | jour hier attendu | ville attendu |
| -------------- | ----------- | ------------- | ---------------------- | ----------------- | ------------- |
| "James"        | "Bond"      | "M"           | "07-7-2007"            | "jeudi"           | "Londres"     |

## Réflexion

On a vu que pour accéder à un élément d'un tableau, on doit écrire la syntaxe
suivante : `[indice]`.
On a vu que l'indice correspond à la position d'un tableau.
On a vu que la position de départ d'un tableau est de `0`, qu'il ne peut pas
aller en dessous de `0` (ex: `-1`) et qu'il ne peut pas aller au delà de la
taille d'un tableau (ex: `6` si la taille d'un tableau est de `5`), autrement
une erreur se produit.

On a également vu qu'un tableau peut contenir un tableau, et que pour accéder
à ces tableaux, il s'agit de la même notation, à savoir: `[indiceT1][indiceT2]`

## Plan d'action

Étant donnée que l'indice du tableau `<tab2dim>` commence à `0`  
Étant donnée que l'indice du tableau `<jours de la semaine>` commence à `0`

Lorsque j'accède à l'indice `0` du tableau `<tab2dim>` j'obtiens une valeur `<valeur>`  
Et que la valeur `<valeur>` corresponde bien `<prénom attendu>`  
Alors je veux afficher la valeur `<valeur>` au format de la sortie attendue

Lorsque j'accède à l'indice `1` du tableau `<tab2dim>` j'obtiens une valeur `<valeur>`  
Et que la valeur `<valeur>` corresponde bien `<nom attendu>`  
Alors je veux afficher la valeur `<valeur>` au format de la sortie attendue

Lorsque j'accède à l'indice `2` du tableau `<tab2dim>` j'obtiens une valeur `<valeur>`  
Et que la valeur `<valeur>` corresponde bien `<genre attendu>`  
Alors je veux afficher la valeur `<valeur>` au format de la sortie attendue

Lorsque j'accède à l'indice `3` du tableau `<tab2dim>` j'obtiens une valeur `<valeur>`  
Et que la valeur `<valeur>` corresponde bien `<date naissance attendu>`  
Alors je veux afficher la valeur `<valeur>` au format de la sortie attendue

Lorsque j'accède à l'indice `4` du tableau `<tab2dim>` j'obtiens une valeur `<valeur>`  
Et que j'accède à l'indice `3` de cette valeur `<valeur>`
Et que le jour `<jour>` correspond bien `<jour hier attendu>`  
Alors je veux afficher la valeur `<jour>` au format de la sortie attendue

Lorsque j'accède à l'indice `5` du tableau `<tab2dim>` j'obtiens une valeur `<valeur>`  
Et que la valeur `<valeur>` corresponde bien `<ville attendu>`  
Alors je veux afficher la valeur `<valeur>` au format de la sortie attendue

## Sortie attendue

> Prénom: `<prénom attendu>`  
> Nom: `<nom attendu>`  
> Genre: `<genre attendu>`  
> Date de naissance: `<date naissance attendu>`  
> Jour d'hier: `<jour hier attendu>`
> Ville: `<ville attendu>`
