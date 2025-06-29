<?php

class Human
{
	protected string $eyes;
	protected string $arms;
	protected string $nose;

	public function __construct(
		string $eyes,
		string $arms,
		string $nose,
	)
	{
		$this->eyes = $eyes;
		$this->arms = $arms;
		$this->nose = $nose;
	}

	public function dead(): void
	{
		echo "Je meurs.";
	}

	public function breathe(): void
	{
		echo "Je respire.";
	}
}
