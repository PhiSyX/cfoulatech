<?php

$user__number = (int) readline("Entrez un nombre (0 pour arrêter) : ");

while ($user__number !== 0) {
    echo "Voici votre nombre : $user__number\n";

    $user__number = (int) readline("Entrez un nombre (0 pour arrêter) : ");
}
