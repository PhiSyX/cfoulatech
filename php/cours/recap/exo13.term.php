<?php

require_once __DIR__ . "/../utils/instruction.php";

echo instruction(
	"Inviter l'utilisateur à entrer des chiffres " .
		"et les afficher de manière décroissante. " .
		"Afficher les chiffres de multiple de 2, 3 et 5",
	input: true,
);

$user_figures = [];

while (true) {
	$user_maybe_figure = readline(
		"Quel est votre chiffre ? (tapez 0 pour arrêter) "
	);

	if (!is_numeric($user_maybe_figure) || strlen($user_maybe_figure) > 1) {
		echo "Il ne s'agit pas d'un chiffre entre 0 et 9.\n";
		continue;
	}

	$user_figure = (int) $user_maybe_figure;

	$user_figures[] = $user_figure;

	if ($user_figure === 0) {
		break;
	}
}

rsort($user_figures);

echo display_output();

foreach ($user_figures as $number) {
	echo $number . ", ";
}

echo "\n\n";

$multiples = [2, 3, 5];

foreach ($user_figures as $number) {
	foreach ($multiples as $multiple) {
		if ($number % $multiple === 0) {
			echo "$number est un multiple de $multiple\n";
		}
	}
}

echo "\n";

echo "Programme terminé";
