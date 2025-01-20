<?php

require_once "../Voiture.php";

$maVoiture1 = new Voiture("Jaune", 1330.5, 10000);
$maVoiture1->setMarque("Audi");
$maVoiture2 = new Voiture("Brune", 1900.5, 2000);
$maVoiture2->setMarque("BMW");

echo $maVoiture1;
echo $maVoiture2;

comparePrixVoiture($maVoiture1, $maVoiture2);
