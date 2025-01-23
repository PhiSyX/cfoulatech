<?php

require_once "../classes/Personne.php";

$personne1 = new Personne("Julien",   gender: "M", age: 34);
$personne2 = new Personne("Sarah",    gender: "F", age: 27);
$personne3 = new Personne("Mohamed",  gender: "M", age: 15);
$personne4 = new Personne("Konchita", gender: "X", age: 40);
$personne5 = new Personne("Bruce",    gender: "M", age: 45);

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

echo "<br>";

{
	$p1 = $personne1;
	$p2 = $personne2;

	if ($p1->estPlusAgé($p2)) {
		echo $p1->getPrénom() . " a " . $p1->getAge()  . " ans ";
		echo " et est plus âgée que ";
		echo $p2->getPrénom() . " qui a " . $p2->getAge() . " ans";
		echo "<br>";
	}
}
