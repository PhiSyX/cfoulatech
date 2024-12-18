<?php

function tailleTab(array $tab): int
{
	return sizeof($tab);
}

function affichageTabSimple(array $tableau)
{
	foreach ($tableau as $valeur) {
		echo $valeur . "\n";
	}
}

function estLeMeme(array $tab1, array $tab2): bool
{
	if (tailleTab($tab1) !== tailleTab($tab2)) {
		return false;
	}

	for ($i = 0; $i < tailleTab($tab1); $i++) {
		$cur1 = $tab1[$i];
		$cur2 = $tab2[$i];

		if ($cur1 !== $cur2) {
			return false;
		}
	}

	return true;
}
