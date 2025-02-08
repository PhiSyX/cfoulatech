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
$months_len = sizeof($months);

echo instruction("
    Afficher les mois séparés par des tirets en utilisant une boucle foreach.
    NOTE: Il NE DOIT PAS y avoir un tiret à la suite de décembre.
", data: $months, output: true);

// v1. C'est une possibilité, quand on sait exactement ce que le tableau comporte.

foreach ($months as $month) {
	if ($month === "Décembre") {
		echo $month;
	} else {
		echo "$month - ";
	}
}

echo "\n";

// v2. C'en est une autre. Il faut être sûr que le tableau comporte au moins 1 élément.

echo $months[0];
for ($index = 1; $index < $months_len; $index++) {
	$month = $months[$index];
	echo " - $month";
}

echo "\n";

// v3. Fonctionnement plus générale.

foreach ($months as $index => $month) {
	echo $month;
	if ($index !== $months_len - 1) {
		echo " - ";
	}
}
