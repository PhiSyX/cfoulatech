<?php

/*
$date1 = new DateTime();
//$date1 = new DateTime(timezone: new DateTimeZone("Europe/Brussels"));
var_dump($date1);

$date2 = new DateTime("07-12-1991 15:20:53");
var_dump($date2);
*/

require "./Voiture.php";
require "./Personne.php";

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

showVoiture($maVoiture);

$maVoiture->couleur = "Noire";
echo "Ma nouvelle couleur est : <strong>" . $maVoiture->couleur    . "</strong> <br>";
*/

/*
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
*/

/*
$maVoiture1 = new Voiture("Jaune", 3200.0, 35_000);
var_dump($maVoiture1);

$maVoiture2 = new Voiture(
	unPoids: 1500.0,
	uneCouleur: "Rouge",
	unPrix: 35000,
);
var_dump($maVoiture2);
*/

// function showVoiture(Voiture $voiture)
// {
// 	echo "La couleur de la voiture est : <strong>" . $voiture->getCouleur() . "</strong>   <br>";
// 	echo "La poids   de la voiture est : <strong>" . $voiture->getPoids()   . "</strong>Kg <br>";
// 	echo "Le prix    de la voiture est : <strong>" . $voiture->getPrix()    . "</strong>€  <br>";

// 	if ($voiture->hasMarque()) {
// 		echo "La marque  de la voiture est : <strong>" . $voiture->getMarque()  . "</strong> <br>";
// 	}

// 	echo "<br>";
// }

/*
function comparePrice(Voiture $voiture1, Voiture $voiture2)
{
	echo "La voiture ";
	if ($voiture1->isMoreExpensive($voiture2)) {
		echo $voiture1->getCouleur();
		echo " est <strong>plus chère</strong> que la voiture ";
		echo $voiture2->getCouleur();
	} else {
		echo $voiture2->getCouleur();
		echo " est <strong>moins chère</strong> que la voiture ";
		echo $voiture1->getCouleur();
	}

	echo "<br>";

	echo "Il y a une différence de <strong>{$voiture1->getDifference($voiture2)}</strong> €";

	echo "<br>";
}

$maVoiture1 = new Voiture("Jaune", 1330.5, 10000);
$maVoiture1->setMarque("Audi");
$maVoiture2 = new Voiture("Brune", 1900.5, 2000);
$maVoiture2->setMarque("BMW");

echo $maVoiture1;
echo $maVoiture2;

comparePrice($maVoiture1, $maVoiture2);
*/

/*
$personne1 = new Personne("Julien", 34, "M");
$personne2 = new Personne("Sarah", 27, "F");
$personne3 = new Personne("Mohamed", 15, "M");
$personne4 = new Personne("Konchita", 40, "X");
$personne5 = new Personne("Bruce", 45, "M");

// echo $personne1;
// echo $personne2;
// echo $personne3;
// echo $personne4;
// echo $personne5;

$personnes = [
	$personne1,
	$personne2,
	$personne3,
	$personne4,
	$personne5,
];
foreach ($personnes as $personne) {
	echo $personne;
}

if ($personne4->estPlusAgé($personne2)) {
	echo $personne4->getPrenom() . " a " . $personne4->getAge()  . " ans ";
	echo " et est plus âgée que ";
	echo $personne2->getPrenom() . " qui a " . $personne2->getAge() . " ans";
	echo "<br>";
}
*/
