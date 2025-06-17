<?php

//
// Mutable
//

$indexes = [];
var_dump($indexes);

// Syntaxe d'ajout en dernière position
$indexes[] = "Mike";
var_dump($indexes);

// Fonction d'ajout en dernière position
array_push($indexes, "Au revoir");
var_dump($indexes);

// Fonction d'ajout en première position
array_unshift($indexes, "Bonjour");
var_dump($indexes);

echo "<hr>";

//
// Immutable
//

$indexes = ["Mike"];
var_dump($indexes);

// Syntaxe d'ajout en dernière position
$indexes = [...$indexes, "Au revoir"];
var_dump($indexes);

// Syntaxe d'ajout en première position
$indexes = ["Bonjour", ...$indexes];
var_dump($indexes);
