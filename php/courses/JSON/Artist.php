<?php

class Artist implements JsonSerializable
{
	// ----------- //
	// Constructor //
	// ----------- //

	public function __construct(
		private string $name,
		private string $type,
		private int    $total_followers,
		private Album  $album,
	)
	{
	}

	// ------- //
	// Méthode // -> Native
	// ------- //

	public function jsonSerialize(): array
	{
		return [
			"name" => $this->name,
			"type" => $this->type,
			"total_followers" => $this->total_followers,
			"album" => $this->album,
		];
	}

	// --------------- //
	// Getter | Setter //
	// --------------- //

	public function getName(): string
	{
		return $this->name;
	}

	public function setName(string $name): void
	{
		$this->name = $name;
	}

	public function getTotalFollowers(): int
	{
		return $this->total_followers;
	}

	public function setTotalFollowers(int $total_followers): void
	{
		$this->total_followers = $total_followers;
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
