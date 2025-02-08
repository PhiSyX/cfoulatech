<?php

class Personnage
{
	// --------- //
	// Propriété //
	// --------- //

	private string $nom;
	private int $attaque;
	private int $vie;

	// ----------- //
	// Constructor //
	// ----------- //

	public function __construct(string $nom, int $vie, int $attaque)
	{
		$this->nom = $nom;
		$this->attaque = $attaque;
		$this->vie = $vie;
	}

	// --------------- //
	// Getter | Setter //
	// --------------- //

	public function getNom(): string
	{
		return $this->nom;
	}

	public function setNom(string $nom): void
	{
		$this->nom = $nom;
	}

	public function getVie(): int
	{
		return $this->vie;
	}

	public function setVie(int $vie): void
	{
		if ($vie < 0) {
			$this->vie = 0;
		} else {
			$this->vie = $vie;
		}
	}

	public function getAttaque(): int
	{
		return $this->attaque;
	}

	public function setAttaque(int $attaque): void
	{
		$this->attaque = $attaque;
	}

	// ------- //
	// Méthode // -> Native de php
	// ------- //

	public function __toString(): string
	{
		return "Nom : " .
			$this->nom .
			" <br>" .
			"Vie : " .
			$this->vie .
			" <br>" .
			"Puissance d'attaque : " .
			$this->attaque .
			" de dégâts <br><br>";
	}

	// ------- //
	// Méthode // -> Publique
	// ------- //

	public function estVivant(): bool
	{
		return $this->vie > 0;
	}

	public function lanceAttaque(Personnage $personnage): void
	{
		$personnage->setVie($personnage->getVie() - $this->attaque);
	}
}
