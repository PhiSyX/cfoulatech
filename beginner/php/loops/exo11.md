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

### Résultat attendu `<mots>`

| indice | mot attendu |
| ------ | ----------- |
| 0      | "hello"     |
| 1      | "world"     |
| 2      | "ça va"     |
| 3      | "super"     |

## Réflexion

On a vu comment utiliser la structure de contrôle [while](https://www.php.net/manual/fr/control-structures.while.php)
et [foreach](https://www.php.net/manual/fr/control-structures.foreach.php).

## Plan d'action

Lorsqu'on invite utilisateur à entrer un mot `<mot>`  
Alors s'il ne s'agit pas du mot `stop`, j'enregistre le mot `<mot>` dans le tableau `<mots>`  
Ensuite je parcours le tableau `<mots>` via une boucle `foreach`  
Dans lequel je récupère chaque valeur `<mot>`  
Et que j'affiche "`<mot>`, "

## Sortie attendue:

> hello, world, ça va, super,
