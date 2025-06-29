# Exercice 12

## Instruction

Afficher tous les éléments de cette classe d'élèves. Calculer la moyenne des
notes des élèves.

## Exemple des données

### Tableau `<classes>`

| indice | prénom      | nom        | notes       |
| ------ | ----------- | ---------- | ----------- |
| 0      | "Julien"    | "Dunia"    | [8, 15, 12] |
| 1      | "Hakima"    | "Darmouch" | [18, 5, 10] |
| 2      | "Christian" | "Bale"     | [7, 19, 5]  |

| notes des élèves | somme | moyenne         |
| ---------------- | ----- | --------------- |
| [8, 15, 12]      | 35    | 11.666666666667 |
| [18, 5, 10]      | 33    | 11              |
| [7, 19, 5]       | 31    | 10.333333333333 |

## Sortie attendue

1. > firstname : Julien
   > lastname : Dunia
   > notes : Moyenne 11.666666666667

2. > firstname : Hakima
   > lastname : Darmouch
   > notes : Moyenne 11

3. > firstname : Christian
   > lastname : Bale
   > notes : Moyenne 10.3333333333

## Réflexion

Mon premier besoin est trouver un moyen efficace de parcourir les éléments d'un
tableau. On a vu comment utiliser la structure de contrôle
[`foreach`](https://www.php.net/manual/fr/control-structures.foreach.php) pour
se faire.

Mon second besoin est de savoir si une valeur est un tableau ou non. On a vu que
la fonction [`is_array`](https://www.php.net/manual/fr/function.is-array.php)
servait à savoir si l'argument à cette fonction est un tableau ou non.

Mon troisième besoin est de trouver une formule pour calculer la moyenne d'un
tableau. Ce que j'ai trouvé sur internet est qu'il faut additionner toutes les
notes d'un tableau et ensuite de diviser ce résultat par le nombre des notes.
Pour se faire, on a vu les [opérateurs arithmétiques](https://www.php.net/manual/fr/language.operators.arithmetic.php)
qui nous permettent entre autres d'additionner (`+`) et de diviser (`/`) des
nombres. On a également vu comment récupérer un nombre total d'éléments d'un
tableau via la fonction [`count`](https://www.php.net/manual/fr/function.count.php)
afin de récupérer automatiquement le total des notes par élève.

## Plan d'action

Étant donné que j'utilise une boucle foreach sur le tableau `<classes>`
Et que je veux récupérer chaque valeur `<élève>`
Et étant donné que j'utilise une boucle foreach sur le tableau `<élève>`
Et que je veux récupérer chaque clé `<élève_clé>` et chaque valeur `<élève_valeur>`
Et que la valeur `<élève_valeur>` n'est pas un tableau
Alors je veux afficher "`<élève_clé>`: `<élève_valeur>`"
Sinon je renomme `<élève_valeur>` par `<notes>`
Et je fais la somme des `<notes>` en le parcourant avec un `foreach`
Ensuite je divise la somme par le total des éléments des `<notes>`
Afin d'obtenir la moyenne `<moyenne>`
Et j'affiche "`<élève_clé>`: moyenne `<moyenne>`"
