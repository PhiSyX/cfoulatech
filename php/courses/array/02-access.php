<?php

require "./02-indexes.php";

// Accès de chaque élément du tableau via ce qu'on appelle un indice ou index en
// anglais.
//
// L'index 0 correspond au premier élément,
// l'index 1 correspond au second élément.
// L'index 2 correspond au troisième élément.
// L'index 3 correspond au quatrième élément.
// L'index 4 correspond au cinquième élément.
// et ainsi de suite...

echo $notes[3];
echo PHP_EOL;
echo $animaux[1];

// Si nous tentons d'accéder à un index qui n'existe pas, nous aurons une
// erreur: (!) Warning: Undefined array key 10 in /array/02-access-element.php

echo $notes[10];

// Pour corriger cela, nous pouvons utiliser des fonctions prédéfinies de PHP
// pour ce faire:

// Solution fonction liée aux tableaux
if (array_key_exists(12, $animaux)) {
	echo $animaux[12];
}

// Solution plus global
if (isset($notes[11])) {
	echo $notes[11];
}
