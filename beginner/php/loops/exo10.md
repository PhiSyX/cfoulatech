# Exo 10

Pour cet exercice j'utilise la boucle "POUR CHAQUE" (`foreach`)

## Les étapes:

1.  Je crée une variable `$score`, à laquelle je lui attribue la valeur entière
    (`int`) de 20.

2.  Je crée une variable `$moitié_score`, à laquelle je fais une division par 2
    de la variable `$score`

    Pourquoi créer des variables supplémentaires sur les nombres?

    1. Ca nous permet de mettre des mots sur ce que signifie ces nombres.

    2. Afin que d'autres personnes qui lisent le code puissent savoir quoi
       on parle.

    3. Afin d'être plus extensible et configurable.

3.  Je crée une boucle "POUR CHAQUE" (`foreach`) tableau `$notes` au
    pluriel AS `$note` au singulier.

4.  À l'intérieur de cette boucle,

    1.  Je crée une condition SI `$note` est strictement égal à `$moitié_score`.
        À l'intérieur de cette condition j'affiche:
        > "Tu as eu tout pile $note/$score !"

    2.  À la suite de cette condition, je crée une condition "SINON SI"
        (`else if`) `$note` est strictement supérieur à `$moitié_score`, via le
        signe de comparaison supérieur strict.
        À l'intérieur de cette condition j'affiche via la fonction echo:
        > "Tu as eu tout pile $note/$score !"

    3.  À la suite de cette condition, je crée une condition SINON (ELSE)
        À l'intérieur de cette condition j'affiche:

        > "Tu as raté avec la note de $note/$score !"
