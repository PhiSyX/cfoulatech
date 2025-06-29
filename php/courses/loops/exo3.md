# Exercice 3

## Instruction

Inviter l'utilisateur à entrer des mots dans le terminale et afficher les
mots à chaque entrée, le mot "stop" permet de quitter le programme.

## Exemple des données

| mot (readline) | message attendu           | continue itération |
| -------------- | ------------------------- | ------------------ |
| "hello"        | Voici votre mot : "hello" | Oui                |
| "world"        | Voici votre mot : "world" | Oui                |
| "hey"          | Voici votre mot : "hey"   | Oui                |
| "stop"         | Voici votre mot : "stop"  | Non                |

| mot (readline) | message attendu          | continue itération |
| -------------- | ------------------------ | ------------------ |
| 0              | Voici votre mot : "stop" | Non                |

## Sortie attendue

1. > Voici votre mot : "hello"
   > Voici votre mot : "world"
   > Voici votre mot : "hey"
   > Voici votre mot : "stop"

2. > Voici votre mot : "stop"

## Réflexion

On a vu comment on pouvait récupérer une entrée utilisateur via la fonction
[`readline`](https://www.php.net/manual/fr/function.readline.php). On a
également vu comment on pouvait convertir cette entrée via une conversion
explicite d'une chaîne en entier [`(int)`](https://www.php.net/manual/fr/language.types.integer.php#language.types.integer.casting).

On a vu comment utiliser la structure de contrôle [while](https://www.php.net/manual/fr/control-structures.while.php)

## Plan d'action

Lorsqu'on invite utilisateur à entrer un mot `<mot>`
Alors je veux afficher le message "Voici votre mot : `<mot>`"
