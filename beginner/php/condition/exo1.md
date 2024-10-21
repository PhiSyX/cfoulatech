# Exercice 1

## Instruction

Afficher un message différent en fonction de l'âge entré par l'utilisateur via
le terminal.

## Exemple des données

| age (readline) | opérateur | message attendu                                      |
| -------------- | --------- | ---------------------------------------------------- |
| 12             | <         | Vous avez 12 ans et vous n'êtes pas encore un adulte |
| 18             | ===       | Bienvenue à l'age adulte                             |
| 21             | >         | Vous êtes un adulte et vous avez 21 ans              |

| majorité |
| -------- |
| 18       |

## Sortie attendue

1. > Vous êtes un adulte et vous avez 21 ans

2. > Bienvenue à l'age adulte

3. > Vous avez 12 ans et vous n'êtes pas encore un adulte

## Réflexion

On a vu comment on pouvait récupérer une entrée utilisateur via la fonction
[`readline`](https://www.php.net/manual/fr/function.readline.php). On a
également vu comment on pouvait convertir cette entrée via une conversion
explicite d'une chaîne en entier [`(int)`](https://www.php.net/manual/fr/language.types.integer.php#language.types.integer.casting).

On a vu comment on pouvait comparer des valeurs avec des [opérateurs de comparaisons](https://www.php.net/manual/fr/language.operators.comparison.php).
Il me suffit de trouver le bon opérateur pour chaque cas.

## Plan d'action

Lorsque l'utilisateur entre un `<age>` correct  
Alors je vérifie si l'age `<age>` correspond à la majorité avec l'opérateur de comparaison `<opérateur>`  
Et j'affiche le message `<message attendu>`
