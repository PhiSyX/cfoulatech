<?php

require_once "./Character.php";

$characters = [
	new Character("Ryu", 70, 24),
	new Character("Ken", 60, 20),
	new Character("Sub-Zero", 80, 48),
	new Character("Jin Kazama", 100, 46),
	new Character("Mario", 60, 42),
];

foreach ($characters as $character) {
	echo $character;
}

$p1 = $characters[3];
$p2 = $characters[0];

$winner = null;
$loser = null;

$total_attacks = 0;

while ($winner === null) {
	$p1->attack($p2);
	$p2->attack($p1);

	$total_attacks += 1;

	if ($p1->getHealthPoint() <= 0) {
		$winner = $p2;
		$loser = $p1;
		break;
	} elseif ($p2->getHealthPoint() <= 0) {
		$winner = $p1;
		$loser = $p2;
		break;
	}
}

echo "Le personnage " .
	$winner->getName() .
	" a battu le personnage " .
	$loser->getName() .
	" en $total_attacks coups. <br>";

if ($winner->getHealthPoint() <= 0) {
	echo "Et n'a plus de vie, donc ça veut dire qu'il est mort en même temps.";
} else {
	echo "Et lui reste " . $winner->getHealthPoint() . " de points de vie";
}
