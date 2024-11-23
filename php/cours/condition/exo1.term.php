<?php

$user_age = readline("Entrez un age : ");
$adult_age = 18;

if ($user_age > $adult_age) {
	echo "Vous êtes un adulte et vous avez $user_age ans";
} else if ($user_age == $adult_age) {
	echo "Bienvenue à l'age adulte";
} else {
	echo "Vous avez $user_age ans et vous n'êtes pas encore un adulte";
}
