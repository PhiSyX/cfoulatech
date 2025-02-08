<?php

require dirname(__DIR__) . "/fonctions_require.php";

$term1 = "soustraire";
$term2 = "soustraction";

if (yes_or_no("Voulez-vous $term1?")) {
	$nb1 = readline("Votre premier nombre : ");
	$nb2 = readline("Votre second nombre : ");

	if (!(is_numeric($nb1) && is_numeric($nb2))) {
		echo "Veuillez introduire 2 nombres\n";
	} else {
		$result = sub($nb1, $nb2);
		echo "La réponse de la $term2 est $result\n";
	}
} else {
	echo "Vous avez décidé de ne pas $term1.\n";
}

$term1 = "multiplier";
$term2 = "multiplication";

if (yes_or_no("Voulez-vous $term1?")) {
	$nb1 = readline("Votre premier nombre : ");
	$nb2 = readline("Votre second nombre : ");

	if (!(is_numeric($nb1) && is_numeric($nb2))) {
		echo "Veuillez introduire 2 nombres\n";
	} else {
		$result = mul($nb1, $nb2);
		echo "La réponse de la $term2 est $result\n";
	}
} else {
	echo "Vous avez décidé de ne pas $term1.\n";
}
