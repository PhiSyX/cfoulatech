<?php

namespace App\Controller;

use App\Auth\AuthConfig;
use App\Auth\AuthSession;
use App\Auth\Service\AuthService;
use App\Auth\View\Helper\AuthHelper;
use App\View\Helper\FormHelper;
use App\View\Helper\MessageHelper;
use App\View\Helper\PageHelper;

abstract class BaseController
{
	protected AuthConfig $authConfig;
	protected AuthService $authService;
	protected AuthSession $authSession;

	public function __construct(AuthService $authService)
	{
		$this->authService = $authService;
		$this->authConfig = new AuthConfig();
		$this->authSession = new AuthSession($this->authConfig);

		if (!empty($_POST)) {
			$_SESSION[$_SERVER["REQUEST_URI"]] = $_POST;
		}
	}

	/**
	 * La page n'est accessible uniquement pour les utilisateurs connectés.
	 */
	public function authOnly(): void
	{
		if (!$this->authSession->exists()) {
			$this->redirectTo(
				$this->authConfig->getLoginPath(),
				"errors",
				"Vous devez être connecté pour pouvoir accéder à cette page"
			);
		}
	}

	/**
	 * La page n'est accessible uniquement pour les utilisateurs non connectés.
	 */
	public function anonymousOnly(): void
	{
		if ($this->authSession->exists()) {
			$this->redirectTo("index.php");
		}
	}

	public function hasGetRequest(string $key, string $value = ""): bool
	{
		if (!isset($_GET[$key])) {
			return false;
		}

		if (empty($value)) {
			return true;
		}

		if ($_GET[$key] === $value) {
			return true;
		}

		return false;
	}

	public function isJsonRequest(): bool
	{
		var_dump($_SERVER);
		return str_contains("HTTP_ACCEPT", "application/json");
	}

	/**
	 * Est-ce que la requête est en POST
	 */
	public function isPostRequest(): bool
	{
		return $_SERVER["REQUEST_METHOD"] === "POST";
	}

	/**
	 * Récupère les valeurs des champs du formulaire
	 */
	protected function formData(array $filterKeys = []): array
	{
		if (empty($filterKeys)) {
			return $_POST;
		}

		return array_filter($_POST, function ($key) use ($filterKeys) {
			return in_array($key, $filterKeys);
		}, ARRAY_FILTER_USE_KEY);
	}

	/**
	 * Redirige vers une nouvelle URL
	 */
	protected function redirectTo(
		string $url,
		string $type = "",
		string $message = "",
	): void
	{
		if (!empty($message)) {
			$_SESSION[$type]["global"] = $message;
		}

		// Réinitialise les données en POST après une redirection en success
		if ($type === "success") {
			$_SESSION[$_SERVER["REQUEST_URI"]] = [];
		}

		header("Location: $url");
		exit;
	}

	/**
	 * Redirige vers l'URL précédente.
	 */
	protected function redirectBack(
		string $type,
		string $message,
		array  $data = []
	): void
	{
		if (!empty($data)) {
			$_SESSION[$type] = $data;
		}

		$url = $_SERVER["HTTP_REFERER"];
		$this->redirectTo($url, $type, $message);
	}

	/**
	 * Affiche le contenu HTML d'une page
	 */
	protected function render(
		string $file,
		array  $dataView = [],
		array  $options = []
	): void
	{
		if (empty($options["layout"])) {
			$options["layout"] = "base";
		}

		// NOTE : l'instance, les helpers et les paramètres sont automatiquement
		// injectés dans la vue.

		$authHelper = new AuthHelper($this->authConfig, $this->authSession);
		$formHelper = new FormHelper();
		$messageHelper = new MessageHelper();
		$pageHelper = new PageHelper($options["name"] ?: "");

		require_once "templates/layouts/" . $options["layout"] . ".html.php";
	}
}
