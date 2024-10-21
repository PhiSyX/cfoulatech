# Exercice 12

Concerne l'exercice du fichier [exemple.php](exemple.php)

## Instruction

Ici mettre les instructions donné par le prof.

**Par exemple**:

Afficher tous les éléments de cette classe d'élèves. Calculer la moyenne des
notes pour chaque élève.

## Exemple des données

Ici mettre des exemples de données, variables, etc. Sous forme de tableau c'est
plus sympa.

**Par exemple**:

### Tableau `<classes>`

| indice | prénom      | nom        | notes       |
| ------ | ----------- | ---------- | ----------- |
| 0      | "Julien"    | "Dunia"    | [8, 15, 12] |
| 1      | "Hakima"    | "Darmouch" | [18, 5, 10] |
| 2      | "Christian" | "Bale"     | [7, 19, 5]  |

| notes des élèves | taille des notes | somme | moyenne         |
| ---------------- | ---------------- | ----- | --------------- |
| [8, 15, 12]      | 3                | 35    | 11.666666666667 |
| [18, 5, 10]      | 3                | 33    | 11              |
| [7, 19, 5]       | 3                | 31    | 10.333333333333 |

## Sortie attendue

Ici mettre ce que je suis censé obtenir, ou ce que tu aimerais obtenir, pour cet
exercice.

**Par exemple**:

1. > prénom : Julien  
   > nom : Dunia  
   > notes : Moyenne 11.666666666667

2. > prénom : Hakima  
   > nom : Darmouch  
   > notes : Moyenne 11

3. > prénom : Christian  
   > nom : Bale  
   > notes : Moyenne 10.3333333333

## Réflexion

Ici mettre ce qui te passe par la tête, tes besoins, ce que tu connais déjà
etc... pour cet exercice

**Par exemple**:

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

Ici mettre ce que tu comptes faire pour réaliser tes réflexions, tes besoins,
etc... Pas besoin d'être trop long

**Par exemple**:

Pour parcourir mon tableau `<classes>` j'utilise une boucle `foreach`
Et je récupère chaque valeur `<élève>` de ce tableau

Étant donné que la valeur `<élève>` est un tableau associatif, je dois également utiliser une boucle `foreach` sur cette valeur  
Je souhaite récupérer chaque clé `<élève_clé>` et chaque valeur `<élève_valeur>` de `<élève>`

À l'intérieur du second `foreach`, je vérifie ensuite que la clé `<élève_clé>` est une note via l'opérateur de comparaison `===`  
Et que la valeur `<élève_valeur>` est un tableau avec la fonction `is_array`

Si c'est le cas, j'effectue le point 1. Sinon j'effectue le point 2.

1. Point 1:

   Je renomme `<élève_valeur>` par `<notes>` afin de ne pas m'embrouiller le cerveau  
   Je parcours les `<notes>` pour obtenir la somme des notes  
   Et je sauvegarde le total dans une variable `<somme>`  
   Je divise cette `<somme>` par `<taille des notes>` afin d'obtenir la moyenne  
   Et ensuite j'affiche cette moyenne "`<élève_clé>`: moyenne `<moyenne>`" via la fonction `echo`

2. Point 2:

   J'affiche via la fonction `echo` en sortie "`<élève_clé>`: `<élève_valeur>`"
