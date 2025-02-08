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
	"Afficher toutes les données des utilisateurs",
	data: $users,
	output: true,
);

$score = 100;

foreach ($users as $user) {
	echo "Prénom = " . $user["firstname"] . ", ";
	echo "Genre = " . $user["gender"] . ", ";

	echo "Notes = ";
	foreach ($user["notes"] as $note) {
		echo "$note/$score, ";
	}

	echo "\n";
}
