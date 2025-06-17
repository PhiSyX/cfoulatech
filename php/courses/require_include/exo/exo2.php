<?php

require dirname(__DIR__) . "/fns.php";

$term1 = "multiplier";
$term2 = "multiplication";

if (yes_or_no("Voulez-vous $term1?")) {
	$result = mul(3, 3); // 9
	echo "La réponse de la $term2 est $result\n";
} else {
	echo "Vous avez décidé de ne pas utiliser la $term2.\n";
}
