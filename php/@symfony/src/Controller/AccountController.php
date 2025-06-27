<?php

namespace App\Controller;

use App\Entity\User;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

final class AccountController extends AbstractController
{
	#[Route("/account", name: "app_account")]
	public function index(): Response
	{
		/** @var User $user */
		$user = $this->getUser();

		if (!$user->isVerified()) {
			$this->addFlash("info", "Check your email to confirm your registration");
		}

		return $this->render("account/index.html.twig", [
			"controller_name" => "AccountController",
		]);
	}
}
