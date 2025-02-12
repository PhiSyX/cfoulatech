<?php

require_once "./pdo.php";
require_once "./utils.php";

$user = [
	"firstname" => "Mike",
	"lastname" => "S.",
	"gender" => "M",
	"date_of_birth" => "1991-12-07",
	"city" => "Bruxelles",
	"weight_kg" => 80
];

executeQuery("
	INSERT INTO users (
		firstname,
		lastname,
		gender,
		date_of_birth,
		city,
		weight_kg
	) VALUES (
		:firstname,
		:lastname,
		:gender,
		:date_of_birth,
		:city,
		:weight_kg
	)
", $user);

echo "L'utilisateur ";
echo $user["firstname"];
echo " ";
echo $user["lastname"];
echo " a bien été ajouté à la table `coursmysql`.`users`";
