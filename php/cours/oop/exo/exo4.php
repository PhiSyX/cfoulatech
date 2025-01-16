<?php

require "../Voiture.php";

$maVoiture1 = new Voiture("Jaune", 3200.0, 35_000);
var_dump($maVoiture1);

$maVoiture2 = new Voiture(
	unPoids: 1500.0,
	uneCouleur: "Rouge",
	unPrix: 35000,
);
var_dump($maVoiture2);

