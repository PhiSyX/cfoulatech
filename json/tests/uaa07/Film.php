<?php

class Film implements JsonSerializable
{
	private string $titre;
	private float $note;
	private DateTime $date_sortie;
	private array $genres;
	private bool $enSalle;
	private array $langues;

	public function getTitre(): string
	{
		return $this->titre;
	}

	public function setTitre(string $titre): static
	{
		$this->titre = $titre;
		return $this;
	}

	public function getNote(): float
	{
		return $this->note;
	}

	public function setNote(float $note): static
	{
		$this->note = $note;
		return $this;
	}

	public function getDate(): DateTime
	{
		return $this->date_sortie;
	}

	public function setDate(DateTime $date_sortie): static
	{
		$this->date_sortie = $date_sortie;
		return $this;
	}

	public function getGenres(): array
	{
		return $this->genres;
	}

	public function setGenres(array $genres): static
	{
		$this->genres = $genres;
		return $this;
	}

	public function isEnSalle(): bool
	{
		return $this->enSalle;
	}

	public function setEnSalle(bool $enSalle): static
	{
		$this->enSalle = $enSalle;
		return $this;
	}

	public function getLangues(): array
	{
		return $this->langues;
	}

	public function setLangues(array $langues): static
	{
		$this->langues = $langues;
		return $this;
	}

	public function __toString(): string
	{
		return $this->titre;
	}

	public function jsonSerialize(): array
	{
		return [
			"title" => $this->titre,
			"note" => $this->note,
			"date_sortie" => $this->date_sortie,
			"genres" => $this->genres,
			"enSalle" => $this->enSalle,
			"langues" => $this->langues,
		];
	}
}
