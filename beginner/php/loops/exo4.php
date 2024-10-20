<?php

$days_of_week = [
    "Lundi",
    "Mardi",
    "Mercredi",
    "Jeudi",
    "Vendredi",
    "Samedi",
    "Dimanche"
];

// La fonction sizeof et count sont équivalentes.
$days_len = count($days_of_week);

for ($index = 0; $index < $days_len; $index++) {
    $day = $days_of_week[$index];
    echo  "$day\n";
}
