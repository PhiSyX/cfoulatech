<?php

require_once "./pdo.php";
require_once "./utils.php";

$user5 = fetchOne("
	SELECT id_user FROM users
	LIMIT 4,1
");

$user = [
	"firstname" => "YOYO",
	"id_user" => $user5->id_user,
];

$success = executeQuery(
	"
		UPDATE users
		SET
			firstname = :firstname
		WHERE
			id_user = :id_user
	",
	$user
);

if ($success) {
	echo "Le prénom de l'utilisateur de la table `coursmysql`.`users`";
	echo " " . $user5->id_user . " ";
	echo " a bien été modifié en ";
	echo $user["firstname"];
}
