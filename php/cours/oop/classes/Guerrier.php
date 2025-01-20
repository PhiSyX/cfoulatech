<?php

class Guerrier extends Personnage
{
	private string $epee;

	public function __construct(int $age, string $name, float $weight, string $sword)
	{
		parent::__construct($age, $name, $weight);
		$this->epee = $sword;
	}

	public function getEpee(): string
	{
		return $this->epee;
	}

	public function setEpee(string $uneEpee): void
	{
		$this->epee = $uneEpee;
	}
}
