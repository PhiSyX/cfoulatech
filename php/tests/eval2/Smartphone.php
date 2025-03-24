<?php

class Smartphone
{
	// --------- //
	// Propriété //
	// --------- //

	private int $idSmartphone;
	public string $nom;
	protected string $marque;
	protected bool $estAllume = false;
	private int $annee;

	// ----------- //
	// Constructor //
	// ----------- //

	public function __construct(
		int $id,
		string $nom,
		string $marque,
		int $annee,
		bool $estAllume = false,
	) {
		$this->idSmartphone = $id;
		$this->nom = $nom;
		$this->marque = $marque;
		$this->annee = $annee;
		$this->estAllume = $estAllume;
	}

	// ----------- //
	// Méthode PHP //
	// ----------- //

	public function __toString(): string
	{
		$text = "Voici le smartphone " . $this->getIdSmartphone() . "\n";
		$text .= "Marque : " . $this->getMarque() . "\n";
		$text .= "Nom : " . $this->getNom() . "\n";
		$text .= "Année : " . $this->getAnnee() . "\n";
		$text .= "Est allumé : " . ($this->getEstAllume() ? "OUI" : "NON");
		$text .= "\n\n";

		return $text;
	}

	// ------- //
	// Méthode //
	// ------- //

	public function allumer(): void
	{
		if ( ! $this->estAllume) {
			$this->estAllume = true;
			echo "Le smartphone '" . $this->getIdSmartphone() . "' est maintenant allumé.\n";
		} else {
			echo "Le smartphone '" . $this->getIdSmartphone() . "' est déjà allumé.\n";
		}
	}

	public function eteindre(): void
	{
		if ($this->estAllume) {
			$this->estAllume = false;
			echo "Le smartphone '" . $this->getIdSmartphone() . "' est maintenant éteint.\n";
		} else {
			echo "Le smartphone '" . $this->getIdSmartphone() . "' est déjà éteint.\n";
		}
	}

	public function appel(int $numero): string
	{
		if ($this->estAllume) {
			return "Vous appelez le numéro '" . $numero . "'.\n";
		}
		return "Vous ne pouvez pas appelé le numéro '" . $numero . "' car il est éteint!\n";
	}

	public function estMoinsVieux(Smartphone $smartphone): bool
	{
		return $this->annee > $smartphone->getAnnee();
	}

	// --------------- //
	// Getter | Setter //
	// --------------- //

	public function getIdSmartphone(): int
	{
		return $this->idSmartphone;
	}

	public function getNom(): string
	{
		return $this->nom;
	}

	public function setNom(string $nom): void
	{
		$this->nom = $nom;
	}

	public function getMarque(): string
	{
		return $this->marque;
	}

	public function setMarque(string $marque): void
	{
		$this->marque = $marque;
	}

	public function getEstAllume(): bool
	{
		return $this->estAllume;
	}

	public function setEstAllume(bool $estAllume): void
	{
		$this->estAllume = $estAllume;
	}

	public function getAnnee(): int
	{
		return $this->annee;
	}

	public function setAnnee(int $annee): void
	{
		$this->annee = $annee;
	}
}
