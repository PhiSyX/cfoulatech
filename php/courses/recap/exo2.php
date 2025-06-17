<?php

require_once __DIR__ . "/../utils/instruction.php";

// 2. Affichez les prénoms les-uns en dessous de l'autre en utilisant une boucle.
echo instruction(
	"Affichez les prénoms les-uns en dessous des autres avec une boucle",
	output: true,
);

$user1 = "Mike";
$user2 = "Say";
$user3 = "Erica";
$user4 = "Jérémie";
$user5 = "Timothy";
$user6 = "Maxime";
$user7 = "Carina";
$user8 = "Zakaria";
$user9 = "Clovis";
$user10 = "Mohamed-Ali";

$users = [
	$user1,
	$user2,
	$user3,
	$user4,
	$user5,
	$user6,
	$user7,
	$user8,
	$user9,
	$user10,
];

foreach ($users as $user) {
	echo "Le prénom est $user \n";
}
