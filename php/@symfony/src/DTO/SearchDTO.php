<?php

namespace App\DTO;

class SearchDTO
{
	/**
	 * Page courante.
	 */
	private int $page = 1;

	/**
	 * La recherche.
	 */
	public string $q = "";

	public function getPage(): int
	{
		return $this->page;
	}

	public function setPage(int $page): static
	{
		$this->page = $page;
		return $this;
	}

	public function getQuery(): string
	{
		return $this->q;
	}
}
