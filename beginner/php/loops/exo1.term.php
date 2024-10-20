<?php

$user_number = 0;

do {
    $user_number = (int) readline("Entrez un nombre (0 pour arrêter) : ");
    echo "Voici votre nombre : $user_number\n";
} while ($user_number !== 0);
