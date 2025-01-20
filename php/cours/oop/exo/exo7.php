<?php

require_once "./classes/Personnage.php";

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
$winner = false;
$looser = false;
$nb_attaque = 0;

while ($winner === false) {
	$p1->lanceAttaque($p2);
	$p2->lanceAttaque($p1);

	$nb_attaque += 1;

	if ($p1->getVie() <= 0) {
		$winner = $p2;
		$looser = $p1;
		break;
	} else if ($p2->getVie() <= 0) {
		$winner = $p1;
		$looser = $p2;
		break;
	}
}

echo "Le personnage " . $winner->getNom() .
	" a battu le personnage " . $looser->getNom() .
	" en $nb_attaque coups. <br>"
;
echo "Et il lui reste " . $winner->getVie() . " de points de vie";
