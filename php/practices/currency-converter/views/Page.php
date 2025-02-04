<?php

class Page
{
	// --------- //
	// Propriété //
	// --------- //

	private string $page;
	private string $title;

	// ----------- //
	// Constructor //
	// ----------- //

	public function __construct(
		string $page,
		string $title,
	) {
		$this->page = $page;
		$this->title = $title;
	}

	// --------------- //
	// Getter | Setter //
	// --------------- //

	public function get_page(): string
	{
		return $this->page;
	}

	public function set_page(string $page): void
	{
		$this->page = $page;
	}

	public function get_title(): string
	{
		return $this->title;
	}

	public function set_title(string $title): void
	{
		$this->title = $title;
	}
}
