<?php

class Personne
{
	// --------- //
	// Propriété //
	// --------- //

	private string $prenom;
	private int $age;
	private string $genre;
	private bool $terminal = true;

	// ----------- //
	// Constructor //
	// ----------- //

	public function __construct(string $prenom, int $age, string $genre)
	{
		$this->prenom   = $prenom;
		$this->age      = $age;
		$this->genre    = $genre;
		$this->terminal = empty($_SERVER["HTTP_HOST"]);
	}

	// ------- //
	// Méthode // -> Native PHP
	// ------- //

	public function __toString()
	{
		switch ($this->genre) {
			case "M": return $this->affichePourHomme();
			case "F": return $this->affichePourFemme();
			default:  return "<p>Vous êtes autre chose qu'un homme ou une femme</p>";
		}
	}

	// ------- //
	// Méthode // -> Privé
	// ------- //

	private function affichePourFemme(): string
	{
		$ouvertureBalisePar = $this->isHttp() ? "<p style='color: hotpink'>"  : "";
		$fermetureBalisePar = $this->isHttp() ? "</p>"                        : "\n";

		return <<<HTML
		$ouvertureBalisePar
			Bonjour madame {$this->getPrenom()}
			âgée de {$this->getAge()} ans
		$fermetureBalisePar
		HTML;
	}

	private function affichePourHomme(): string
	{
		$ouvertureBaliseUl = $this->isHttp() ? "<ul style='color: deepskyblue'>" : "";
		$fermetureBaliseUl = $this->isHttp() ? "</ul>"                           : "\n";

		$ouvertureBaliseLi = $this->isHttp() ? "<li>"  : "";
		$fermetureBaliseLi = $this->isHttp() ? "</li>" : "";

		return <<<HTML
		$ouvertureBaliseUl
			$ouvertureBaliseLi Prénom: {$this->getPrenom()} $fermetureBaliseLi
			$ouvertureBaliseLi Age:    {$this->getAge()}    $fermetureBaliseLi
			$ouvertureBaliseLi Genre:  Homme                $fermetureBaliseLi
		$fermetureBaliseUl
		HTML;
	}

	private function isTerminal(): bool
	{
		return $this->terminal;
	}

	private function isHttp(): bool
	{
		return !$this->isTerminal();
	}

	// --------------- //
	// Getter | Setter //
	// --------------- //

	public function getPrenom(): string
	{
		return $this->prenom;
	}

	public function getAge(): int
	{
		return $this->age;
	}

	public function getGenre(): string
	{
		return $this->genre;
	}
}
