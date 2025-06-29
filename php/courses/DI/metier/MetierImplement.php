<?php

class MetierImplement implements MetierInterface
{
	private DaoInterface $dao; // Couplage faible

	public function __construct(DaoInterface $dao)
	{
		$this->dao = $dao;
	}

	public function calcul(): float
	{
		$t = $this->dao->getData();
		return $t * 43 / 3;
	}
}
