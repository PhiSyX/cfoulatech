<?php

require_once "./Person.php";

$person1 = new Person("Julien", gender: "M", age: 34);
$person2 = new Person("Sarah", gender: "F", age: 27);
$person3 = new Person("Mohamed", gender: "M", age: 15);
$person4 = new Person("Konchita", gender: "X", age: 40);
$person5 = new Person("Bruce", gender: "M", age: 45);

// echo $person1;
// echo $person2;
// echo $person3;
// echo $person4;
// echo $person5;

$persons = [$person1, $person2, $person3, $person4, $person5];
foreach ($persons as $personne) {
	echo $personne;
}

echo "<br>";

$p1 = $person1;
$p2 = $person2;

if ($p1->isOlderThan($p2)) {
	echo $p1->getFirstname() . " a " . $p1->getAge() . " ans ";
	echo " et est plus âgée que ";
	echo $p2->getFirstname() . " qui a " . $p2->getAge() . " ans";
	echo "<br>";
}
