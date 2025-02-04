<?php

class User
{
	public function __construct(
		private string $username,
		private string $email,
		private string $password,
		private ?int $id,
	) {}

	// --------------- //
	// Getter | Setter //
	// --------------- //

	public function get_username(): string
	{
		return $this->username;
	}

	public function get_email(): string
	{
		return $this->email;
	}

	public function get_password(): string
	{
		return $this->password;
	}

	public function get_id(): int
	{
		return $this->id;
	}
}
