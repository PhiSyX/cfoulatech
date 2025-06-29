<?php

class Bike extends VehicleTwoWheeled
{
	// --------- //
	// Propriété //
	// --------- //

	private bool $is_moving;
	private bool $is_off = true;

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
}
