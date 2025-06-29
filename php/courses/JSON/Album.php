<?php

class Album implements JsonSerializable
{
	// ----------- //
	// Constructor //
	// ----------- //

	public function __construct(
		private string   $name,
		private int      $total_tracks,
		private DateTime $release_date,
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
			"total_tracks" => $this->total_tracks,
			"release_date" => $this->release_date,
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

	public function getTotalTracks(): int
	{
		return $this->total_tracks;
	}

	public function setTotalTracks(int $total_tracks): void
	{
		$this->total_tracks = $total_tracks;
	}

	public function getReleaseDate(): DateTime
	{
		return $this->release_date;
	}

	public function setReleaseDate(DateTime $release_date): void
	{
		$this->release_date = $release_date;
	}
}
