<?php

class Mage extends Personnage
{
	private string $baton;

	private int $mana;

	public function __construct(
		int $age,
		string $name,
		float $weight,
		string $magical_stuff,
		int $quantity
	) {
		parent::__construct($age, $name, $weight);
		$this->baton = $magical_stuff;
		$this->mana = $quantity;
	}

	public function getBaton(): string
	{
		return $this->baton;
	}

	public function getQuantityMana(): int
	{
		return $this->mana;
	}

	public function setBaton(string $unBaton): void
	{
		$this->baton = $unBaton;
	}

	public function setQuantityMana(string $quantityMana): void
	{
		$this->mana = $quantityMana;
	}
}
