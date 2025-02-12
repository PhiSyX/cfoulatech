<?php

require_once "./pdo.php";
require_once "./utils.php";

// En MySQL, il faut séparer les deux requêtes et les executer une à une :
//
// 	SELECT id_article FROM articles
// 	ORDER BY id_article DESC
// 	LIMIT 1,1
//
// 	DELETE FROM articles
// 	WHERE id_article = :id_article
//
// où :
// 	id_article = $article->id_article
//
// Mais dans MariaBD on peut directement faire ça:
$success = executeQuery("
	DELETE FROM articles
	WHERE id_article = (
		SELECT id_article FROM articles
		ORDER BY id_article DESC
		LIMIT 1,1
	)
");

if ($success) {
	echo "L'avant dernier article de la table `coursmysql`.`articles`";
	echo " a bien été supprimer.";
}
