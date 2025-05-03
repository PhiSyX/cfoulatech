<?php

require dirname(__DIR__) . "/fns.php";

$term1 = "diviser";
$term2 = "division";

if (yes_or_no("Voulez-vous $term1?")) {
	$nb1 = readline("Votre premier nombre : ");
	$nb2 = null;
	do {
		$nb2 = readline("Votre second nombre : ");
		if ($nb2 == 0) {
			echo "Vous avez tenté une division par 0, recommencez\n";
		}
	} while ($nb2 == 0);

	if (!(is_numeric($nb1) && is_numeric($nb2))) {
		echo "Veuillez introduire 2 nombres\n";
	} else {
		$result = div($nb1, $nb2);
		echo "La réponse de la $term2 est $result\n";
	}
} else {
	echo "Vous avez décidé de ne pas $term1.\n";
	echo "Au revoir !\n";
}
