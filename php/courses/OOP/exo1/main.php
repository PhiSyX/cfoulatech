<?php

require_once "./Voiture.php";

$v1 = new Voiture();
var_dump($v1);

// NOTE: mauvaise pratique
// $v1->couleur = "Rouge";
// $v1->poids = 3_500;
// $v1->prix = 10_000;

// NOTE: bonne pratique
$v1->setCouleur("Rouge");
$v1->setPoids(3500);
$v1->setPrix(10_000);
var_dump($v1);

// 4) Essayer d’appeler les deux méthodes que vous avez crée et de les afficher
//    dans le navigateur.

echo "<hr>";

$v1->demarrer();
$v1->accelerer();

echo "<hr>";

// 5)

// NOTE: mauvaise pratique
// echo "Ma voiture est de couleur : <strong>" . $v1->couleur . "</strong> <br>";
// echo "Elle a un poids de : <strong>" . $v1->poids . "</strong>Kg <br>";
// echo "Elle a un prix de : <strong>" . $v1->prix . "</strong>Kg <br>";

// NOTE: bonne pratique
echo "Ma voiture est de couleur : <strong>" .
	$v1->getCouleur() .
	"</strong> <br>";
echo "Elle a un poids de : <strong>" . $v1->getPoids() . "</strong>Kg <br>";
echo "Elle a un prix de : <strong>" . $v1->getPrix() . "</strong>Kg <br>";

// NOTE: mauvaise pratique
// $v1->couleur = "Noire";
// echo "Ma nouvelle couleur de voiture est : <strong>" . $v1->couleur . "</strong> <br>";

// NOTE: bonne pratique
$v1->setCouleur("Jaune");
echo "Ma nouvelle couleur de voiture est : <strong>" .
	$v1->getCouleur() .
	"</strong> <br>";

// 6)
$v1->setPrix(11_000);
$v1->setPoids(3_800);
var_dump($v1);

// 9)

echo "L'ancien prix de ma voiture <strong>" . $v1->getPrix() . "</strong>€<br>";

$v1->addPrix(200);

echo "Le nouveau prix de ma voiture <strong>" .
	$v1->getPrix() .
	"</strong>€<br>";

echo "<hr>";

// 10)

$v2 = new Voiture();
$v2->setCouleur("Verte");
$v2->setPrix(5000);
$v2->setPoids(600.95);

echo "Ma voiture est de couleur : <strong>" .
	$v2->getCouleur() .
	"</strong> <br>";
echo "Elle a un poids de : <strong>" . $v2->getPoids() . "</strong>Kg <br>";
echo "Elle a un prix de : <strong>" . $v2->getPrix() . "</strong>Kg <br>";

$diff = abs($v1->getPrix() - $v2->getPrix());
if ($v1->getPrix() > $v2->getPrix()) {
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
