# Exercice 3

## Instruction

Créer un tableau des jours de la semaine commençant à `lundi` et se terminant à
`dimanche` et afficher le jour d'aujourd'hui, d'hier et de demain, sachant
qu'aujourd'hui nous somme `lundi`.

## Exemple de `<jours de la semaine>`

| indice | jour       |
| ------ | ---------- |
| 0      | "lundi"    |
| 1      | "mardi"    |
| 2      | "mercredi" |
| 3      | "jeudi"    |
| 4      | "vendredi" |
| 5      | "samedi"   |
| 6      | "dimanche" |

| jour ajd attendu | jour hier attendu | jour demain attendu |
| ---------------- | ----------------- | ------------------- |
| "lundi"          | "dimanche"        | "mardi"             |

## Réflexion

On a vu que pour accéder à un élément d'un tableau, on doit écrire la syntaxe
suivante : `[indice]`.
On a vu que l'indice correspond à la position d'un tableau.
On a vu que la position de départ d'un tableau est de `0`, qu'il ne peut pas
aller en dessous de `0` (ex: `-1`) et qu'il ne peut pas aller au delà de la
taille d'un tableau (ex: `6` si la taille d'un tableau est de `5`), autrement
une erreur se produit.

## Plan d'action

Étant donnée que l'indice du tableau `<jours de la semaine>` commence à `0`

Et que le jour d'aujourd'hui est de `lundi` à savoir l'indice `0`  
Alors je veux afficher le `<jour>` au format de la sortie attendue

Et que le jour d'hier est `dimanche` à savoir l'indice `6`  
Alors je veux afficher le `<jour>` au format de la sortie attendue

Et que le jour de demain est `mardi` à savoir l'indice `1`  
Alors je veux afficher le `<jour>` au format de la sortie attendue

## Sortie attendue

> Aujourd'hui, nous somme `<jour ajd attendu>`  
> Hier, nous étions `<jour hier attendu>`  
> Demain, nous serons `<jour demain attendu>`
