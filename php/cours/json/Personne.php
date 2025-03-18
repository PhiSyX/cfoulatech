<?php

class Personne
{
	// --------- //
	// Propriété //
	// --------- //

	private string $prenom;
	private int $age;
	private string $genre;

	// ----------- //
	// Constructor //
	// ----------- //

	public function __construct(
		string $prenom,
		int $age,
		string $genre,
	) {
		$this->prenom = $prenom;
		$this->age = $age;
		$this->genre = $genre;
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

	// ------- //
	// Méthode //
	// ------- //

	public function __toString()
	{
		switch ($this->genre) {
			case "M": return $this->affichePourHomme();
			case "F": return $this->affichePourFemme();
			default:  return "<p>Vous êtes un hiboux</p>";
		}
	}

	private function affichePourFemme(): string
	{
		return "<p style='color: hotpink'>
			Bonjour madame {$this->getPrenom()}
			âgée de {$this->getAge()} ans
		</p>";
	}

	private function affichePourHomme(): string
	{
		return "<ul style='color: deepskyblue'>
			<li>Prénom: {$this->getPrenom()}</li>
			<li>Age: {$this->getAge()}</li>
			<li>Genre: Homme</li>
		</ul>";
	}
}
