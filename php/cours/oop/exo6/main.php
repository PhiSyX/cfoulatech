<?php

require_once "./Vehicule.php";

require_once "./Avion.php";
require_once "./Bateau.php";
require_once "./Moto.php";
require_once "./Velo.php";

$moto1 = new Moto("M1", "MV1", 2000, "Belgique", false);
$moto2 = new Moto("M2", "MV2", 3500, "France", true);
$moto3 = new Moto("M3", "MV3", 3200, "France", false);
$moto4 = new Moto("M4", "MV4", 2200, "Italie", true);

$velo1 = new Velo("V1", "VV1", 100, "UK", true);
$velo2 = new Velo("V2", "VV2", 120, "Allemagne", false);

$avion1 = new Avion("A1", "AV1", 15000, 300);
$avion2 = new Avion("A2", "AV2", 30000, 270);

$bateau1 = new Bateau("B1", "BV1", 15000, 600, true, false);
$bateau2 = new Bateau("B2", "BV2", 30000, 1040, false, true);

// 1)
$moto1->faireWheeling();
$velo1->faireWheeling();

echo "<hr>";

// 2)
$bateau1->demarrer();
echo $bateau1->amarrer();
$bateau1->arreter();

echo "<hr>";

// 3)
$bateau2->arreter();
$bateau2->demarrer();
echo $bateau2->amarrer();

echo "<hr>";

// 4)

$vitesseVeloDiff = abs($velo1->getVitesseMax() - $velo2->getVitesseMax());
if ($velo1->getVitesseMax() > $velo2->getVitesseMax()) {
	echo "Le vélo le plus rapide est " . $velo1->getNom();
} else {
	echo "Le vélo le plus rapide est " . $velo2->getNom();
}
echo " avec une différence de $vitesseVeloDiff";
var_dump($velo1, $velo2);

echo "<hr>";

// 5)

$capaciteAvionDiff = abs($avion1->getCapacite() - $avion2->getCapacite());
if ($avion1->getCapacite() > $avion2->getVitesseMax()) {
	echo "L'avion avec le plus de capacité est " . $avion1->getNom();
} else {
	echo "L'avion avec le plus de capacité est " . $avion2->getNom();
}
echo " avec une différence de $capaciteAvionDiff";
var_dump($avion1, $avion2);

echo "<hr>";

// 6

function estUnVehiculeConnecte(array $vehicules): void
{
	echo "<ul>";
	foreach ($vehicules as $vehicule) {
		if ($vehicule->getConnecte()) {
			echo "<li>" . $vehicule->getNom() . " est connecté</li>";
		}
	}
	echo "</ul>";
}

estUnVehiculeConnecte([$moto1, $moto2, $moto3, $moto4, $velo1, $velo2]);

echo "<hr>";

// 7)

function montrerVehiculeDuMemePays(array $vehicules): void
{
	$pays = [];

	foreach ($vehicules as $vehicule) {
		$pays[$vehicule->getPays()][] = $vehicule;
	}

	echo "<ul>";
	foreach ($pays as $nomPays => $vehicules) {
		echo "<li>Véhicule de " . $nomPays . "<br>";
		echo "<ol>";
		foreach ($vehicules as $vehicule) {
			echo "<li>" . $vehicule->getNom() . "</li>";
		}
		echo "</ol>";
		echo "</li>";
	}
	echo "</ul>";
}

montrerVehiculeDuMemePays([$moto1, $moto2, $moto3, $moto4]);

echo "<hr>";

// 8)
function afficherNomCapaciteVehicule(array $vehicules): array
{
	$ordres = [];

	foreach ($vehicules as $vehicule) {
		if (!isset($ordres[0])) {
			array_push($ordres, $vehicule);
			continue;
		}

		if ($vehicule->getCapacite() >= $ordres[0]->getCapacite()) {
			array_unshift($ordres, $vehicule);
		} else {
			array_push($ordres, $vehicule);
		}
	}

	return $ordres;
}

foreach (afficherNomCapaciteVehicule([$avion1, $avion2, $bateau1, $bateau2]) as $vehicule) {
	echo "Le véhicule " . $vehicule->getNom() . " comporte " . $vehicule->getCapacite() . " places<br>";
}

echo "<hr>";

// 10) Créez une fonction qui reçoit un tableau de tous les véhicules et me renvoi le véhicule qui
// est le plus rapide. Il affichera son nom et sa vitesseMax.

function vehiculeLePlusRapide(array $vehicules): Vehicule
{
	$rapide = array_shift($vehicules);

	foreach ($vehicules as $vehicule) {
		if ($vehicule->getVitesseMax() > $rapide->getVitesseMax()) {
			$rapide = $vehicule;
		}
	}

	return $rapide;
}

$rv = vehiculeLePlusRapide([
	$moto1,
	$moto2,
	$moto3,
	$moto4,
	$velo1,
	$velo2,
	$avion1,
	$avion2,
	$bateau1,
	$bateau2,
]);
echo "Le véhicule le plus rapide est : " . $rv->getNom() . "<br>";

echo "<hr>";
