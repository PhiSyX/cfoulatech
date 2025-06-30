<?php

namespace App\Controller;

use App\Entity\User;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Contracts\Translation\TranslatorInterface;

final class AccountController extends AbstractController
{
	public function __construct(private readonly TranslatorInterface $translator)
	{
	}

	#[Route("/account", name: "app_account")]
	public function show(): Response
	{
		/** @var User $user */
		$user = $this->getUser();

		if (!$user->isVerified()) {
			$this->addFlash("info", $this->translator->trans("user.check_your_email"));
		}

		return $this->render("account/show.html.twig");
	}
}
