<?php

$tab2dim = [
    "James",
    "Bond",
    "M",
    "07/07/2007",
    ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"],
    "London"
];

echo "Prénom: " . $tab2dim[0] . "\n";
echo "Nom: " . $tab2dim[1] . "\n";
echo "Sexe: " . $tab2dim[2] . "\n";
echo "Date Naissance: " . $tab2dim[3] . "\n";
echo "Ville: " . $tab2dim[5] . "\n";
echo "Jour d'hier: " . $tab2dim[4][0];
