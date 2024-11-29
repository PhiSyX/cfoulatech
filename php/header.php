<?php
if (session_status() === PHP_SESSION_NONE) {
	session_start();
}
require_once "./functions/authentification.php";
?>
<!DOCTYPE html>
<html lang="fr">

<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title><?= $title ?? "Mon super site" ?></title>
	<link rel="stylesheet" href="./assets/css/style.css">
</head>

<body>

	<header>
		<nav>
			<a
				href="index.php"
				class="<?php if ($nav === "index"): ?>active<?php endif ?>">
				Accueil
			</a>
			<a
				href="contact.php"
				class="<?php if ($nav === "contact"): ?>active<?php endif ?>">
				Contact
			</a>
			<a
				href="about.php"
				class="<?php if ($nav === "about"): ?>active<?php endif ?>">
				À propos
			</a>
		</nav>

		<nav>
			<?php if (! is_connected()): ?>
				<a
					href="login.php"
					class="<?php if ($nav === "login"): ?>active<?php endif ?>">
					Connexion
				</a>
			<?php endif ?>

			<?php if (is_connected()): ?>
				<a
					href="dashboard.php"
					class="<?php if ($nav === "dashboard"): ?>active<?php endif ?>">
					Tableau de bord
				</a>

				<form action="logout.php" method="POST">
					<button type="submit" name="send">
						Déconnexion
						<strong><?= $_SESSION["user"]["login"] ?></strong>
					</button>
				</form>

				<!--
				<a
					href="logout.php"
					class="<?php if ($nav === "logout"): ?>active<?php endif ?>"
				>
					Déconnexion
				</a>
				-->
			<?php endif ?>
		</nav>
	</header>

	<aside>
		<nav>
			<a href="cours/">Tous les cours</a>

			<a
				href="jeuduhasard.php"
				class="<?php if ($nav === "jeuduhasard"): ?>active<?php endif ?>">
				Jeu du Hasard
			</a>

			<?php if (is_connected()): ?>
				<a
					href="database.php"
					class="<?php if ($nav === "database"): ?>active<?php endif ?>">
					Base de données
				</a>
			<?php endif ?>
		</nav>
	</aside>
