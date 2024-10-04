# Exo 11

Pour cet exercice j'utilise deux boucles:

1.  Une pour ajouter des mots dans un tableau de mots.
2.  Une pour afficher le tableau des mots.

## Les étapes:

La première boucle que j'ai utilisé est une boucle "TANT QUE" (while).

1.  Je crée une variable `$mots` au pluriel qui va nous servir à ajouter les
    futurs mots, à laquelle je lui attribue comme valeur un tableau vide.

2.  Je crée une variable `$encours` à laquelle je lui attribue la valeur
    booléenne VRAIE (`true`). Cette variable va nous permettre de quitter la
    boucle TANT QUE lorsqu'elle sera assignée à la valeur booléenne FAUSSE
    (`false`).

3.  Je crée la boucle TANT QUE (`while`) avec comme condition `$encours`.

4.  À l'intérieur de cette boucle:

    1. Je crée une variable `$mot` au singulier, à laquelle j'appelle la
       fonction
       [`readline`](https://www.php.net/manual/fr/function.readline.php) avec le
       texte donné.

    2. Je modifie la variable `$encours`, pour mettre la condition `$mot` n'est
       pas strictement égal à la chaîne de caractères `stop`.

    3. Je vérifie avec une condition SI (`if`) que la `$encours` est VRAIE
       (`true`).

       1. J'ajoute `$mot` au singulier au tableau des mots, `$mots` au pluriel.

La seconde boucle que j'ai utilisé est une boucle "POUR CHAQUE" (`foreach`)

1. "POUR CHAQUE" (`foreach`) `$mots` au pluriel AS `$mot` au singulier

2. J'appelle la fonction `echo` `$mot` au singulier suivi d'une concaténation
   d'une chaîne de caractères composant d'une virgule et d'un espace pour
   séparer le tout.
