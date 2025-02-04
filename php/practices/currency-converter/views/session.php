<?php

session_start();

// Détruit la session si ?destroy est dans l'URL.
if (isset($_GET["destroy"])) {
	session_destroy();

	// Redirige vers la page de connexion.
	header("Location: signin.php");
	exit;
} else {
	var_dump($_SESSION);
}
