<?php

class Man extends Human
{
	private string $beard;

	public function __construct(
		string $eyes,
		string $arms,
		string $nose,
		string $beard,
	)
	{
		parent::__construct($eyes, $arms, $nose);
		$this->beard = $beard;
	}

	public function toMolt(): bool
	{
		return true;
	}
}
