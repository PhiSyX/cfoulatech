<?php

require "./fonctions/fonctionsString.php";
require "./fonctions/fonctionsTab.php";

// 5)
$mot = readline("Veuillez entrer un mot : ");

if (! estPasNumerique($mot)) {
	echo $mot  . " est une valeur numérique, veuillez introduire un mot. \n";
} else {
	$r = estPalindrome($mot);
	echo $r . "\n";
}

// 8)
$utilisateurs = [
	[
		'prenom' => 'Julien',
		'nom' => 'Dunia',
	],
	[
		'prenom' => 'Mike',
		'nom' => 'Salvatore',
	],
];

// 9)
foreach ($utilisateurs as $utilisateur) {
	foreach ($utilisateur as $cle => $val) {
		echo $cle . " = " . $val . " ";
	}

	echo "\n";
}

// 10)
foreach ($utilisateurs as $utilisateur) {
	echo 'Le prénom est "'
		. $utilisateur["prenom"]
		. '" et le nom est "'
		. metEnMaj($utilisateur["nom"])
		. '"'
		. "\n";
}

// 11)

$tab1 = [89.5, 75.5, 49.5];
$tab2 = [96.0, 75.0, 60.0];
$tab3 = [89.5, 75.5, 49.5];
$tab4 = [48.5, 99.0];

echo "Le tableau \$tab1 est de " . tailleTab($tab1) . " éléments. \n";
echo "Le tableau \$tab2 est de " . tailleTab($tab2) . " éléments. \n";
echo "Le tableau \$tab3 est de " . tailleTab($tab3) . " éléments. \n";
echo "Le tableau \$tab4 est de " . tailleTab($tab4) . " éléments. \n";

// 12)
echo "Parcours du tableau \$tab1 : \n";
affichageTabSimple($tab1);
echo "\n";

echo "Parcours du tableau \$tab2 : \n";
affichageTabSimple($tab2);
echo "\n";

echo "Parcours du tableau \$tab3 : \n";
affichageTabSimple($tab3);
echo "\n";

echo "Parcours du tableau \$tab4 : \n";
affichageTabSimple($tab4);
echo "\n";

// 14)
if (estLeMeme($tab1, $tab2)) {
	echo '$tab1 et $tab2 sont identiques.' . "\n";
} else {
	echo '$tab1 et $tab2 ne sont pas identiques.' . "\n";
}

// 15)
if (estLeMeme($tab1, $tab3)) {
	echo '$tab1 et $tab3 sont identiques.' . "\n";
} else {
	echo '$tab1 et $tab3 ne sont pas identiques.' . "\n";
}
