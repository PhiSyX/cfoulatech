<?php require_once "./functions/auth.php" ?>
<!DOCTYPE html>
<html lang="fr">

<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title><?= $title ?? "TP 1"; ?></title>
	<link rel="stylesheet" href="./assets/css/style.css">
</head>

<body class="l-body">
	<header class="l-header topbar">
		<nav class="navbar ml:a">
			<?php if (!is_connected()): ?>
				<a
					href="login.php"
					class="<?php if ($nav === "login"): ?>active<?php endif; ?>">
					Connexion
				</a>
			<?php endif; ?>

			<?php if (is_connected()): ?>
				<a
					href="profile.php"
					class="<?php if ($nav === "profile"): ?>active<?php endif; ?>">
					Mon Profil
				</a>

				<form action="logout.php" method="POST">
					<button type="submit" name="send">
						Déconnexion
						<strong><?= $_SESSION["user"]["login"]; ?></strong>
					</button>
				</form>

				<!--
				<a
					href="logout.php"
					class="<?php if ($nav === "logout"): ?>active<?php endif; ?>"
				>
					Déconnexion
				</a>
				-->
			<?php endif; ?>
		</nav>
	</header>

	<aside class="l-sidebar">
		<!-- TP2:
			e. Je veux que vous créez un onglet dont le nom sera « Calculatrice »
			   qui sera une liste contenant donc l'onglet addition, division,
			   multiplication et soustraction. En gros un onglet avec sous onglet.

			f. (Facile) Je veux que quand vous n'êtes pas connecté,
			            vous ne voyez plus l'onglet Calculatrice.
 		-->
		<?php if (is_connected()): ?>
			<nav class="navbar">
				<a
					href="addition.php"
					class="<?php if ($nav === "addition"): ?>active<?php endif; ?>">
					Addition
				</a>

				<a
					href="multiplication.php"
					class="<?php if ($nav === "multiplication"): ?>active<?php endif; ?>">
					Multiplication
				</a>

				<a
					href="division.php"
					class="<?php if ($nav === "division"): ?>active<?php endif; ?>">
					Division
				</a>


				<a
					href="soustraction.php"
					class="<?php if ($nav === "soustraction"): ?>active<?php endif; ?>">
					Soustraction
				</a>
			</nav>
		<?php endif ?>
	</aside>
