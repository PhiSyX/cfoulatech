<?php

namespace App\Controller;

use App\Entity\User;
use App\Form\UserForm;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
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

		if (!$user) {
			$this->addFlash("error", $this->translator->trans("account.need_login"));
			return $this->redirectToRoute("app_login");
		}

		if (!$user->isVerified()) {
			$this->addFlash("info", $this->translator->trans("user.check_your_email"));
		}

		return $this->render("account/show.html.twig");
	}

	#[Route("/account/edit", name: "app_account_edit")]
	public function edit(
		Request                $request,
		EntityManagerInterface $em,
		TranslatorInterface    $translator,
	): Response
	{
		/** @var User $user */
		$user = $this->getUser();

		if (!$user) {
			$this->addFlash("error", $this->translator->trans("account.need_login"));
			return $this->redirectToRoute("app_login");
		}

		$form = $this->createForm(UserForm::class, $user);
		$form->handleRequest($request);

		if ($form->isSubmitted() && $form->isValid()) {
			$user->setUpdatedAt(new \DateTimeImmutable());
			$em->flush();
			$this->addFlash("success", $translator->trans("account.success.edited"));
			return $this->redirectToRoute("app_account");
		}

		return $this->render("account/edit.html.twig", [
			'user' => $user,
			'userForm' => $form->createView(),
		]);
	}
}
