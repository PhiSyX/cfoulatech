<?php

require_once "./functions/authentification.php";

if (!is_connected()) {
	header("Location: login.php");
	exit;
}

$navigations = [
	[
		"id" => "db_articles",
		"href" => "database_articles.php",
		"title" => "Tous les articles",
		"text" => "Articles"
	],
	[
		"id" => "db_users",
		"href" => "database_users.php",
		"title" => "Tous les utilisateurs",
		"text" => "Utilisateurs"
	]
];

$nav = "database";
$title = "Base de données";

require_once "./header.php";
?>

<link rel="stylesheet" href="assets/css/pages/database.css">

<section id="database-page" class="center:i">


</section>

<?php require_once "./footer.php"; ?>
