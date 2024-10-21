# Exercice 2

## Instruction

Affichez les prénoms les-uns en dessous des autres avec une boucle.

## Exemple des données

| `$variable` | prénom        |
| ----------- | ------------- |
| `$prénom1`  | "Mike"        |
| `$prénom2`  | "Say"         |
| `$prénom3`  | "Erica"       |
| `$prénom4`  | "Jérémie"     |
| `$prénom5`  | "Timothy"     |
| `$prénom6`  | "Maxime"      |
| `$prénom7`  | "Carina"     |
| `$prénom8`  | "Zakaria"      |
| `$prénom9`  | "Clovis"      |
| `$prénom10` | "Mohamed-Ali" |

### Tableau `<prénoms>`

| indice | valeur      |
| ------ | ----------- |
| 0      | `$prénom1`  |
| 1      | `$prénom2`  |
| 2      | `$prénom3`  |
| 3      | `$prénom4`  |
| 4      | `$prénom5`  |
| 5      | `$prénom6`  |
| 6      | `$prénom7`  |
| 7      | `$prénom8`  |
| 8      | `$prénom9`  |
| 9      | `$prénom10` |

## Réflexion

Mon premier besoin est de réfléchir à comment je peux utiliser des variables
individuelles dans une boucle. On a vu que pour grouper des variables
individuelles, on peut utiliser des [tableaux](https://www.php.net/manual/fr/language.types.array.php).

Mon second besoin est de trouver le meilleur moyen de parcourir ces données. On
a appris qu'il existe plusieurs façons de parcourir un tableau de manière
précise étant donnée que l'on connaît la taille de mon tableau via la fonction
[`sizeof`](https://www.php.net/manual/fr/function.sizeof.php).

Les boucles qui se présentent à moi sont donc :

1. La boucle "POUR": `for`
2. La boucle "POUR CHAQUE": `foreach`

Il me reste à choisir parmi celles-ci. Je n'ai pas besoin de faire des choses
très compliquées avec le parcours de ce tableau alors je décide d'utiliser
`foreach` car elle remplie parfaitement mon besoin, en plus d'être plus simple
et plus claire.

Mon troisième besoin est de trouver un moyen d'afficher ces données. Afficher
des données c'est quelque chose que je sais déjà faire, alors let's go !

## Plan d'action

Étant donné que j'ai en ma possession des variables `$variables` avec la valeur de `<prénom>`  
Et que je veux regrouper ces variables dans un seul tableau se nommant `<prénoms>`  
Alors je crée une variable se nommant `<prénoms>`  
Et j'y mets toutes les variables `$variables` que j'ai en ma possession afin d'obtenir une liste de prénoms  
Lorsque je parcours le tableau `<prénoms>` avec une boucle `foreach`, je veux récupérer la valeur `<prénom>`  
Ensuite je veux afficher le message de sortie attendue pour chaque prénom `<prénom>`

## Sortie attendue

> Le prénom est `<prénom>`
