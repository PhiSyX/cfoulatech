<?php

class Femme extends Humain
{
	private string $poitrine;

	public function __construct(
		string $yeux,
		string $bras,
		string $nez,
		string $poitrine,
	)
	{
		parent::__construct($yeux, $bras, $nez);
		$this->poitrine = $poitrine;
	}

	public function accoucher(): Humain
	{
		return new Humain($this->yeux, $this->bras, $this->nez);
	}
}
