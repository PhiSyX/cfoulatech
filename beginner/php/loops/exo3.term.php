<?php

$user_word = "";
$stop_word = "stop";

while ($user_word !== $stop_word) {
    $user_word = readline("Entrez un mot au clavier (entrez \"stop\" pour arrêter : ");

    echo "Voici votre mot : $user_word\n";
}

echo "Vous avez quitté le programme !!!";
