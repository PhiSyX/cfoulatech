<?php

require_once "./Personnage.php";

$personnages = [
	new Personnage("Ryu", 70, 24),
	new Personnage("Ken", 60, 20),
	new Personnage("Sub-Zero", 80, 48),
	new Personnage("Jin Kazama", 100, 46),
	new Personnage("Mario", 60, 42),
];

foreach ($personnages as $personnage) {
	echo $personnage;
}

$p1 = $personnages[3];
$p2 = $personnages[0];

$winner = null;
$loser = null;

$nb_attack = 0;

while ($winner === null) {
	$p1->lanceAttaque($p2);
	$p2->lanceAttaque($p1);

	$nb_attack += 1;

	if ($p1->getVie() <= 0) {
		$winner = $p2;
		$loser = $p1;
		break;
	} else if ($p2->getVie() <= 0) {
		$winner = $p1;
		$loser = $p2;
		break;
	}
}

echo "Le personnage " . $winner->getNom() .
	 " a battu le personnage " . $loser->getNom() .
	 " en $nb_attack coups. <br>"
;

if ($winner->getVie() <= 0) {
	echo "Et n'a plus de vie, donc ça veut dire qu'il est mort en même temps.";
}else {
	echo "Et lui reste " . $winner->getVie() . " de points de vie";
}

