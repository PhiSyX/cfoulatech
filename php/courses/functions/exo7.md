# Exercice 7 et 8

## Instruction

Trier un tableau de manière croissante et décroissante en utilisant les
fonctions natives de PHP.

## Exemple des données

### Tableau `<notes>`

| indice | note |
| ------ | ---- |
| 0      | 18   |
| 1      | 13   |
| 2      | 5    |
| 3      | 9    |
| 4      | 10   |

### Tableau `<notes_croissantes>`

| indice | note |
| ------ | ---- |
| 1      | 5    |
| 2      | 9    |
| 3      | 10   |
| 4      | 13   |
| 5      | 18   |

### Tableau `<notes_décroissantes>`

| indice | note |
| ------ | ---- |
| 0      | 18   |
| 1      | 13   |
| 2      | 10   |
| 3      | 9    |
| 4      | 5    |

## Sortie attendue

1. > 5 9 10 13 18

2. > 18 13 10 9 5

## Réflexion

D'après les recherches sur internet, on est tombé sur les fonctions
[`sort`](https://www.php.net/manual/fr/function.sort.php) pour trier les
éléments d'un tableau de manière croissante, et
[`rsort`](https://www.php.net/manual/fr/function.rsort.php) pour trier les
éléments d'un tableau de manière décroissante.

On a vu la structure de contrôle [foreach](https://www.php.net/manual/fr/control-structures.foreach.php)
nous permettant d'itérer sur un tableau facilement.

## Plan d'action

Étant donné que la fonction `sort` sur le tableau des `<notes>` trie les éléments d'un tableau
Lorsque j'affiche le `1er` élément du tableau `<notes_croissantes>`
Alors je veux que cela correspond au `3ème` élément du tableau des `<notes>`
Et j'affiche la sortie attendue avec un `foreach`

Étant donné que la fonction `rsort` sur le tableau des `<notes>` trie les éléments d'un tableau
Lorsque j'affiche le `1er` élément du tableau `<notes_décroissantes>`
Alors je veux que cela correspond au `1er` élément du tableau des `<notes>`
Et j'affiche la sortie attendue avec un `foreach`
