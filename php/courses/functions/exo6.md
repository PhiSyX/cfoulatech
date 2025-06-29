# Exercice 6

## Instruction

Inverser un tableau en utilisant les fonctions natives de PHP.

## Exemple des données

### Tableau `<notes>`

| indice | valeur |
| ------ | ------ |
| 0      | 18     |
| 1      | 13     |
| 2      | 5      |
| 3      | 9      |
| 4      | 10     |

## Tableau `<notes_inversées>`

| indice | valeur |
| ------ | ------ |
| 0      | 10     |
| 1      | 9      |
| 2      | 5      |
| 3      | 13     |
| 4      | 18     |

## Sortie attendue

> 10 9 5 13 18

## Réflexion

D'après les recherches sur internet, on est tombé sur les fonctions
[`array_reverse`](https://www.php.net/manual/fr/function.array-reverse.php) pour
inverser les éléments d'un tableau.

On a vu la structure de contrôle [foreach](https://www.php.net/manual/fr/control-structures.foreach.php)
nous permettant d'itérer sur un tableau facilement.

## Plan d'action

Étant donné que la fonction `array_reverse` sur le tableau des `<notes>` inverse les éléments d'un tableau
Lorsque j'affiche le `1er` élément du tableau `<notes_inversées>`
Alors je veux que cela correspond au dernier élément du tableau des `<notes>`
Et j'affiche la sortie sortie attendue avec un `foreach`
