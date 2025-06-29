<?php

require_once "./pdo.php";
require_once "./utils.php";

$users = fetch_all("
	SELECT
		firstname,
		date_of_birth,
		TIMESTAMPDIFF(YEAR, date_of_birth, CURRENT_DATE) AS age
	FROM users
	WHERE gender = 'M'
");

$now = new DateTime("now");

foreach ($users as $user) {
	$age = $now->diff(new DateTime($user->date_of_birth))->y;

	echo "Prénom : " . $user->firstname;
	// echo ", âge  : " . $user->age . " ans";
	echo ", âge  : " . $age . " ans";
	echo "<br>";
}
