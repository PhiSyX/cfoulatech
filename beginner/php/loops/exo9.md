# Exercice 9

## Instruction

Afficher les mois séparés par des tirets en utilisant une boucle `foreach`.

**NOTE**: Il NE DOIT PAS y avoir un tiret à la suite de décembre.

## Exemple des données

### Tableau `<mois de l'année>`

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

| taille des mois de l'année |
| -------------------------- |
| 12                         |

> Janvier - Février - Mars - Avril - Mai - Juin - Juillet - Août - Septembre - Octobre - Novembre - Décembre

## Réflexion

On a vu comment on pouvait compter le nombre total des éléments d'un tableau via
la fonction [`count`](https://www.php.net/manual/fr/function.count.php).

On a vu comment utiliser la structure de contrôle [foreach](https://www.php.net/manual/fr/control-structures.foreach.php).

## Plan d'action

Étant donné que j'utilise une boucle foreach sur le tableau `<mois de l'année>`  
Et que je veux récupérer chaque indice `<indice>` et chaque valeur `<mois>`  
Alors je veux afficher le mois de l'année `<mois>`
Et afficher un tiret uniquement si l'indice `<indice>` n'est pas égal à la `<taille des mois de l'année>`
