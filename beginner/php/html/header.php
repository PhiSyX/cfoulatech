<!DOCTYPE html>
<html lang="fr">

<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<!--
	<title><?= $title ?? "Mon super site"; ?></title>
	-->
	<title><?php

	if (isset($title)):
		echo $title;
	else:
		echo "Mon super site";
	endif;

	?></title>
	<link rel="stylesheet" href="./assets/css/style.css">
</head>

<body>

	<header>
		<nav>
			<a
				href="index.php"
				class="<?php if ($nav === "index"): ?>active<?php endif; ?>"
			>
				Accueil
			</a>
			<a
				href="contact.php"
				class="<?php if ($nav === "contact"): ?>active<?php endif; ?>"
			>
				Contact
			</a>
			<a
				href="about.php"
				class="<?php if ($nav === "about"): ?>active<?php endif; ?>"
			>
				À propos
			</a>
			<a
				href="jeuduhasard.php"
				class="<?php if ($nav === "jeuduhasard"): ?>active<?php endif; ?>"
			>
				Jeu du Hasard
			</a>
		</nav>
	</header>
