<?php

$value = readline("Question ? ");
if ($value === false) {
	die("Vous devez entrer une valeur valide");
}
echo $value;

echo PHP_EOL;

$number = (int) $value;
echo $value;
echo PHP_EOL;
