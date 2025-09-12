<?php

namespace App\Controller;

use App\Form\ChangeUserDetailsType;
use Doctrine\ORM\EntityManagerInterface;
use Knp\Component\Pager\Pagination\PaginationInterface;
use Knp\Component\Pager\PaginatorInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Security\Http\Attribute\IsGranted;

#[IsGranted('IS_AUTHENTICATED_FULLY')]
final class AccountController extends AbstractController
{
    /**
     * Page de compte en session
     * @param PaginatorInterface $paginator
     * @param Request $req
     * @return Response
     */
    #[Route('/account', name: 'app_account')]
    public function me(
        PaginatorInterface $paginator,
        Request            $req,
    ): Response
    {
        $items = $this->beforeAction(
            $paginator,
            $req,
        );

        return $this->render('account/me.html.twig', [
            'title' => 'Mon profil',
            'group' => [
                'items' => $items,
            ],
        ]);
    }

    /**
     * Page d'édition du compte en session
     * @param EntityManagerInterface $em
     * @param PaginatorInterface $paginator
     * @param Request $req
     * @return Response
     */
    #[Route('/account/edit', name: 'app_account_edit')]
    public function edit(
        EntityManagerInterface $em,
        PaginatorInterface     $paginator,
        Request                $req,
    ): Response
    {
        $items = $this->beforeAction(
            $paginator,
            $req,
        );

        $user = $this->getUser();
        $userDetailsForm = $this->createForm(ChangeUserDetailsType::class, $user);
        $userDetailsForm->handleRequest($req);

        if ($userDetailsForm->isSubmitted() && $userDetailsForm->isValid()) {
            $em->persist($user);
            $em->flush();
            return $this->redirectToRoute('app_account');
        }

        return $this->render('account/edit.html.twig', [
            'title' => 'Mon profil (Mode édition)',
            'group' => [
                'items' => $items,
            ],
            'userDetailsForm' => $userDetailsForm->createView(),
        ]);
    }

    private function beforeAction(
        PaginatorInterface $paginator,
        Request            $req,
    ): PaginationInterface
    {
        if (!$this->getUser()->isVerified()) {
            $this->addFlash(
                'warning',
                'Pour profiter de toutes les fonctionnalités du site,' .
                ' la vérification de ton compte est nécéssaire. Vérifie tes mails !',
            );
        }

        $list = $this->getUser()->getPins();

        return $paginator->paginate(
            $list,
            $req->query->getInt("page", 1),
            12,
        );
    }
}
