# Exercice 2

## Instruction

Trouver le nombre aléatoire entre 0 et 10 à chaque entrée de l'utilisateur.

## Exemple des données

| nombre (readline) | message attendu        | continue itération |
| ----------------- | ---------------------- | ------------------ |
| 1                 | Voici votre nombre : 1 | Oui                |
| 2                 | Voici votre nombre : 2 | Oui                |
| 3                 | Voici votre nombre : 3 | Non                |

| nombre (readline) | message attendu        | continue itération |
| ----------------- | ---------------------- | ------------------ |
| 3                 | Voici votre nombre : 0 | Non                |

## Sortie attendue

| nombre aléatoire |
| ---------------- |
| 3                |

1. > Mauvais numéro, vous n'avez pas gagné !
   >
   > Mauvais numéro, vous n'avez pas gagné !
   >
   > Bravo !!!  
   > Vous avez enfin trouvé le numéro gagnant !  
   > C'était bien le numéro <nombre aléatoire> :-)

2. > Bravo !!!  
   > Vous avez enfin trouvé le numéro gagnant !  
   > C'était bien le numéro <nombre aléatoire> :-)

## Réflexion

On a vu comment on pouvait récupérer une entrée utilisateur via la fonction
[`readline`](https://www.php.net/manual/fr/function.readline.php). On a
également vu comment on pouvait convertir cette entrée via une conversion
explicite d'une chaîne en entier [`(int)`](https://www.php.net/manual/fr/language.types.integer.php#language.types.integer.casting).

On a vu comment utiliser la structure de contrôle [while](https://www.php.net/manual/fr/control-structures.while.php)

## Plan d'action

Lorsqu'on invite utilisateur à entrer un nombre `<nombre>` correct  
Alors je veux afficher le message "Voici votre nombre : `<nombre>`"
