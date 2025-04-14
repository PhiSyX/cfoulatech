<?php

namespace App\Auth\Controller;

use App\Controller\BaseController;

class AuthLogoutController extends BaseController
{
	/**
	 * Page de déconnexion
	 */
	public function logout(): void
	{
		$this->render(
			"auth/logout.html.php",
			dataView: [
				"user" => $this->authSession->get(),
			],
			options: [
				"name" => "logout"
			]
		);
	}

	/**
	 * Gestion du formulaire de déconnexion
	 */
	public function handle(): void
	{
		$this->authSession->unset();

		$this->redirectTo(
			$this->authConfig->getRedirectAfterLogout(),
			"success",
			"Vous êtes maintenant déconnecté"
		);
	}
}
