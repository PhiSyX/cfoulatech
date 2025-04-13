<?php http_response_code(503) ?>
<!DOCTYPE html>
<html lang="fr">

<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Erreur 503</title>
	<link rel="stylesheet" href="public/css/main.css">
	<style>
		strong:empty:after {
			content: "[vide]";
			font-style: italic;
			font-weight: normal;
			color: #AAA;
		}
	</style>
</head>

<body>

<main role="main" class="container">

	<h1>Service indisponible</h1>

	<?php if (isset($_GET["debug"]) && isset($errors["cause"]) && $errors["cause"] === "db"): ?>
		<?php
		$dbinfo = require "config/database.php";
		?>
		<h2>Erreur liée à la base de données</h2>

		<?php if (str_contains($_GET["debug"], "verbose")): ?>
			<div class="alert alert-error">
				<pre><?= $errors["exception"] ?></pre>
			</div>
		<?php endif; ?>

		<?php if (isset($errors["type"]) && $errors["type"] === "access_denied"): ?>
			<p>
				D'après nos informations, les identifiants de connexion n'ont
				pas
				accès
				à la base de données <strong><?= $dbinfo["dbname"] ?></strong>.
			</p>

			<p>Vos identifiants :</p>

			<ul>
				<li>Utilisateur: <strong><?= $dbinfo["user"] ?></strong></li>
				<li>Mot de passe:
					<strong><?= str_contains($_GET["debug"], "secret") ? $dbinfo["pass"] : "*****" ?></strong>
				</li>
			</ul>
		<?php endif ?>

		<?php if (isset($errors["type"]) && $errors["type"] === "unknown_database"): ?>
			<p>D'après nos informations, la base de données
				<strong><?= $dbinfo["dbname"] ?></strong> n'existe pas.</p>
			<p>Néanmoins</p>
		<?php endif ?>

		<?php if (isset($errors["type"]) && $errors["type"] === "unknown_table"): ?>
			<p>D'après nos informations, la table
				<strong><?= $errors["table"] ?></strong>
				dans la base de données
				<strong><?= $dbinfo["dbname"] ?></strong>
				n'existe pas.</p>
			<p>Néanmoins</p>
		<?php endif ?>

		<?php if (isset($errors["type"]) && $errors["type"] === "unavailable"): ?>
			<p>D'après nos informations, <strong>MySQL</strong> n'est pas
				démarré.
			</p>
			<p>Néanmoins</p>
		<?php endif ?>

		<p>Veuillez vérifier les points suivants :</p>

		<ol>
			<li>
				Est-ce que le service <strong>MySQL</strong> est bien démarré
				sur le port <strong><?= $dbinfo["port"] ?></strong> ?
			</li>

			<li>
				L'utilisateur <strong><?= $dbinfo["user"] ?></strong> est-il le
				bon ?
			</li>

			<li>
				Est-ce que les fichiers <strong>.sql</strong> liés au projet ont
				bien été importés ? <br>
				Ces fichiers se trouvent dans le dossier
				<strong>database/</strong>
				du projet.
			</li>

			<li>
				Est-ce que toutes les informations sont correctes dans le
				fichier <strong>config/database.php</strong> ?
			</li>
		</ol>
	<?php endif ?>
</main>
</body>

</html>
