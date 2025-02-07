<?php

try {
	$pdo = new PDO('mysql:dbname=coursmysql;host=localhost', "root", "");
	$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
	die("Erreur de connexion : " . $e->getMessage());
}

try {
	$user5 = $pdo->query("
		SELECT id_user FROM users
		LIMIT 4,1
	")->fetch(PDO::FETCH_OBJ);

	$req = $pdo->prepare("
		UPDATE users
		SET
			firstname = :firstname
		WHERE
			id_user = :id_user
	");

	$user = [
		"firstname" => "YOYO",
		"id_user" => $user5->id_user,
	];

	if ($req->execute($user)) {
		echo "Le prénom de l'utilisateur de la table `coursmysql`.`users`";
		echo " " . $user5->id_user . " ";
		echo " a bien été modifié en ";
		echo $user["firstname"];
	}

} catch (PDOException $e) {
	die("Erreur de modification : " . $e->getMessage());
}
