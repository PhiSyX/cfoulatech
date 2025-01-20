<?php

class Femme extends Humain
{

	public function __construct(
		string $nom,
		int $age,
		float $poids,
		string $test,
	) {
		parent::__construct($nom, $age, $poids);
	}
}
