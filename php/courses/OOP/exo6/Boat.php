<?php

class Boat extends VehicleWithoutWheels
{
	// --------- //
	// Propriété //
	// --------- //

	private bool $is_moving;
	private bool $is_off = true;

	// ----------- //
	// Constructor //
	// ----------- //

	public function __construct(
		string $name,
		string $brand,
		float  $max_speed,
		int    $capacity,
		bool   $is_moving,
		bool   $is_off = true
	)
	{
		parent::__construct($name, $brand, $max_speed, $capacity);
		$this->is_moving = $is_moving;
		$this->is_off = $is_off;
	}

	// --------------- //
	// Getter | Setter //
	// --------------- //

	public function isMoving(): bool
	{
		return $this->is_moving;
	}

	public function setMoving(bool $is_moving): void
	{
		$this->is_moving = $is_moving;
	}

	public function isOff(): bool
	{
		return $this->is_off;
	}

	public function setOff(bool $is_off): void
	{
		$this->is_off = $is_off;
	}

	// ------- //
	// Méthode // -> API Publique
	// ------- //

	public function start(): void
	{
		echo "Le bateau " . $this->name . " a démarré<br>";

		$this->is_moving = true;
		$this->is_off = false;
	}

	public function stop(): void
	{
		if ($this->is_off) {
			echo "Le bateau " . $this->name . " est déjà à l'arrêt<br>";
		} else {
			echo "Le bateau " . $this->name . " s'arrête<br>";
		}

		$this->is_moving = false;
		$this->is_off = true;
	}

	public function moor(): string
	{
		return $this->is_off
			? $this->name . ", vous êtes à l’arrêt et vous pouvez amarrer<br>"
			: $this->name . ", vous êtes en mouvement et ne pouvez pas amarrer<br>";
	}
}
