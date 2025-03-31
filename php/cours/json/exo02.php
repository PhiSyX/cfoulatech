<?php

require_once "utils.php";

$json_data = [
	[
		"firstname" => "Tom",
		"lastname" => "Cruise",
		"lastMovie" => "Mission impossible",
		"isAmerican" => true
	],
	[
		"firstname" => "Omar",
		"lastname" => "Sy",
		"lastMovie" => "The Killer",
		"isAmerican" => false
	],
	[
		"firstname" => "Denzel",
		"lastname" => "Washington",
		"lastMovie" => "The Rift",
		"isAmerican" => true
	],
	[
		"firstname" => "Emilie",
		"lastname" => "Blunt",
		"lastMovie" => "Disclosure",
		"isAmerican" => false
	],
	[
		"firstname" => "Julia",
		"lastname" => "Roberts",
		"lastMovie" => "After the hunts",
		"isAmerican" => true
	]
];

echo json_pretty($json_data);
