# Exercice 5

## Instruction

Afficher tous les mois à partir du mois de Février en utilisant une boucle
`while` ou `for`

## Exemple des `<mois de l'année>`

| indice | mois        |
| ------ | ----------- |
| 0      | "Janvier"   |
| 1      | "Février"   |
| 2      | "Mars"      |
| 3      | "Avril"     |
| 4      | "Mai"       |
| 5      | "Juin"      |
| 6      | "Juillet"   |
| 7      | "Août"      |
| 8      | "Septembre" |
| 9      | "Octobre"   |
| 10     | "Novembre"  |
| 11     | "Décembre"  |

## Sortie attendue

> Février Avril Juin Août Octobre Décembre

## Réflexion

On a vu comment on pouvait compter le nombre total des éléments d'un tableau via
la fonction [`count`](https://www.php.net/manual/fr/function.count.php).

On a vu comment utiliser la structure de contrôle [for](https://www.php.net/manual/fr/control-structures.for.php)
et [while](https://www.php.net/manual/fr/control-structures.while.php)

Les boucles `while` et `for` s'effectuent tant que la condition est vraie.

Étant donné que j'effectue une opération sur un tableau, je préfère utiliser la
boucle `for`, car j'ai besoin d'une compteur qui va me servir de condition de
sortie, qui serait que le compteur soit supérieur ou égal au nombre total des
éléments du tableau des `<mois de l'année>`.

## Plan d'action

Étant donné que j'utilise une boucle for avec un compteur initial à `1`  
Et que l'étape d'incrémentation se fait par `2`  
Alors je veux afficher le mois de l'année `<mois>` en fonction du compteur qui représente l'indice `<indice>` du tableau `<mois de l'année>`
