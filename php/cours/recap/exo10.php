<?php

require_once __DIR__ . "/../utils/instruction.php";

$users = [
	[
		"firstname" => "John",
		"notes" => [100, 73, 94, 12, 38],
		"gender" => "M",
	],

	[
		"firstname" => "Jules",
		"notes" => [100, 99, 98, 30, 77],
		"gender" => "M",
	],

	[
		"firstname" => "Roger",
		"notes" => [60, 65, 64, 62, 68],
		"gender" => "M",
	],

	[
		"firstname" => "Inaya",
		"notes" => [80, 72, 42, 94, 98],
		"gender" => "F",
	],

	[
		"firstname" => "Amina",
		"notes" => [81, 13, 97, 61, 73],
		"gender" => "F",
	]
];

echo instruction(
	"Afficher tous les prénoms et toutes les notes inversées",
	data: $users,
	output: true,
);


foreach ($users as $user) {
	echo "Voici les notes de " . $user["firstname"] . ": ";

	$notes_len = sizeof($user["notes"]);

	for ($n = $notes_len - 1; $n >= 0; $n--) {
		$current_iter_note = $user["notes"][$n];

		echo $current_iter_note . " ";
	}

	echo "\n";
}
