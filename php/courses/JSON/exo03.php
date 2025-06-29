<?php

require_once "utils.php";
require_once "Artist.php";
require_once "Album.php";

$album1 = new Album("R'n'B de Rue", 12, new DateTime("2025-03-01"));
$album2 = new Album("Back to back", 15, new DateTime("2024-03-01"));
$album3 = new Album("La Bohème", 7, new DateTime("2022-03-01"));

$artist1 = new Artist("Say", "R'n'B", 230_000_000, $album1);
$artist2 = new Artist("Erica", "Soul Jazz", 1_000_000_000, $album2);
$artist3 = new Artist("Jeremy", "Variété Française", 100_000_000, $album3);
$artists = [$artist1, $artist2, $artist3];

echo json_pretty($artists);
