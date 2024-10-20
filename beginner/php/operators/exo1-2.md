# Exercice 1

## Instruction

Inviter l'utilisateur à entrer une heure dans le terminal et afficher un message
différent en fonction de l'heure d'ouverture et de fermeture.

## Exemple des données

| heure (readline) | opérateur | message attendu                    |
| ---------------- | --------- | ---------------------------------- |
| 7                | <         | Le magasin sera fermé à 7 heures   |
| 9                | ===       | Le magasin sera ouvert à 9 heures  |
| 15               | ===       | Le magasin sera ouvert à 15 heures |
| 19               | >         | Le magasin sera fermé à 19 heures  |

## Réflexion

On a vu comment on pouvait récupérer une entrée utilisateur via la fonction
[`readline`](https://www.php.net/manual/fr/function.readline.php). On a
également vu comment on pouvait convertir cette entrée via une conversion
explicite d'une chaîne en entier [`(int)`](https://www.php.net/manual/fr/language.types.integer.php#language.types.integer.casting).

On a vu comment on pouvait comparer des valeurs avec des [opérateurs de comparaisons](https://www.php.net/manual/fr/language.operators.comparison.php).
Il me suffit de trouver le bon opérateur pour chaque cas.

## Plan d'action

Lorsque l'utilisateur entre un `<heure>` correct  
Alors je vérifie si l'heure `<heure>` correspond aux heures d'ouverture avec l'opérateur de comparaison `<opérateur>`  
Et j'affiche le message `<message attendu>` en fonction du résultat de la comparaison

## Sortie attendue:

1. Le magasin sera fermé à 7 heures
2. Le magasin sera ouvert à 9 heures
3. Le magasin sera ouvert à 15 heures
4. Le magasin sera fermé à 19 heures
