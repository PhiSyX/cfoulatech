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
	"Afficher les femmes et leur note maximale",
	data: $users,
	output: true,
);

foreach ($users as $user) {
	if ($user["gender"] === "F") {
		// $highest_note = max($user["notes"]);
		$notes_len = sizeof($user["notes"]);
		$highest_note = $user["notes"][0];
		for ($n = 1; $n < $notes_len; $n++) {
			$current_iter_note = $user["notes"][$n];
			if ($current_iter_note > $highest_note) {
				$highest_note = $current_iter_note;
			}
		}
		echo "La note maximale de " . $user["firstname"] . " est de $highest_note \n";
	}
}
