<?php

require_once "./PersonnageJeux.php";

class Mage extends PersonnageJeux
{
	public function __construct(
		string $nom,
		int $age,
		float $poids
	) {
		parent::__construct($nom, $age, $poids);
	}
}
