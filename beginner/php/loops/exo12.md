# Exercice 12

## Instruction

Afficher tous les éléments de cette classe d'élèves. Calculer la moyenne des
notes des élèves.

## Exemple des données

### Tableau `<classes>`

| indice | prénom      | nom        | notes       | moyenne attendu |
| ------ | ----------- | ---------- | ----------- | --------------- |
| 0      | "Julien"    | "Dunia"    | [8, 15, 12] | 11.666666666667 |
| 1      | "Hakima"    | "Darmouch" | [18, 5, 10] | 11              |
| 2      | "Christian" | "Bale"     | [7, 19, 5]  | 10.333333333333 |

## Réflexion

On a vu comment utiliser la structure de contrôle [while](https://www.php.net/manual/fr/control-structures.while.php)
et [foreach](https://www.php.net/manual/fr/control-structures.foreach.php).

On a vu que la fonction [`is_array`](https://www.php.net/manual/fr/function.is-array.php)
servait à savoir si l'argument donné est un tableau ou non.

On a vu comment on pouvait comparer des valeurs avec des [opérateurs de comparaisons](https://www.php.net/manual/fr/language.operators.comparison.php).

On a vu les [opérateurs arithmétiques](https://www.php.net/manual/fr/language.operators.arithmetic.php)
qui nous permettent entre autres d'additionner (`+`) et de diviser (`/`)

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
Afin d'obtenir la moyenne `<moyenne attendu>` s
Et j'affiche "`<élève_clé>`: moyenne `<moyenne attendu>`"

## Sortie attendue:

1. > firstname : Julien  
   > lastname : Dunia  
   > notes : Moyenne 11.666666666667

2. > firstname : Hakima  
   > lastname : Darmouch  
   > notes : Moyenne 11

3. > firstname : Christian  
   > lastname : Bale  
   > notes : Moyenne 10.3333333333
