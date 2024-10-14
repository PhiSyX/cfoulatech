<?php

/**
 * Salue un nom donné et l'affiche.
 * @param string $name Nom à saluer.
 */
function hello(string $name): void
{
    echo "Hello $name !!!\n";
}

$first_names = ["Zakaria", "Clovis", "Julien", "Olga", "Say"];

foreach ($first_names as $firstname) {
    hello($firstname);
}
