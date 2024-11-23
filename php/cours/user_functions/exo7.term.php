<?php

function hello1($firstname = null)
{
	// Double égale
	if ($firstname == null) {
		return "Hello World \n";
	}

	return "Hello $firstname \n";
}

function hello2($firstname)
{
	if (strlen($firstname) === 0) {
		return "Hello World \n";
	}

	return "Hello $firstname \n";
}

$user_firstname = readline("Entrez votre prénom : ");
echo hello1($user_firstname);
echo hello2($user_firstname);
