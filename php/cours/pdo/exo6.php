<?php

try {
	$pdo = new PDO('mysql:dbname=coursmysql;host=localhost', "root", "");
	$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
	die("Erreur de connexion : " . $e->getMessage());
}

try {
	$req = $pdo->prepare("
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
	");

	$user = [
		"firstname" => "Mike",
		"lastname" => "S.",
		"gender" => "M",
		"date_of_birth" => "1991-12-07",
		"city" => "Bruxelles",
		"weight_kg" => 80
	];

	$req->execute($user);

	echo "L'utilisateur ";
	echo $user["firstname"];
	echo " ";
	echo $user["lastname"];
	echo " a bien été ajouté à la table `coursmysql`.`users`";

} catch (PDOException $e) {
	die("Erreur d'insertion : " . $e->getMessage());
}
