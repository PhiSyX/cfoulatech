<?php

class Car
{
	// --------- //
	// Propriété //
	// --------- //

	private string $color;
	private float $weight;
	private float $price;
	private string $brand;

	// ----------- //
	// Constructor //
	// ----------- //

	public function __construct(
		string $brand,
		string $color,
		float  $weight,
		float  $price
	)
	{
		$this->brand = $brand;
		$this->color = $color;
		$this->weight = $weight;
		$this->price = $price;
	}

	// --------------- //
	// Getter | Setter //
	// --------------- //

	public function getColor(): string
	{
		return $this->color;
	}

	public function setColor(string $color): void
	{
		$this->color = $color;
	}

	public function getWeight(): float
	{
		return $this->weight;
	}

	public function setWeight(float $weight): void
	{
		$this->weight = $weight;
	}

	public function getBrand(): string
	{
		return $this->brand;
	}

	public function setBrand(string $brand): void
	{
		$this->brand = $brand;
	}

	public function accelerate(): void
	{
		echo "La voiture accélère<br>";
	}

	public function start(): void
	{
		echo "La voiture démarre<br>";
	}

	// ------- //
	// Méthode // -> Publique
	// ------- //

	public function addPrice(float $price): void
	{
		$this->price += $price;
	}

	public function isMoreExpensive(self $car): bool
	{
		return $this->price > $car->getPrice();
	}

	public function getPrice(): float
	{
		return $this->price;
	}

	public function setPrice(float $price): void
	{
		$this->price = $price;
	}
}
