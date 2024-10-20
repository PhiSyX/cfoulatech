# Exercice 2

## Instruction

Afficher un message différent en fonction du genre entré par l'utilisateur via
le terminal.

## Exemple des données

| genre (readline) | message attendu       | erreur attendu                                       |
| ---------------- | --------------------- | ---------------------------------------------------- |
| M                | Vous êtes un homme    |                                                      |
| F                | Vous êtes une femme   |                                                      |
| X                | Vous êtes non binaire |                                                      |
| K                |                       | Erreur, vous n'avez pas introduis les bonnes valeurs |

## Réflexion

On a vu comment on pouvait récupérer une entrée utilisateur via la fonction
[`readline`](https://www.php.net/manual/fr/function.readline.php).

On a vu comment on pouvait comparer des valeurs avec des [opérateurs de comparaisons](https://www.php.net/manual/fr/language.operators.comparison.php).
Il me suffit de trouver le bon opérateur pour chaque cas.

## Plan d'action

Lorsque l'utilisateur entre un `<age>` correct  
Alors je vérifie sa majorité avec l'opérateur de comparaison `===`  
Et j'affiche le message `<message attendu>` si c'est vrai  
Sinon j'affiche le message d'erreur `<erreur attendu>`

## Sortie attendue:

1. > Vous êtes un homme

2. > Vous êtes une femme

3. > Vous êtes non binaire

4. > Erreur, vous n'avez pas introduis les bonnes valeurs
