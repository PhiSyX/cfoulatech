<?php

class Avion extends VehiculeSansRoues
{
	// ----------- //
	// Constructor //
	// ----------- //

	public function __construct(
		string $nom,
		string $marque,
		float $vitesseMax,
		int $capacite,
	)
	{
		parent::__construct($nom, $marque, $vitesseMax, $capacite);
	}

	// ------- //
	// Méthode // -> API Publique
	// ------- //

	public function decoller(): void
	{
		echo "L'avion a décollé";
	}
}
