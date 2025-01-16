<?php

require "../Personne.php";

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
	echo $personne4->getPrénom() . " a " . $personne4->getAge()  . " ans ";
	echo " et est plus âgée que ";
	echo $personne2->getPrénom() . " qui a " . $personne2->getAge() . " ans";
	echo "<br>";
}
