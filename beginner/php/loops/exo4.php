<?php

$days_of_week = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"];
// La fonction sizeof et count sont équivalentes.
$days = count($days_of_week);

for ($index = 0; $index < $days; $index++) {
    $day = $days_of_week[$index];
    echo  "$day\n";
}
