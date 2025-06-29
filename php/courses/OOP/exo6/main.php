<?php

require_once "./Vehicle.php";

require_once "./Plane.php";
require_once "./Boat.php";
require_once "./Moto.php";
require_once "./Bike.php";

$moto1 = new Moto("M1", "MV1", 2000, "Belgique", false);
$moto2 = new Moto("M2", "MV2", 3500, "France", true);
$moto3 = new Moto("M3", "MV3", 3200, "France", false);
$moto4 = new Moto("M4", "MV4", 2200, "Italie", true);

$bike1 = new Bike("V1", "VV1", 100, "UK", true);
$bike2 = new Bike("V2", "VV2", 120, "Allemagne", false);

$plane1 = new Plane("A1", "AV1", 15000, 300);
$plane2 = new Plane("A2", "AV2", 30000, 270);

$boat1 = new Boat("B1", "BV1", 15000, 600, true, false);
$boat2 = new Boat("B2", "BV2", 30000, 1040, false, true);

// 1)
$moto1->doWheeling();
$bike1->doWheeling();

echo "<hr>";

// 2)
$boat1->start();
echo $boat1->moor();
$boat1->stop();

echo "<hr>";

// 3)
$boat2->stop();
$boat2->start();
echo $boat2->moor();

echo "<hr>";

// 4)

$bike_speed_diff = abs($bike1->getMaxSpeed() - $bike2->getMaxSpeed());
if ($bike1->getMaxSpeed() > $bike2->getMaxSpeed()) {
	echo "Le vélo le plus rapide est " . $bike1->getName();
} else {
	echo "Le vélo le plus rapide est " . $bike2->getName();
}
echo " avec une différence de $bike_speed_diff";
var_dump($bike1, $bike2);

echo "<hr>";

// 5)

$plane_capacity_diff = abs($plane1->getCapacity() - $plane2->getCapacity());
if ($plane1->getCapacity() > $plane2->getMaxSpeed()) {
	echo "L'avion avec le plus de capacité est " . $plane1->getName();
} else {
	echo "L'avion avec le plus de capacité est " . $plane2->getName();
}
echo " avec une différence de $plane_capacity_diff";
var_dump($plane1, $plane2);

echo "<hr>";

// 6

function isConnectedVehicle(array $vehicules): void
{
	echo "<ul>";
	foreach ($vehicules as $vehicule) {
		if ($vehicule->getConnecte()) {
			echo "<li>" . $vehicule->getNom() . " est connecté</li>";
		}
	}
	echo "</ul>";
}

isConnectedVehicle([$moto1, $moto2, $moto3, $moto4, $bike1, $bike2]);

echo "<hr>";

// 7)

function displayVehicleOfSameCountry(array $vehicles): void
{
	$countries = [];

	foreach ($vehicles as $vehicle) {
		$countries[$vehicle->getPays()][] = $vehicle;
	}

	echo "<ul>";
	foreach ($countries as $country_name => $vehicles) {
		echo "<li>Véhicule de " . $country_name . "<br>";
		echo "<ol>";
		foreach ($vehicles as $vehicle) {
			echo "<li>" . $vehicle->getNom() . "</li>";
		}
		echo "</ol>";
		echo "</li>";
	}
	echo "</ul>";
}

displayVehicleOfSameCountry([$moto1, $moto2, $moto3, $moto4]);

echo "<hr>";

// 8)
function vehicleOrderedByCapacityName(array $vehicles): array
{
	$order = [];

	foreach ($vehicles as $vehicle) {
		if (!isset($order[0])) {
			array_push($order, $vehicle);
			continue;
		}

		if ($vehicle->getCapacite() >= $order[0]->getCapacite()) {
			array_unshift($order, $vehicle);
		} else {
			array_push($order, $vehicle);
		}
	}

	return $order;
}

foreach (
	vehicleOrderedByCapacityName([$plane1, $plane2, $boat1, $boat2])
	as $vehicle
) {
	echo "Le véhicule " .
		$vehicle->getNom() .
		" comporte " .
		$vehicle->getCapacite() .
		" places<br>";
}

echo "<hr>";

// 10) Créez une fonction qui reçoit un tableau de tous les véhicules et me renvoi le véhicule qui
// est le plus rapide. Il affichera son nom et sa vitesseMax.

function findFastestVehicle(array $vehicules): Vehicule
{
	$rapide = array_shift($vehicules);

	foreach ($vehicules as $vehicule) {
		if ($vehicule->getVitesseMax() > $rapide->getVitesseMax()) {
			$rapide = $vehicule;
		}
	}

	return $rapide;
}

$fastest_vehicle = findFastestVehicle([
	$moto1,
	$moto2,
	$moto3,
	$moto4,
	$bike1,
	$bike2,
	$plane1,
	$plane2,
	$boat1,
	$boat2,
]);
echo "Le véhicule le plus rapide est : " . $fastest_vehicle->getName() . "<br>";

echo "<hr>";
