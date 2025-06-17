<?php

require_once "./pdo.php";
require_once "./utils.php";

$success = false;

switch (sqlDriver()) {
	//
	// En MariaBD, on peut directement faire ça.
	//
	case "mariadb":
	{
		$success = executeQuery("
			DELETE FROM articles
			WHERE id_article = (
				SELECT id_article FROM articles
				ORDER BY id_article DESC
				LIMIT 1,1
			)
		");
	} break;

	//
	// En MySQL, il faut séparer les deux requêtes et les executer une à une.
	//
	case "mysql":
	{
		$penultimate = fetchOne("
			SELECT id_article FROM articles
			ORDER BY id_article DESC
			LIMIT 1,1
		");

		$success = executeQuery("
			DELETE FROM articles
			WHERE id_article = :id_article
		", [
			"id_article" => $penultimate->id_article,
		]);
	} break;
}

if ($success) {
	echo "L'avant dernier article de la table `coursmysql`.`articles`";
	echo " a bien été supprimer.";
}
