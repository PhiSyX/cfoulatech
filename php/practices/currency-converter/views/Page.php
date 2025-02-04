<?php

require_once "./app/Auth.php";

class Page
{
	// --------- //
	// Propriété //
	// --------- //

	private Auth $auth;
	private string $page;
	private string $title;

	// ----------- //
	// Constructor //
	// ----------- //

	public function __construct(
		string $page,
		string $title,
	) {
		$this->auth = new Auth;
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

	public function get_user_id(): int|null
	{
		return $this->auth->get_user_session() !== null
			? $this->auth->get_user_session()->get_id()
			: null;
	}

	// ------- //
	// Méthode // -> API Publique
	// ------- //

	public function anonymous_auth(): void
	{
		if ($this->auth->is_connected()) {
			$this->auth->redirect_profile();
		}
	}

	public function required_auth(): void
	{
		if (!$this->auth->is_connected()) {
			$this->auth->redirect_signin();
		}
	}
}
