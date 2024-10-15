<?php

/**
 * Salue un nom donné.
 * @param string $name Nom à saluer.
 * @return string Le message de salutation.
 */
function hello(string $name): string
{
    return "Hello $name !!!";
}

$first_names = ["Zakaria", "Clovis", "Julien", "Olga", "Say"];

foreach ($first_names as $firstname) {
    // NOTE: c'est ici que l'on affiche le retour de la fonction hello, pas
    // directement dans la fonction hello.
    echo hello($firstname) . "\n";
}
