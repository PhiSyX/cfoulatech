<?php

class Plane extends VehicleWithoutWheels
{
	// ----------- //
	// Constructor //
	// ----------- //

	public function __construct(
		string $name,
		string $brand,
		float  $max_speed,
		int    $capacity
	)
	{
		parent::__construct($name, $brand, $max_speed, $capacity);
	}

	// ------- //
	// Méthode // -> API Publique
	// ------- //

	public function decoller(): void
	{
		echo "L'avion a décollé";
	}
}
