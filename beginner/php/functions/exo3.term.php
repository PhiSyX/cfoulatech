<?php

/*
Pour cet exo on va partir du principe que ce qui est entré par l'utilisateur
sont vraiment des mots valides français, mais sinon effectivement, il faudra un
peu plus de validation.
*/

while (true) {
    $word = readline("Veuillez entrer un mot : ");

    $lowercase_word = strtolower($word);
    $reverse_lowercase_word = strrev($lowercase_word);

    if ($lowercase_word === $reverse_lowercase_word) {
        echo '"' . $word . '"' . " s'agit d'un palindrome\n";
    } else {
        echo '"' . $word . '"' . " ne s'agit pas d'un palindrome\n";
    }
}
