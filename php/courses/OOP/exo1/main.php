<?php

require_once "./Car.php";

$car1 = new Car();
var_dump($car1);

// NOTE: mauvaise pratique
// $car1->color = "Rouge";
// $car1->weight = 3_500;
// $car1->price = 10_000;

// NOTE: bonne pratique
$car1->setColor("Rouge");
$car1->setWeight(3500);
$car1->setPrice(10_000);
var_dump($car1);

// 4) Essayer d’appeler les deux méthodes que vous avez crée et de les afficher
//    dans le navigateur.

echo "<hr>";

$car1->start();
$car1->accelerate();

echo "<hr>";

// 5)

// NOTE: mauvaise pratique
// echo "Ma voiture est de couleur : <strong>" . $car1->color . "</strong> <br>";
// echo "Elle a un poids de : <strong>" . $car1->weight . "</strong>Kg <br>";
// echo "Elle a un prix de : <strong>" . $car1->price . "</strong>Kg <br>";

// NOTE: bonne pratique
echo "Ma voiture est de couleur : <strong>" .
	$car1->getColor() .
	"</strong> <br>";
echo "Elle a un poids de : <strong>" . $car1->getWeight() . "</strong>Kg <br>";
echo "Elle a un prix de : <strong>" . $car1->getPrice() . "</strong>Kg <br>";

// NOTE: mauvaise pratique
// $car1->color = "Noire";
// echo "Ma nouvelle couleur de voiture est : <strong>" . $car1->color . "</strong> <br>";

// NOTE: bonne pratique
$car1->setColor("Jaune");
echo "Ma nouvelle couleur de voiture est : <strong>" .
	$car1->getColor() .
	"</strong> <br>";

// 6)
$car1->setPrice(11_000);
$car1->setWeight(3_800);
var_dump($car1);

// 9)

echo "L'ancien prix de ma voiture <strong>" . $car1->getPrice() . "</strong>€<br>";

$car1->addPrice(200);

echo "Le nouveau prix de ma voiture <strong>" .
	$car1->getPrice() .
	"</strong>€<br>";

echo "<hr>";

// 10)

$v2 = new Car();
$v2->setColor("Verte");
$v2->setPrice(5000);
$v2->setWeight(600.95);

echo "Ma voiture est de couleur : <strong>" .
	$v2->getColor() .
	"</strong> <br>";
echo "Elle a un poids de : <strong>" . $v2->getWeight() . "</strong>Kg <br>";
echo "Elle a un prix de : <strong>" . $v2->getPrice() . "</strong>Kg <br>";

$diff = abs($car1->getPrice() - $v2->getPrice());
if ($car1->getPrice() > $v2->getPrice()) {
	echo "La voiture <strong>" .
		$car1->getColor() .
		"</strong> est plus chère " .
		"que la voiture <strong>" .
		$v2->getColor() .
		"</strong>";
	echo ", Il y a une différence de <strong>$diff</strong>€. <br>";
} else {
	echo "La voiture <strong>" .
		$v2->getColor() .
		"</strong> est plus chère " .
		"que la voiture <strong>" .
		$car1->getColor() .
		"</strong>";
	echo ", Il y a une différence de <strong>$diff</strong>€. <br>";
}
