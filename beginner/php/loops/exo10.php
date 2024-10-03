<?php

/**
 * Pour cet exercice j'utilise la boucle "POUR CHAQUE" (foreach)
 * 
 * Les étapes:
 *
 * 2. Je crée une variable dollar $score, à laquelle je lui attribue la valeur
 *    de 20.
 *
 * 3. Je crée une variable dollar $moitié_score, à laquelle je fais une division
 *    par 2 de la variable dollar $score 
 *
 *    Pourquoi créer des variables supplémentaires sur les nombres? 
 *
 *      1. Ca nous permet de mettre des mots sur ce que signifie ces nombres.
 *      2. Afin que d'autres personnes qui lisent le code puissent savoir quoi
 *         on parle.
 *      3. Afin d'être plus extensible et configurable.
 *
 * 4. Je crée une boucle "POUR CHAQUE" (foreach) tableau dollar $notes au
 *    pluriel AS dollar $note au singulier.
 *
 * 5. À l'intérieur de cette boucle,
 *
 *    5.1. Je crée une condition SI dollar $note est triple égal à dollar
 *         $moitié_score.
 *
 *         À l'intérieur de cette condition j'affiche:
 *
 *              >>> "Tu as eu tout pile $note/$score !"
 *
 *    5.2. À la suite de cette condition, je crée une condition "SINON SI"
 *         dollar $note est strictement supérieur à dollar $moitié_score, via le
 *         signe de comparaison supérieur strict.
 *
 *         À l'intérieur de cette condition j'affiche via la fonction echo :
 *
 *              >>> "Tu as eu tout pile $note/$score !"
 *
 *    5.3. À la suite de cette condition, je crée une condition SINON (ELSE)
 *
 *          À l'intérieur de cette condition j'affiche:
 *
 *              >>> "Tu as raté avec la note de $note/$score !"
 */

$notes = [18, 13, 5, 9, 10];
$score = 20;
$half_score = $score / 2;

foreach ($notes as $note) {
    if ($note === $half_score) {
        echo "Tu as eu tout pile $note/$score !\n";
    } else if ($note > $half_score) {
        echo "Tu as réussi avec la note de $note/$score !\n";
    } else {
        echo "Tu as raté avec la note de $note/$score !\n";
    }
}
