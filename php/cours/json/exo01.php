<?php

require_once "./Personne.php";

$json_file = file_get_contents("exo01.json");
if ($json_file === false) {
	die("Erreur de lecture du fichier JSON.");
}

$json_data = json_decode($json_file);
if (json_last_error() !== JSON_ERROR_NONE) {
	die("Erreur de décodage JSON : " . json_last_error_msg());
}

$personnes = array_map(
	fn($item) => new Personne($item->prenom, $item->age, $item->genre),
	$json_data
);

foreach ($personnes as $personne) {
	echo $personne;
}

/** Bonus PDO */

try {
	$pdo = new PDO('mysql:dbname=coursmysql;host=localhost', "root", "");
	$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	$pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_OBJ);
} catch (PDOException $e) {
	die("Erreur de connexion : " . $e->getMessage());
}

try {
	// Version plus longue
	/*
	$totalPersonnes = sizeof($personnes);
	$placeholders = "";
	for ($i = 0; $i < $totalPersonnes; $i++) {
		$placeholders .= '(?,?,?)';
		if ($i !== $totalPersonnes - 1) {
			$placeholders .= ',';
		}
	}

	$data_to_insert = [];
	foreach ($personnes as $personne) {
		$data_to_insert[] = $p->getPrenom();
		$data_to_insert[] = $p->getAge();
		$data_to_insert[] = $p->getGenre();
	}
	*/

	// Version plus courte
	$placeholders = join(",", array_map(fn($_) => '(?,?,?)', $personnes));
	$data_to_insert = array_reduce(
		array_map(fn($p) => [$p->getPrenom(), $p->getAge(), $p->getGenre()], $personnes),
		fn($acc, $p) => array_merge($acc, $p),
		[]
	);

	// $req = "INSERT INTO personnes (prenom,age,genre) VALUES $placeholders";
	// $stmt = $pdo->prepare($req);
	// $stmt->execute($data_to_insert);

	echo "Tous les utilisateurs ont été ajoutés\n";
} catch (PDOException $e) {
	die("Erreur d'insertion SQL : " . $e->getMessage());
}
