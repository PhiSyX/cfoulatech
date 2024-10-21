# Exercice 5

## Instruction

Calculer la `<moyenne>` du tableau des `<notes>` en utilisant les fonctions
natives de PHP.

## Exemple des données

### Tableau `<notes>`

| indice | valeur |
| ------ | ------ |
| 0      | 18     |
| 1      | 13     |
| 2      | 5      |
| 3      | 9      |
| 4      | 10     |

## Sortie attendue

| taille des notes attendu | somme attendu | moyenne attendu |
| ------------------------ | ------------- | --------------- |
| 5                        | 55            | 11              |

> La somme des notes est `<somme attendu>`  
> La moyenne des notes est de `<moyenne attendu>`

## Réflexion

Il n'y a pas de fonctions déjà toute faites en PHP nous permettant de calculer
une moyenne. Ceci étant dit, d'après les recherches sur internet, on est tombé
sur les fonctions
[`array_sum`](https://www.php.net/manual/fr/function.array-sum.php) pour faire
la somme de chaque entier d'un tableau, et
[`count`](https://www.php.net/manual/fr/function.count.php) pour avoir le total
des éléments d'un tableau.

On a vu les [opérateurs arithmétiques](https://www.php.net/manual/fr/language.operators.arithmetic.php)
qui nous permettent entre autres de diviser (`/`).

## Plan d'action

Lorsqu'on utilise la fonction `array_sum` sur le tableau des `<notes>`  
Et que ce résultat nous donne bien `<somme attendu>`  
Alors je veux la diviser par la taille des `<notes>` en utilisant la fonction native `count`  
Et que ce résultat nous donne bien `<taille des notes attendu>`  
Afin d'obtenir la moyenne de `<moyenne attendu>`  
Alors j'affiche le messages de la sortie attendue
