<?php

/*
$date1 = new DateTime();
//$date1 = new DateTime(timezone: new DateTimeZone("Europe/Brussels"));
var_dump($date1);

$date2 = new DateTime("07-12-1991 15:20:53");
var_dump($date2);
*/

require "./Voiture.php";

/*
$maVoiture = new Voiture("blanche", 1500.0, 7800);
$maVoiture->demarrer();
echo "<br>";
$maVoiture->accelerer();
var_dump($maVoiture);
*/

/*
$maVoiture = new Voiture();
$maVoiture->couleur = "Blanche";
$maVoiture->poids = 79.9;
$maVoiture->prix = 500;

echo "La couleur de la voiture est : <strong>" . $maVoiture->couleur . "</strong> <br>";
echo "La poids   de la voiture est : <strong>" . $maVoiture->poids   . "</strong>Kg <br>";
echo "Le prix    de la voiture est : <strong>" . $maVoiture->prix    . "</strong>€ <br>";

$maVoiture->couleur = "Noire";
echo "Ma nouvelle couleur est : <strong>" . $maVoiture->couleur    . "</strong> <br>";
*/

$maTwingoRouge = new Voiture();

$maTwingoRouge->setCouleur("Rouge");
$maTwingoRouge->setPoids(3520.53);
$maTwingoRouge->setPrix(2500);

echo "La couleur de la voiture est : <strong>" . $maTwingoRouge->getCouleur() . "</strong>   <br>";
echo "La poids   de la voiture est : <strong>" . $maTwingoRouge->getPoids()   . "</strong>Kg <br>";
echo "Le prix    de la voiture est : <strong>" . $maTwingoRouge->getPrix()    . "</strong>€  <br> <br>";

$maTwingoRouge->addPrix(100);
echo "Ajout de <strong>100€</strong> au prix de la voiture: ";

if ($maTwingoRouge->getPrix() === 2600) {
	echo "le nouveau prix de la voiture est de : <strong>" . $maTwingoRouge->getPrix()    . "</strong>€  <br>";
}

echo "--------------------------------<br>";

$maPeugeotVerte = new Voiture();

$maPeugeotVerte->setCouleur("Verte");
$maPeugeotVerte->setPoids(4020.99);
$maPeugeotVerte->setPrix(2600);

echo "La couleur de la voiture est : <strong>" . $maPeugeotVerte->getCouleur() . "</strong>   <br>";
echo "La poids   de la voiture est : <strong>" . $maPeugeotVerte->getPoids()   . "</strong>Kg <br>";
echo "Le prix    de la voiture est : <strong>" . $maPeugeotVerte->getPrix()    . "</strong>€  <br> <br>";

$maPeugeotVerte->addPrix(100);
echo "Ajout de <strong>100€</strong> au prix de la voiture: ";

if ($maPeugeotVerte->getPrix() === 2700) {
	echo "le nouveau prix de la voiture est de : <strong>" . $maPeugeotVerte->getPrix()    . "</strong>€  <br>";
}

$diff = $maTwingoRouge->getPrix() - $maPeugeotVerte->getPrix();

if ($maTwingoRouge->getPrix() > $maPeugeotVerte->getPrix()) {
	echo "La voiture rouge est plus chère que la voiture verte, il y a une ";
	echo "différence de : <strong>$diff</strong>€";
} else {
	$diff = abs($diff);
	echo "La voiture verte est plus chère que la voiture rouge, il y a une ";
	echo "différence de : <strong>$diff</strong>€";
}
