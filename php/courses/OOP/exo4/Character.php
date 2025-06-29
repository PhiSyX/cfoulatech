<?php

class Character
{
	// --------- //
	// Propriété //
	// --------- //

	private string $name;
	private int $hit_attack;
	private int $health_point;

	// ----------- //
	// Constructor //
	// ----------- //

	public function __construct(string $name, int $health_point, int $hit_attack)
	{
		$this->name = $name;
		$this->hit_attack = $hit_attack;
		$this->health_point = $health_point;
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

	public function getHitAttack(): int
	{
		return $this->hit_attack;
	}

	public function setHitAttack(int $hit_attack): void
	{
		$this->hit_attack = $hit_attack;
	}

	public function __toString(): string
	{
		return "Nom : " .
			$this->name .
			" <br>" .
			"Vie : " .
			$this->health_point .
			" <br>" .
			"Puissance d'attaque : " .
			$this->hit_attack .
			" de dégâts <br><br>";
	}

	public function isAlive(): bool
	{
		return $this->health_point > 0;
	}

	// ------- //
	// Méthode // -> Native de php
	// ------- //

	public function attack(Character $personnage): void
	{
		$personnage->setHealthPoint($personnage->getHealthPoint() - $this->hit_attack);
	}

	// ------- //
	// Méthode // -> Publique
	// ------- //

	public function getHealthPoint(): int
	{
		return $this->health_point;
	}

	public function setHealthPoint(int $health_point): void
	{
		if ($health_point < 0) {
			$this->health_point = 0;
		} else {
			$this->health_point = $health_point;
		}
	}
}
