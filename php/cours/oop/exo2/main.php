<?php

require_once "./Voiture.php";

$v1 = new Voiture("Audi", "Noire", 1750.4, 10_000);
var_dump($v1);

$v2 = new Voiture(marque: "BMW", poids: 1500.0, couleur: "Rouge", prix: 35_000);
var_dump($v2);

$diff = abs($v1->getPrix() - $v2->getPrix());
if ($v1->plusChère($v2)) {
	echo "La voiture <strong>" .
		$v1->getCouleur() .
		"</strong> est plus chère " .
		"que la voiture <strong>" .
		$v2->getCouleur() .
		"</strong>";
	echo ", Il y a une différence de <strong>$diff</strong>€. <br>";
} else {
	echo "La voiture <strong>" .
		$v2->getCouleur() .
		"</strong> est plus chère " .
		"que la voiture <strong>" .
		$v1->getCouleur() .
		"</strong>";
	echo ", Il y a une différence de <strong>$diff</strong>€. <br>";
}
