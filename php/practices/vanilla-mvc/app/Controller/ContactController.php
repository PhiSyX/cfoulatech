<?php

namespace App\Controller;

class ContactController extends BaseController
{
	/**
	 * Page de contact
	 */
	public function index(): void
	{
		$this->render("contact/index.html.php", options: ["name" => "contact"]);
	}

	/**
	 * Gestion du formulaire de contact
	 */
	public function handle(): void
	{
		$inputData = $this->formData(["full-name", "email-address", "phone-number", "subject", "message"]);

		$errors = [];

		foreach ($inputData as $name => $input) {
			if (empty(trim($input))) {
				$errors[$name] = "Le champ '$name' est vide";
				continue;
			}

			$minChars = 3;
			if (strlen($input) < $minChars) {
				$errors[$name] = "Le champ '$name' est trop court ($minChars caractères minimum)";
			}
		}

		if (!filter_var($inputData["email-address"], FILTER_VALIDATE_EMAIL)) {
			$errors["email-address"] = "Veuillez entrer une adresse e-mail valide";
		}

		if (!empty($errors)) {
			$this->redirectBack(
				"errors",
				"Le formulaire de contact n'est pas valide",
				$errors
			);
		}

		var_dump($inputData);
	}
}
