<?php

$user_gender = readline("Quel est votre genre (M, F ou X) : ");

$male       = 'M';
$female     = 'F';
$non_binary = 'X';

if ($user_gender == $male) {
	echo "Vous êtes un homme.";
} elseif ($user_gender == $female) {
	echo "Vous êtes une femme.";
} elseif ($user_gender == $non_binary) {
	echo "Vous êtes non binaire.";
} else {
	echo "Erreur, vous n'avez pas introduis les bonnes valeurs.";
}
