<?php

class Acteur implements JsonSerializable
{
	private ?int $id = null;
	private string $nom;
	private string $email;
	private string $site;
	private string $nationalite;
	private string $genre;
	private int $age;
	private Film $film;

	public function __construct(?int $id = null)
	{
		$this->id = $id;
	}

	public function getId(): int
	{
		return $this->id;
	}

	public function getNom(): string
	{
		return $this->nom;
	}

	public function setNom(string $nom): static
	{
		$this->nom = $nom;
		return $this;
	}

	public function getEmail(): string
	{
		return $this->email;
	}

	public function setEmail(string $email): static
	{
		$this->email = $email;
		return $this;
	}

	public function getSite(): string
	{
		return $this->site;
	}

	public function setSite(string $site): static
	{
		$this->site = $site;
		return $this;
	}

	public function getNationalite(): string
	{
		return $this->nationalite;
	}

	public function setNationalite(string $nationalite): static
	{
		$this->nationalite = $nationalite;
		return $this;
	}

	public function getGenre(): string
	{
		return $this->genre;
	}

	public function setGenre(string $genre): static
	{
		$this->genre = $genre;
		return $this;
	}

	public function getAge(): int
	{
		return $this->age;
	}

	public function setAge(int $age): static
	{
		$this->age = $age;
		return $this;
	}

	public function getFilm(): Film
	{
		return $this->film;
	}

	public function setFilm(Film $film): static
	{
		$this->film = $film;
		return $this;
	}

	public function __toString(): string
	{
		if ($this->id % 2 === 0)
		{
			return $this->verboseString();
		}

		return $this->onelineString();
	}

	private function verboseString(): string
	{
		$genre = "";

		switch ($this->genre) {
			case "M":
				$genre = "Homme";
				break;
			case "F":
				$genre = "Femme";
				break;
			case "X":
				$genre = "Autre";
				break;
		}

		return "- Id : " . $this->id . "<br>" .
			"- Nom : " . $this->nom . "<br>" .
			"- Email : " . $this->email . "<br>" .
			"- Site : " . $this->site . "<br>" .
			"- Nationalite : " . $this->nationalite . "<br>" .
			"- Genre : " . $genre . "<br>" .
			"- Age : " . $this->age . " ans<br>" .
			"- Film : " . $this->film . "<br><hr>";
	}

	private function onelineString(): string
	{
		$actorTerm = "acteur";
		$ageTerm = "âgé";

		switch ($this->genre) {
			case "F":
				$actorTerm = "actrice";
				$ageTerm .= "e";
				break;
			case "X":
				$actorTerm .= "/rice";
				$ageTerm .= "(e)";
				break;
		}

		return "L'$actorTerm " . $this->nom . " $ageTerm de " . $this->age . " ans, de nationalité " . $this->nationalite . " a joué dans le film « " . $this->film . " »<br><hr>";
	}

	public function jsonSerialize(): array
	{
		return [
			"id" => $this->id,
			"nom" => $this->nom,
			"email" => $this->email,
			"site" => $this->site,
			"nationalite" => $this->nationalite,
			"genre" => $this->genre,
			"age" => $this->age,
			"film" => $this->film,
		];
	}
}
