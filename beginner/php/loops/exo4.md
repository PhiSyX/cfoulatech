# Exercice 4

## Instruction

Afficher les jours de la semaine en utilisant une boucle `for`

## Exemple des `<jours de la semaine>`

| indice | jour       |
| ------ | ---------- |
| 0      | "Lundi"    |
| 1      | "Mardi"    |
| 2      | "Mercredi" |
| 3      | "Jeudi"    |
| 4      | "Vendredi" |
| 5      | "Samedi"   |
| 6      | "Dimanche" |

## Sortie attendue

> "Lundi"  
> "Mardi"  
> "Mercredi"  
> "Jeudi"  
> "Vendredi"  
> "Samedi"  
> "Dimanche"

## Réflexion

On a vu comment on pouvait compter le nombre total des éléments d'un tableau via
la fonction [`count`](https://www.php.net/manual/fr/function.count.php).

On a vu comment utiliser la structure de contrôle [for](https://www.php.net/manual/fr/control-structures.for.php)

## Plan d'action

Étant donné que la boucle for, prend un compteur (`<indice>`) à une initialisation à 0  
Et que la condition de **sortie** est que le compteur `<indice>` soit `>=` au nombre total des éléments du tableau `<jours de la semaine>` en utilisant la fonction `count`  
Et qu'il s'agisse d'une itération incrémentale  
Alors je veux afficher le jour de la semaine `<jour>` en fonction du compteur qui représente l'indice `<indice>`
