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

<body class="l-body">

	<input type="checkbox" id="toggle-navigation-global">


	<header class="l-topbar topbar">
		<div class="logo">
			<?php if (is_connected()): ?>
				<div class="avatar avatar--anim">
					<a href="dashboard.php" title="Accéder au profil de <?php echo $_SESSION["user"]["login"]; ?>">
						<img
							src="<?php echo $_SESSION["user"]["avatar"] ?>"
							alt="Photo de profil de <?php echo $_SESSION["user"]["login"]; ?>"
							width="48" height="48">
					</a>
				</div>
			<?php else: ?>
				<img src="./assets/img/logo.png" alt="Logo du site" width="48" height="48">
			<?php endif ?>
		</div>

		<p class="title">
			<?php echo isset($title) ? $title : "TP" ?>
		</p>
	</header>


	<div class="l-main">
		<aside class="navigation-global">
			<nav role="navigation" class="navbar navbar--vertical">
				<a href="index.php" class="<?php echo $nav === "index" ? "active" : ""; ?>">
					<?php include "./assets/svg/icon-home.svg" ?>
					<span>Accueil</span>
				</a>

				<a href="contact.php" class="<?php echo $nav === "contact" ? "active" : ""; ?>">
					<?php include "./assets/svg/icon-contact.svg" ?>
					<span>Contact</span>
				</a>

				<a href="about.php" class="<?php echo $nav === "about" ? "active" : ""; ?>">
					<?php include "./assets/svg/icon-about.svg" ?>
					<span>À propos</span>
				</a>

				<a href="jeuduhasard.php" class="<?php echo $nav === "jeuduhasard" ? "active" : ""; ?>">
					<?php include "./assets/svg/icon-randgame.svg" ?>
					<span>Jeu du hasard</span>
				</a>

				<?php if (is_connected()): ?>
					<a href="database.php" class="<?php echo $nav === "database" ? "active" : ""; ?>">
						<?php include "./assets/svg/icon-database.svg" ?>
						<span>Base de données</span>
					</a>
				<?php endif ?>

				<a href="../../cours/">
					<?php include "./assets/svg/icon-course.svg" ?>
					<span>Tous les cours</span>
				</a>
			</nav>

			<nav role="navigation" class="navbar navbar--vertical mt:a">
				<?php if (!is_connected()) : ?>
					<a href="login.php" class="<?php echo $nav === "login" ? "active" : ""; ?>">
						<?php include "./assets/svg/icon-login.svg" ?>
						<span>Connexion</span>
					</a>
				<?php else: ?>
					<a href="dashboard.php" class="<?php echo $nav === "dashboard" ? "active" : ""; ?>">
						<?php include "./assets/svg/icon-dashboard.svg" ?>
						<span>Tableau de bord</span>
					</a>

					<form action="logout.php" method="POST">
						<button type="submit" name="send" class="avatar">
							<img src="<?php echo $_SESSION["user"]["avatar"]; ?>" alt="Photo de profil de <?php echo $_SESSION["user"]["login"]; ?>" width="24" height="24">
							<span>Déconnexion</span>
						</button>
					</form>
				<?php endif ?>
			</nav>
		</aside>

		<main role="main">
