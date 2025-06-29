<?php

class Women extends Human
{
	private string $breasts;

	public function __construct(
		string $eyes,
		string $arms,
		string $nose,
		string $breasts,
	)
	{
		parent::__construct($eyes, $arms, $nose);
		$this->breasts = $breasts;
	}

	public function giveBirth(): Human
	{
		return new Human($this->eyes, $this->arms, $this->nose);
	}
}
