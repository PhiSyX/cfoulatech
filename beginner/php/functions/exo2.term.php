<?php

/*
Pour cet exo on va partir du principe que ce qui est entré par l'utilisateur
sont vraiment des mots valides français, mais sinon effectivement, il faudra un
peu plus de validation.

ex: 

    1. s n'est pas un mot

    2. ss n'est pas un mot

    3. sss n'est pas un mot
*/

while (true) {
    $word = readline("Veuillez entrer un mot : ");

    $reverse_word = strrev($word);

    if ($word === $reverse_word) {
        echo "Il s'agit d'un palindrome\n";
    } else {
        echo "Il ne s'agit pas d'un palindrome\n";
    }
}
