<?php

require dirname(__DIR__) . "/fns.php";

$term1 = "diviser";
$term2 = "division";

if (yes_or_no("Voulez-vous $term1?")) {
	$result = div(7, 2); // 3.5
	echo "La réponse de la $term2 est $result\n";
} else {
	echo "Vous avez décidé de ne pas utiliser la $term2.\n";
}
