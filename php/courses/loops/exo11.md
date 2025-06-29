# Exercice 11

## Instruction

Inviter l'utilisateur à entrer des mots et les afficher séparés par des virgules.
**NOTE**: Le mot "stop" arrête l'enregistrement des mots, il ne doit pas être affiché.

## Exemple des données

| mot (readline) |
| -------------- |
| "hello"        |
| "world"        |
| "ça va"        |
| "super"        |
| "stop"         |

## Sortie attendue

| indice | mot attendu |
| ------ | ----------- |
| 0      | "hello"     |
| 1      | "world"     |
| 2      | "ça va"     |
| 3      | "super"     |

> hello, world, ça va, super,

## Réflexion

On a vu comment utiliser la structure de contrôle [while](https://www.php.net/manual/fr/control-structures.while.php)
et [foreach](https://www.php.net/manual/fr/control-structures.foreach.php).

## Plan d'action

Lorsqu'on invite utilisateur à entrer un mot `<mot>`
Et qu'il ne s'agisse pas du mot `stop`
Alors j'enregistre le mot `<mot>` dans le tableau `<mots>`
Et je parcours le tableau `<mots>` via une boucle `foreach` dans lequel je récupère chaque valeur `<mot>`
Ensuite j'affiche la sortie attendue: "`<mot>`, "
