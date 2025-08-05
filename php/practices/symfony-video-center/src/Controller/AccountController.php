<?php

namespace App\Controller;

use App\Form\ChangeUserAvatarType;
use App\Form\ChangeUserDetailsType;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Security\Http\Attribute\IsGranted;

final class AccountController extends AbstractController
{
    #[Route('/me', name: 'app_account_me')]
    #[IsGranted("IS_AUTHENTICATED_FULLY")]
    public function me(Request $request, EntityManagerInterface $em): Response
    {
        $userData = $this->getUser();
        $avatarForm = $this->createForm(
            ChangeUserAvatarType::class,
            $userData,
        );
        $avatarForm->handleRequest($request);

        $detailsForm = $this->createForm(
            ChangeUserDetailsType::class,
            $userData,
        );
        $detailsForm->handleRequest($request);

        if ($avatarForm->isSubmitted() && $avatarForm->isValid()) {
            $userData->setUpdatedAt(new \DateTimeImmutable());

            if ($userData->getImageName() === null) {
                $userData->setImageName("../default-avatar.png");
            }

            $em->flush();

            @copy(
                dirname(__DIR__, 2) . "/public/default-avatar.png",
                dirname(__DIR__, 2) . "/public/images/default-avatar.png",
            );

            return $this->redirectToRoute("app_account_me");
        }

        if ($detailsForm->isSubmitted() && $detailsForm->isValid()) {
            $userData->setUpdatedAt(new \DateTimeImmutable());
            $em->flush();
            return $this->redirectToRoute("app_account_me");
        }

        return $this->render('account/me.html.twig', [
            'avatarForm' => $avatarForm,
            'detailsForm' => $detailsForm,
        ]);
    }


}
