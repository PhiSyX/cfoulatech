<?php

class User
{
	// ----------- //
	// Constructor //
	// ----------- //

	public function __construct(
		private string $username,
		private string $email,
		private string $password,
		private ?int $id,
	) {}

	// --------------- //
	// Getter | Setter //
	// --------------- //

	public function getUsername(): string
	{
		return $this->username;
	}

	public function getEmail(): string
	{
		return $this->email;
	}

	public function getPassword(): string
	{
		return $this->password;
	}

	public function getId(): int
	{
		return $this->id;
	}
}
