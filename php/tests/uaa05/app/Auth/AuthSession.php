<?php

namespace App\Auth;

use app\Auth\Model\Entity\User;

class AuthSession
{
	private AuthConfig $config;

	public function __construct(AuthConfig $config)
	{
		$this->config = $config;

		if (session_status() === PHP_SESSION_NONE) {
			session_start();
		}
	}

	public function get(): ?User
	{
		return $_SESSION[$this->config->getSessionKey()] ?? null;
	}

	public function exists(): bool
	{
		return isset($_SESSION[$this->config->getSessionKey()]);
	}

	public function set(User $user): void
	{
		$_SESSION[$this->config->getSessionKey()] = $user;
	}

	public function unset(): void
	{
		unset($_SESSION[$this->config->getSessionKey()]);
	}
}
