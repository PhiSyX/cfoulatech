<?php


try {
	$pdo = new PDO('mysql:dbname=coursmysql;host=localhost', "root", "");
	$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
	die("Erreur de connexion : " . $e->getMessage());
}

try {
	$req = $pdo->query("
		SELECT
			firstname,
			date_of_birth,
			TIMESTAMPDIFF(YEAR, date_of_birth, CURRENT_DATE) AS age
		FROM users
		WHERE gender = 'M'
	");

	$users = $req->fetchAll(PDO::FETCH_OBJ);

	$now = new DateTime("now");

	foreach ($users as $user) {
		$age = $now->diff(new DateTime($user->date_of_birth))->y;

		echo "Prénom : " . $user->firstname;
		// echo ", âge  : " . $user->age . " ans";
		echo ", âge  : " . $age . " ans";
		echo "<br>";
	}
} catch (PDOException $e) {
	die("Erreur de sélection : " . $e->getMessage());
}
