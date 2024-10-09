<?php

function hello(string $name): string
{
    return "Hello $name !!!";
}

$first_names = ["Zakaria", "Clovis", "Julien", "Olga", "Say"];

foreach ($first_names as $firstname) {
    echo hello($firstname) . "\n";
}
