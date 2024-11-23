<?php

$actions = [
	1 => "Attaquer",
	2 => "Défendre",
	3 => "Se soigner",
	4 => "Fuir",
	5 => "Ne rien faire"
];

$actions_sentences = [
	0 => "Relancez le programme et entrez une action 1,2,3,4 ou 5",
	1 => "Vous attaquez",
	2 => "Vous défendez",
	3 => "Vous vous soignez",
	4 => "Vous fuyez",
	5 => "Vous ne faites rien"
];

$actions_str = "";

for ($i = 1; $i < count($actions) + 1; $i++) {
	$action = $actions[$i];
	$actions_str .= " $i: $action, ";
}

$user_action = (int) readline(
	"Entrez une action ($actions_str): "
);

$action = $actions_sentences[0];

if (array_key_exists($user_action, $actions_sentences)) {
	$action = $actions_sentences[$user_action];
}

echo $action;
