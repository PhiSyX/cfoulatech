# Exercice 2

## Instruction

Vérifier qu'un mot (sensible à la casse) s'agit d'un palindrome en vous aidant
des fonctions natives de PHP.

## Exemple des données

| mot (readline) |
| -------------- |
| "kayak"        |
| "kayaK"        |
| "hello"        |
| "radar"        |
| "lol"          |
| "coucou"       |

## Sortie attendue

| mot      | palindrome |
| -------- | ---------- |
| "kayak"  | oui        |
| "kayaK"  | non        |
| "hello"  | non        |
| "radar"  | oui        |
| "lol"    | oui        |
| "coucou" | non        |

En fonction du résultat de la comparaison `===` :

**oui**:

> "`<mot>`" s'agit d'un palindrome

**non**:

> "`<mot>`" ne s'agit pas d'un palindrome

## Réflexion

Un palindrome est un mot qui se lit de la même façon de gauche à droite que de
droite à gauche. Je dois chercher un moyen d'inverser un mot facilement. D'après
les recherches sur internet, on est tombé sur les fonctions
[`strrev`](https://www.php.net/manual/fr/function.strrev.php) qui inverse une
chaîne.

On a vu comment on pouvait comparer des valeurs avec des [opérateurs de comparaisons](https://www.php.net/manual/fr/language.operators.comparison.php).
Je dois utiliser l'opérateur de comparaison `===`.

## Plan d'action

Lorsque l'utilisateur entre le mot `<mot>`
Alors j'inverse le mot `<mot>` en les comparant en utilisant l'opérateur de comparaison `===`
Et j'affiche le message `<message attendu>` en fonction du résultat de la comparaison
