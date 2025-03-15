<?php

class Humain
{
	protected string $yeux;
	protected string $bras;
	protected string $nez;

	public function __construct(
		string $yeux,
		string $bras,
		string $nez,
	) {
		$this->yeux = $yeux;
		$this->bras = $bras;
		$this->nez = $nez;
	}

	public function mourir(): void
	{
		echo "Je meurs.";
	}

	public function respirer(): void
	{
		echo "Je respire.";
	}
}
