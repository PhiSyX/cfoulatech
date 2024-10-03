<?php

$months = [
    "Janvier",
    "Février",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Juillet",
    "Août",
    "Septembre",
    "Octobre",
    "Novembre",
    "Décembre"
];

$months_len = sizeof($months);

for ($i = 1; $i < $months_len; $i += 2) {
    $month = $months[$i];
    echo "$month ";
}

for ($i = 0; $i < $months_len; $i++) {
    $month = $months[$i];
    if ($i % 2 == 1) {
        echo "$month ";
    }
}
