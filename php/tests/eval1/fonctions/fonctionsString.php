<?php

function metEnMaj(string $str): string
{
	return strtoupper($str);
}

function estPalindrome(string $mot): string
{
	if (metEnMaj($mot) === metEnMaj(strrev($mot))) {
		return 'Le mot "' . $mot . '" est un palindrome.';
	} else {
		return 'Le mot "' . $mot . '" n\'est pas un palindrome.';
	}
}

function estPasNumerique(mixed $valeur): bool
{
	return ! is_numeric($valeur);
}
