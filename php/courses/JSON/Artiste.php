<?php

class Artiste implements JsonSerializable
{
	// --------- //
	// Propriété //
	// --------- //

	private string $nom;
	private string $type;
	private int $nbFollowers;
	private Album $album;

	// ----------- //
	// Constructor //
	// ----------- //

	public function __construct(
		string $nom,
		string $type,
		int    $nbFollowers,
		Album  $album,
	)
	{
		$this->nom = $nom;
		$this->type = $type;
		$this->nbFollowers = $nbFollowers;
		$this->album = $album;
	}

	// ------- //
	// Méthode // -> Native
	// ------- //

	public function jsonSerialize(): array
	{
		return [
			"nom" => $this->nom,
			"type" => $this->type,
			"nbFollowers" => $this->nbFollowers,
			"album" => $this->album,
		];
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

	public function getNbFollowers(): int
	{
		return $this->nbFollowers;
	}

	public function setNbFollowers(int $nbFollowers): void
	{
		$this->nbFollowers = $nbFollowers;
	}

	public function getType(): string
	{
		return $this->type;
	}

	public function setType(string $type): void
	{
		$this->type = $type;
	}

	public function getAlbum(): Album
	{
		return $this->album;
	}

	public function setAlbum(Album $album): void
	{
		$this->album = $album;
	}
}
