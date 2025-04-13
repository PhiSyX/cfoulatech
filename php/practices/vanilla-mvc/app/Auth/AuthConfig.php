<?php

namespace App\Auth;

class AuthConfig
{
	private string $loginPath;
	private string $logoutPath;

	private string $redirectAfterLogin;
	private string $redirectAfterLogout;
	private string $sessionKey;

	public function __construct()
	{
		$config = require dirname(__DIR__, 2) . "/config/auth.php";
		$this->loginPath = $config["loginPath"];
		$this->logoutPath = $config["logoutPath"];
		$this->redirectAfterLogin = $config["redirectAfterLogin"];
		$this->redirectAfterLogout = $config["redirectAfterLogout"];
		$this->sessionKey = $config["sessionKey"];
	}

	public function getLoginPath(): string
	{
		return $this->loginPath;
	}

	public function getLogoutPath(): string
	{
		return $this->logoutPath;
	}

	public function getRedirectAfterLogin(): string
	{
		return $this->redirectAfterLogin;
	}

	public function getRedirectAfterLogout(): string
	{
		return $this->redirectAfterLogout;
	}

	public function getSessionKey(): string
	{
		return $this->sessionKey;
	}
}
