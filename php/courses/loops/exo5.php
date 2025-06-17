<?php

require __DIR__ . "/../utils/instruction.php";

$months = [
	"Janvier",
	"Février",
	"Mars",
	"Avril",
	"Mai",
	"Juin",
	"Juillet",
	"Août",
	"Septembre",
	"Octobre",
	"Novembre",
	"Décembre",
];

echo instruction("
    Afficher tous les mois à partir du mois de Février.
", data: $months, output: true);

$months_len = sizeof($months);

echo "Proposition 1: ";
for ($i = 1; $i < $months_len; $i += 2) {
	$month = $months[$i];
	echo "$month ";
}

echo "\n\n";

echo "Proposition 2: ";
for ($i = 0; $i < $months_len; $i++) {
	$month = $months[$i];
	if ($i % 2 == 1) {
		echo "$month ";
	}
}
