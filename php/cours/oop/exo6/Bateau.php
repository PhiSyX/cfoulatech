<?php

class Bateau extends VehiculeSansRoues
{
	// --------- //
	// Propriété //
	// --------- //

	private bool $enMouvement;
	private bool $aLArret = true;

	// ----------- //
	// Constructor //
	// ----------- //

	public function __construct(
		string $nom,
		string $marque,
		float $vitesseMax,
		int $capacite,
		bool $enMouvement,
		bool $aLArret = true
	) {
		parent::__construct($nom, $marque, $vitesseMax, $capacite);
		$this->enMouvement = $enMouvement;
		$this->aLArret = $aLArret;
	}

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

	// ------- //
	// Méthode // -> API Publique
	// ------- //

	public function demarrer(): void
	{
		echo "Le bateau " . $this->nom . " a démarré<br>";

		$this->enMouvement = true;
		$this->aLArret = false;
	}

	public function arreter(): void
	{
		if ($this->aLArret) {
			echo "Le bateau " . $this->nom . " est déjà à l'arrêt<br>";
		} else {
			echo "Le bateau " . $this->nom . " s'arrête<br>";
		}

		$this->enMouvement = false;
		$this->aLArret = true;
	}

	public function amarrer(): string
	{
		return $this->aLArret
			? $this->nom . ", vous êtes à l’arrêt et vous pouvez amarrer<br>"
			: $this->nom . ", vous êtes en mouvement et ne pouvez pas amarrer<br>";
	}
}
