<?php

$two_dim = [
	"James",
	"Bond",
	"M",
	"07-07-2007",
	["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"],
	"Londres",
];

$firstname = $two_dim[0];
echo "Prénom: $firstname\n";

$lastname = $two_dim[1];
echo "Nom: $lastname\n";

$gender = $two_dim[2];
echo "Genre: $gender\n";

$date_of_birth = $two_dim[3];
echo "Date Naissance: $date_of_birth\n";

$day_yesterday = $two_dim[4][3];
echo "Jour d'hier: $day_yesterday\n";

$city_town = $two_dim[5];
echo "Ville: $city_town\n";
