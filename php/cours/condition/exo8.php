<?php

$male = 'M';
$female = 'F';

$user1 = [
	"firstname" => "Will",
	"lastname" => "Smith",
	"gender" => $male,
	"age" => 53,
	"vaccinated" => true,
];

$user2 = [
	"firstname" => "Lara",
	"lastname" => "Croft",
	"gender" => $female,
	"age" => 17,
	"vaccinated" => false,
];

$user3 = [
	"firstname" => "Marion",
	"lastname" => "Cotillard",
	"gender" => $female,
	"age" => 46,
	"vaccinated" => true,
];

$user = $user3;

$firstname = $user["firstname"];
$lastname = $user["lastname"];

$bracelets = [
	$female => "rose",
	$male => "bleu",
];

if ($user["age"] >= 18 && $user["vaccinated"]) {
	echo "Bienvenue dans le club $firstname $lastname.\n";
	$bracelet_color = $bracelets[$user["gender"]];
	echo "Prenez un bracelet $bracelet_color";
} else {
	$feminize = $user["gender"] === $female ? "e" : "";
	echo "Désolé $firstname $lastname, vous n'êtes ni majeur$feminize ni vacciné$feminize";
}
