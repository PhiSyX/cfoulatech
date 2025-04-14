<?php

namespace App\Auth\Model\Entity;

use JsonSerializable;

class User implements JsonSerializable
{
	private int $id;
	private string $username;
	private string $password;

	public function __construct(int $id)
	{
		$this->id = $id;
	}

	public function getId(): int
	{
		return $this->id;
	}

	public function getUsername(): string
	{
		return $this->username;
	}

	public function getPassword(): string
	{
		return $this->password;
	}

	public function setUsername(string $username): static
	{
		$this->username = $username;
		return $this;
	}

	public function setDirtyPassword(string $password): static
	{
		$this->password = password_hash($password, PASSWORD_DEFAULT);
		return $this;
	}

	public function setPassword(string $password): static
	{
		$this->password = $password;
		return $this;
	}

	public function comparePassword(string $password): bool
	{
		return password_verify($password, $this->password);
	}

	public function jsonSerialize(): array
	{
		return [
			"id" => $this->id,
			"username" => $this->username,
			"password" => "******"
		];
	}
}
