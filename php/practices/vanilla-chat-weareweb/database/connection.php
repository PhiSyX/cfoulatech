<?php

require_once "./entities/Message.php";
require_once "./entities/User.php";

// A changer avec les informations du site sur Alwaysdata
$databaseName = "tp_onestensemble";
$databaseHost = 'localhost';
$databaseUser = 'root';
$databasePass = '';

try {
	$pdo = new PDO("mysql:dbname=$databaseName;host=$databaseHost", $databaseUser, $databasePass);
	$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	$pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_OBJ);
} catch (PDOException $e) {
	die('Erreur de connexion: ' . $e->getMessage());
}
