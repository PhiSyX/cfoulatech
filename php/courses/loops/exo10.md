# Exercice 10

## Instruction

Afficher un message différent en fonction des notes

## Exemple des données

### Tableau `<notes>`

| indice | note |
| ------ | ---- |
| 0      | 18   |
| 1      | 13   |
| 2      | 5    |
| 3      | 9    |
| 4      | 10   |

## Sortie attendue

| note | opérateur |
| ---- | --------- |
| 18   | >         |
| 13   | >         |
| 5    | <         |
| 9    | <         |
| 10   | ===       |

| score attendu | moitié du score |
| ------------- | --------------- |
| 20            | 10              |

En fonction du résultat de comparaison par l'opérateur `<opérateur>`

**===** (`<note>` égal à la `<moitié du score>`):

> Tu as eu tout pile `<note>`/`<moitié du score>` !

**>** (`<note>` supérieur à la `<moitié du score>`):

> Tu as réussi avec la note de `<note>`/`<moitié du score>` !

**<** (`<note>` inférieur à la `<moitié du score>`):

> Tu as raté avec la note de `<note>`/`<moitié du score>` !

## Réflexion

On a vu comment utiliser la structure de contrôle [foreach](https://www.php.net/manual/fr/control-structures.foreach.php).

## Plan d'action

Étant donné que j'utilise une boucle foreach sur le tableau `<notes>`
Et que je veux récupérer chaque valeur `<note>`
Alors je veux comparer la note `<note>` avec `<moitié du score>` avec l'opérateur `<opérateur>`
Et afficher le message de sortie en fonction du résultat de la comparaison
