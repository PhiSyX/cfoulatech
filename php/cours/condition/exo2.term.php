<?php

$user_gender = readline("Quel est votre genre (M, F ou X) : ");

$male = 'M';
$female = 'F';
$non_binary = 'X';

if ($user_gender == $male) {
	echo "Vous êtes un homme.";
} else if ($user_gender == $female) {
	echo "Vous êtes une femme.";
} else if ($user_gender == $non_binary) {
	echo "Vous êtes non binaire.";
} else {
	echo "Erreur, vous n'avez pas introduis les bonnes valeurs.";
}
