<?php

require_once __DIR__ . "/../utils/instruction.php";

// 8. Afficher les hommes et leur genre

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
	"Afficher les hommes et leur genre",
	data: $users,
	output: true,
);

foreach ($users as $user) {
	if ($user["gender"] === "M") {
		echo "Prénom = " . $user["firstname"];
		echo ", ";
		echo "Genre = " . $user["gender"];
		echo "\n";
	}
}
