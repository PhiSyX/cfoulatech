<?php

class Velo extends VehiculeDeuxRoues
{
	// --------- //
	// Propriété //
	// --------- //

	private bool $enMouvement;
	private bool $aLArret = true;

	// --------------- //
	// Getter | Setter //
	// --------------- //

	public function getEnMouvement(): bool
	{
		return $this->enMouvement;
	}

	public function setEnMouvement(bool $enMouvement): void
	{
		$this->enMouvement = $enMouvement;
	}

	public function getALArret(): bool
	{
		return $this->aLArret;
	}

	public function setALArret(bool $aLArret): void
	{
		$this->aLArret = $aLArret;
	}
}
