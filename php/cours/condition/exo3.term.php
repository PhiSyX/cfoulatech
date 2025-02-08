<?php

$user_action = (int) readline(
	"Entrez une action : (1 : Attaquer, 2 : Défendre, 3 : Se soigner, 4 : Fuir, 5 : Ne rien faire) : "
);

if ($user_action === 1) {
	echo "Vous attaquez";
} elseif ($user_action === 2) {
	echo "Vous défendez";
} elseif ($user_action === 3) {
	echo "Vous vous soignez";
} elseif ($user_action === 4) {
	echo "Vous fuyez";
} elseif ($user_action === 5) {
	echo "Vous ne faites rien";
} else {
	echo "Relancez le programme et Entrez une action 1,2,3,4 ou 5";
}
