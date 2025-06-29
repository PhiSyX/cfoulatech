<?php

require_once __DIR__ . "/../utils/instruction.php";

// 7. Répondre un message spécifique en fonction d'un chiffre entre 1 et 7.
echo instruction(
	"Répondre un message spécifique en fonction d'un chiffre entre 1 et 7.",
	input: true,
);

$user_number = (int)readline("Quel est votre nombre ? ");

// Solution 1:

echo display_output();

echo "Solution 1: ";
switch ($user_number) {
	case 1:
		echo "bonjour";
		break;

	case 2:
		echo "au revoir";
		break;

	case 3:
		echo "bien joué";
		break;

	case 4:
		echo "bonne nuit";
		break;

	case 5:
		echo "à tantôt";
		break;

	case 6:
		echo "arrête un peu";
		break;

	case 7:
		echo "10 + 10 = 20";
		break;

	default:
		echo "La terre est carrée";
}

echo "\n\n";

// Solution 2:

$responses = [
	"La terre est carrée",
	"bonjour",
	"au revoir",
	"bien joué",
	"bonne nuit",
	"à tantôt",
	"arrête un peu",
	"10 + 10 = 20",
];

echo "Solution 2: ";
if (array_key_exists($user_number, $responses)) {
	echo $responses[$user_number];
} else {
	echo $responses[0];
}
