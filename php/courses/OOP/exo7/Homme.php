<?php

class Homme extends Humain
{
	private string $barbe;

	public function __construct(
		string $yeux,
		string $bras,
		string $nez,
		string $barbe,
	)
	{
		parent::__construct($yeux, $bras, $nez);
		$this->barbe = $barbe;
	}

	public function mue(): bool
	{
		return true;
	}
}
