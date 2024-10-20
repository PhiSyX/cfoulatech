# Exercice 1

## Instruction

Inviter l'utilisateur à entrer des entiers dans le terminale et afficher les
nombres à chaque entrée.

## Exemple des données

| nombre (readline) | message attendu        | continue itération |
| ----------------- | ---------------------- | ------------------ |
| 1                 | Voici votre nombre : 1 | Oui                |
| 2                 | Voici votre nombre : 2 | Oui                |
| 3                 | Voici votre nombre : 3 | Oui                |
| 0                 | Voici votre nombre : 0 | Non                |

| nombre (readline) | message attendu        | continue itération |
| ----------------- | ---------------------- | ------------------ |
| 0                 | Voici votre nombre : 0 | Non                |

## Réflexion

On a vu comment on pouvait récupérer une entrée utilisateur via la fonction
[`readline`](https://www.php.net/manual/fr/function.readline.php). On a
également vu comment on pouvait convertir cette entrée via une conversion
explicite d'une chaîne en entier [`(int)`](https://www.php.net/manual/fr/language.types.integer.php#language.types.integer.casting).

On a vu comment utiliser la structure de contrôle [do {} while;](https://www.php.net/manual/fr/control-structures.do.while.php)

## Plan d'action

Lorsqu'on invite utilisateur à entrer un nombre `<nombre>` correct  
Alors je veux afficher le message "Voici la valeur min : `<minimale attendu>`"

## Sortie attendue:

1. > Voici votre nombre : 1
   > Voici votre nombre : 2
   > Voici votre nombre : 3
   > Voici votre nombre : 0

2. > Voici votre nombre : 0
