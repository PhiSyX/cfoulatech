<?php

$notes = [18, 13, 5, 9, 10];

// Accès de chaque élément du tableau via ce qu'on appelle un index
//
// L'index 0 correspond au premier élément, ici: 18.
// L'index 1 correspond au second élément, ici: 13.
// L'index 2 correspond au second élément, ici: 5.
// L'index 3 correspond au second élément, ici: 9.
// L'index 4 correspond au second élément, ici: 10.
//
// Si nous tentons d'accéder à un index qui n'existe pas, nous aurons une
// erreur.

$sum = $notes[0] + $notes[1] + $notes[2] + $notes[3] + $notes[4];
$avg = $sum / 5;

echo "La somme des notes est $sum\n";
echo "La moyenne des notes est $avg\n";
