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
	],
];

echo instruction(
	"Afficher la moyenne de chaque utilisateurs",
	data: $users,
	output: true,
);

foreach ($users as $user) {
	echo $user["firstname"] . " a une moyenne de ";

	$notes_len = sizeof($user["notes"]);

	$average = 0;

	for ($n = 0; $n < $notes_len; $n++) {
		$current_iter_note = $user["notes"][$n];
		$average += $current_iter_note;
	}

	echo $average / $notes_len;

	echo "\n";
}
