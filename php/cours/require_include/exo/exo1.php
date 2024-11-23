<?php

require dirname(__DIR__) . "/fonctions_require.php";

$term1 = "soustraire";
$term2 = "soustraction";

if (yes_or_no("Voulez-vous $term1?")) {
	$result = sub(6, 3); // 3
	echo "La réponse de la $term2 est $result\n";
} else {
	echo "Vous avez décidé de ne pas $term1.\n";
}
