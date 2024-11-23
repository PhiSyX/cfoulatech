<?php

$user_action = (int) readline(
	"Entrez une action : (1 : Attaquer, 2 : Défendre, 3 : Se soigner, 4 : Fuir, 5 : Ne rien faire) : "
);

switch ($user_action) {
	case 1: {
			echo "Vous attaquez !";
		}
		break;

	case 2: {
			echo "Vous défendez !";
		}
		break;

	case 3: {
			echo "Vous vous soignez !";
		}
		break;
	case 4: {
			echo "Vous fuyez !";
		}
		break;

	case 5: {
			echo "Vous ne faites rien !";
		}
		break;

	default: {
			echo "Relancez le programme et Entrez une action 1,2,3,4 ou 5";
		}
		break;
}
