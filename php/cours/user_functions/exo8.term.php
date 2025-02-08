<?php

function display_welcome(
	string $lastname,
	string $firstname,
	string $email,
	int $age
) {
	echo "Bienvenue $lastname $firstname !\n";
	echo "Vous avez $age ans.\n";
	echo "Voici votre adresse mail: $email.\n";
}

function welcome_str(
	string $lastname,
	string $firstname,
	string $email,
	int $age
) {
	return "Bienvenue $lastname $firstname !\n" .
		"Vous avez $age ans.\n" .
		"Voici votre adresse mail: $email.";
}

function welcome_array(
	string $lastname,
	string $firstname,
	string $email,
	int $age
) {
	return [
		"Bienvenue $lastname $firstname !",
		"Vous avez $age ans.",
		"Voici votre adresse mail: $email.",
	];
}

$user_lastname = readline("Entrez votre nom : ");
$user_firstname = readline("Entrez votre prénom : ");
$user_email = readline("Entrez votre adresse mail : ");
$user_age = (int) readline("Entrez votre age : ");

display_welcome($user_lastname, $user_firstname, $user_email, $user_age);

echo "\n-------------\n";

$output = welcome_str($user_lastname, $user_firstname, $user_email, $user_age);

echo $output;

echo "\n-------------\n";

$sentences = welcome_array(
	$user_lastname,
	$user_firstname,
	$user_email,
	$user_age
);

foreach ($sentences as $sentence) {
	echo $sentence . "\n";
}
