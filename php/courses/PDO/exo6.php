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

$success = insert_query("users", $user);

if ($success) {
	echo "L'utilisateur ";
	echo $user["firstname"];
	echo " ";
	echo $user["lastname"];
	echo " a bien été ajouté à la table `coursmysql`.`users`";
}
