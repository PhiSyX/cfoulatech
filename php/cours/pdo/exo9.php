<?php

try {
	$pdo = new PDO('mysql:dbname=coursmysql;host=localhost', "root", "");
	$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
	die("Erreur de connexion : " . $e->getMessage());
}

try {
	// En MySQL, il faut séparer les deux requêtes et les executer une à une :
	// $article = $pdo->query("
	// 	SELECT id_article FROM articles
	// 	ORDER BY id_article DESC
	// 	LIMIT 1,1
	// ")->fetch(PDO::FETCH_OBJ);
	// $req = $pdo->prepare("
	// 	DELETE FROM articles
	// 	WHERE id_article = :id_article
	// ");
	// $req->execute(['id_article' => $article->id_article]);

	// Mais dans MariaBD on peut directement faire ça:
	$req = $pdo->prepare("
		DELETE FROM articles
		WHERE id_article = (
			SELECT id_article FROM articles
			ORDER BY id_article DESC
			LIMIT 1,1
		)
	");

	if ($req->execute()) {
		echo "L'avant dernier article de la table `coursmysql`.`articles`";
		echo " a bien été supprimer.";
	}
} catch (PDOException $e) {
	die("Erreur de suppression : " . $e->getMessage());
}
