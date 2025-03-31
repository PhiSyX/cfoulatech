<?php

require_once "utils.php";
require_once "Artiste.php";
require_once "Album.php";

$album1 = new Album("R'n'B de Rue", 12, new DateTime("2025-03-01"));
$album2 = new Album("Back to back", 15, new DateTime("2024-03-01"));
$album3 = new Album("La Bohème", 7, new DateTime("2022-03-01"));

$artiste1 = new Artiste("Say", "R'n'B", 230_000_000, $album1);
$artiste2 = new Artiste("Erica", "Soul Jazz", 1_000_000_000, $album2);
$artiste3 = new Artiste("Jeremy", "Variété Française", 100_000_000, $album3);
$artistes = [$artiste1, $artiste2, $artiste3];

echo json_pretty($artistes);
