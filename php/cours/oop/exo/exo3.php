<?php
require "../Voiture.php";

$maTwingoRouge = new Voiture();

$maTwingoRouge->setCouleur("Rouge");
$maTwingoRouge->setPoids(3520.53);
$maTwingoRouge->setPrix(2500);

showVoiture($maTwingoRouge);

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

showVoiture($maPeugeotVerte);

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
