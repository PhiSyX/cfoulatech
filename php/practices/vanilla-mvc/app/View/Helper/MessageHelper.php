<?php

namespace App\View\Helper;

class MessageHelper
{
	public function __construct()
	{
		if (session_status() == PHP_SESSION_NONE) {
			session_start();
		}
	}

	/**
	 * Lis un message d'erreur en session et la supprime de la session.
	 */
	public function error(string $name = "global"): string
	{
		if (!$this->hasError($name)) {
			return "";
		}

		$msg = $_SESSION["errors"][$name];
		unset($_SESSION["errors"][$name]);
		return $msg;
	}

	/**
	 * Vérifie qu'un message d'erreur existe en session.
	 */
	public function hasError(string $name = "global"): bool
	{
		return isset($_SESSION["errors"][$name]);
	}

	/**
	 * Vérifie qu'un message de succès existe en session.
	 */
	public function hasSuccess(string $name = "global"): bool
	{
		return isset($_SESSION["success"][$name]);
	}

	/**
	 * Lis un message de succès en session et la supprime de la session.
	 */
	public function success(string $name = "global"): string
	{
		if (!$this->hasSuccess($name)) {
			return "";
		}

		$msg = $_SESSION["success"][$name];
		unset($_SESSION["success"][$name]);
		return $msg;
	}
}
