<?php

namespace App\Auth\Controller;

use App\Controller\BaseController;

class AuthLoginController extends BaseController
{
	public const MESSAGES = [
		"loginFormContainsErrors" => "Le formulaire de connexion contient des erreurs, veuillez recommencer",
		"requiredUsername" => "Un nom d'utilisateur est requis pour se connecter",
		"requiredPassword" => "Un mot de passe est requis pour se connecter",
		"invalidCredentials" => "Identifiant ou mot de passe incorrect",
		"connectionSuccessful" => "Vous êtes maintenant connecté",
	];

	/**
	 * Page de connexion
	 */
	public function login(): void
	{
		$this->render(
			"auth/login.html.php",
			options: ["name" => "login"]
		);
	}

	/**
	 * Gestion du formulaire de connexion
	 */
	public function handle(): void
	{
		// Récupération des entrées du formulaire de connexion
		$inputData = $this->formData(["username", "password"]);

		// Validation des entrées
		$errors = [];
		if (empty(trim($inputData["username"]))) {
			$errors["username"] = self::MESSAGES["requiredUsername"];
		}
		if (empty(trim($inputData["password"]))) {
			$errors["password"] = self::MESSAGES["requiredPassword"];
		}
		if (!empty($errors)) {
			$this->redirectBack(
				"errors",
				self::MESSAGES["loginFormContainsErrors"],
				$errors
			);
		}

		// Test de connexion
		$maybeUser = $this->authService->attemptLogin($inputData["username"], $inputData["password"]);
		if (!$maybeUser) {
			$this->redirectBack("errors", self::MESSAGES["invalidCredentials"]);
		}

		$user = $maybeUser;
		$this->authSession->set($user);

		$this->redirectTo(
			$this->authConfig->getRedirectAfterLogin(),
			"success",
			self::MESSAGES["connectionSuccessful"]
		);
	}
}
