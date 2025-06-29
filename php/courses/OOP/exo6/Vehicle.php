<?php

class Vehicule
{
	protected string $name;
	protected string $brand;
	protected string $country;
	protected float $max_speed;

	// ----------- //
	// Constructor //
	// ----------- //

	public function __construct(string $name, string $brand, float $max_speed)
	{
		$this->name = $name;
		$this->brand = $brand;
		$this->max_speed = $max_speed;
	}

	// --------------- //
	// Getter | Setter //
	// --------------- //

	public function getName(): string
	{
		return $this->name;
	}

	public function setName(string $name): void
	{
		$this->name = $name;
	}

	public function getBrand(): string
	{
		return $this->brand;
	}

	public function setBrand(string $brand): void
	{
		$this->brand = $brand;
	}

	public function getCountry(): string
	{
		return $this->country;
	}

	public function setCountry(string $country): void
	{
		$this->country = $country;
	}

	public function getMaxSpeed(): float
	{
		return $this->max_speed;
	}

	public function setMaxSpeed(float $max_speed): void
	{
		$this->max_speed = $max_speed;
	}
}

class VehicleTwoWheeled extends Vehicule
{
	// --------- //
	// Propriété //
	// --------- //

	private bool $is_connected;

	// ----------- //
	// Constructor //
	// ----------- //

	public function __construct(
		string $name,
		string $brand,
		float  $max_speed,
		string $country,
		bool   $is_connected
	)
	{
		parent::__construct($name, $brand, $max_speed);
		$this->setCountry($country);
		$this->is_connected = $is_connected;
	}

	// --------------- //
	// Getter | Setter //
	// --------------- //

	public function isConnected(): bool
	{
		return $this->is_connected;
	}

	public function setConnected(bool $is_connected): void
	{
		$this->is_connected = $is_connected;
	}

	// ------- //
	// Méthode // -> API Publique
	// ------- //

	public function doWheeling(): void
	{
		echo "Le véhicule à deux roues " . $this->name .
			" de la marque " . $this->brand .
			"fait un wheeling <br>";
	}
}

class VehicleWithoutWheels extends Vehicule
{
	// --------- //
	// Propriété //
	// --------- //

	protected int $capacity;

	// ----------- //
	// Constructor //
	// ----------- //

	public function __construct(
		string $name,
		string $brand,
		float  $max_speed,
		int    $capacity,
		string $country = null
	)
	{
		parent::__construct($name, $brand, $max_speed);
		$this->capacity = $capacity;
		if ($country) {
			$this->setCountry($country);
		}
	}

	// --------------- //
	// Getter | Setter //
	// --------------- //

	public function getCapacity(): int
	{
		return $this->capacity;
	}

	public function setCapacity(int $capacity): void
	{
		$this->capacity = $capacity;
	}
}
