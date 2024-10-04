# Exo 12

Pour cet exercice je n'utilise que des boucles "POUR CHAQUE" (foreach).

## Les étapes:

1. Je crée une boucle `foreach` `$class` as `$élève`

2. A l'intérieur de la première boucle, je crée une nouvelle boucle `foreach`
   `$élève` où je récupère sa clé (`$élève_cle`) et sa valeur (`$élève_valeur`)

3. Je vérifie que la clé `$élève_cle` est "notes" et que sa valeur est un
   tableau via la fonction `is_array($élève_valeur)`.

   1. Je crée une variable `$notes` à laquelle j'attribue la valeur
      `$élève_valeur`.

   2. Je crée une variable `$somme` à laquelle j'attribute la valeur `0`.

   3. Je crée une boucle `foreach`, `$notes` as `$note`

   4. J'ajoute `$note` à la variable `$somme` via l'opérateur d'affection
      arithmétique après addition.

   5. Je crée une variable `$moyenne`.

   6. J'affiche `$élève_cle . " : Moyenne " . $moyenne`;

4. Je crée une condition SINON (else)

   1. J'affiche `$élève_cle . " : " . $élève_valeurs`;

5. J'affiche une fin de ligne à la fin de la première boucle.
