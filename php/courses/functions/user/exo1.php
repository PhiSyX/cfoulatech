<?php

function is_adult(int $age): bool
{
	return $age >= 18;
}

function display_adult_sentence(int $age)
{
	if (is_adult($age)) {
		echo "Vous êtes majeur";
	} else {
		echo "Vous êtes mineur";
	}
}

$age_utilisateur = (int)readline("Entrez votre âge : ");
display_adult_sentence($age_utilisateur);
