<?php

namespace App\DTO;

class SearchDTO
{
	private int $page = 1;

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
