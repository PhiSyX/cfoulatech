<?php

class Person
{
	// --------- //
	// Propriété //
	// --------- //

	private bool $terminal = true;

	// ----------- //
	// Constructor //
	// ----------- //

	public function __construct(
		private string $firstname,
		private int    $age,
		private string $gender,
	)
	{
		$this->terminal = empty($_SERVER["HTTP_HOST"]);
	}

	// ------- //
	// Méthode // -> Native PHP
	// ------- //

	public function __toString()
	{
		switch ($this->getGender()) {
			case "M":
				return $this->toStringMan();
			case "F":
				return $this->toStringWomen();
			default:
				return "<p>Vous êtes autre chose qu'un homme ou une femme</p>";
		}
	}

	// ------- //
	// Méthode // -> Privé
	// ------- //

	public function getGender(): string
	{
		return $this->gender;
	}

	private function toStringMan(): string
	{
		$openList = $this->isHttp() ? "<ul style='color: deepskyblue'>" : "";
		$closeList = $this->isHttp() ? "</ul>" : "\n";

		$openItem = $this->isHttp() ? "<li>" : "";
		$closeItem = $this->isHttp() ? "</li>" : "";

		return <<<HTML
		$openList
			$openItem Prénom: {$this->getFirstname()} $closeItem
			$openItem Age:    {$this->getAge()}    $closeItem
			$openItem Genre:  Man                $closeItem
		$closeList
		HTML;
	}

	private function isHttp(): bool
	{
		return !$this->isTerminal();
	}

	private function isTerminal(): bool
	{
		return $this->terminal;
	}

	// --------------- //
	// Getter | Setter //
	// --------------- //

	public function getFirstname(): string
	{
		return $this->firstname;
	}

	public function getAge(): int
	{
		return $this->age;
	}

	private function toStringWomen(): string
	{
		$openTag = $this->isHttp() ? "<p style='color: hotpink'>" : "";
		$closeTag = $this->isHttp() ? "</p>" : "\n";

		return <<<HTML
		$openTag
			Bonjour madame {$this->getFirstname()}
			âgée de {$this->getAge()} ans
		$closeTag
		HTML;
	}
}
