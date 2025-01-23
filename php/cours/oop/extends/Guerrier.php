<?php

require_once "./PersonnageJeux.php";

class Guerrier extends PersonnageJeux
{
	private string $epee;

	public function getEpee(): string
	{
		return $this->epee;
	}

	public function setEpee(string $epee): void
	{
		$this->epee = $epee;
	}

}
