<?php

require_once __DIR__ . "/../utils/instruction.php";

// 3. Vérifiez que le nombre entré par l'utilisateur à partir de la console soit pair ou impair.
echo instruction(
	"Vérifiez que le nombre entré par l'utilisateur à partir de la console soit pair ou impair",
	input: true,
);

$maybe_user_number = readline("Entrez un nombre : ");

echo display_output();

if (!is_numeric($maybe_user_number)) {
	exit("Vous n'avez pas introduit un nombre valide.");
}

$user_number = (int) $maybe_user_number;
$is_pair = $user_number % 2 === 0;
if ($is_pair) {
	echo "Le nombre que vous avez entré est pair.\n";
} else {
	echo "Le nombre que vous avez entré est impair.\n";
}
