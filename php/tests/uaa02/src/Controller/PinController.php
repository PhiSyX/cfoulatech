<?php

namespace App\Controller;

use App\Entity\Pin;
use App\Form\PinType;
use App\Repository\PinRepository;
use Doctrine\ORM\EntityManagerInterface;
use Knp\Component\Pager\PaginatorInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/pin')]
final class PinController extends AbstractController
{
    /**
     * Liste des Pins
     * @param Request $req
     * @param PaginatorInterface $paginator
     * @param PinRepository $pinRepository
     * @return Response
     */
    #[Route(name: 'app_pin_index', methods: ['GET'])]
    public function index(
        Request            $req,
        PaginatorInterface $paginator,
        PinRepository      $pinRepository,
    ): Response
    {
        if (!$this->getUser()) {
            $this->addFlash("warning", "Vous devez être connecté pour voir la page des pins.");
            return $this->redirectToRoute('app_login');
        }

        $pins = $paginator->paginate(
            $pinRepository->findAll(),
            $req->query->getInt("page", 1),
            12,
        );

        return $this->render('pin/index.html.twig', [
            'title' => 'Tous les Pins',
            'pins' => $pins,
        ]);
    }

    /**
     * Crée un nouveau Pin
     * @param Request $request
     * @param EntityManagerInterface $entityManager
     * @return Response
     */
    #[Route('/create', name: 'app_pin_create', methods: ['GET', 'POST'])]
    public function new(Request $request, EntityManagerInterface $entityManager): Response
    {
        if (!$this->getUser()) {
            $this->addFlash("warning", "Vous devez être connecté pour pouvoir créer un Pin.");
            return $this->redirectToRoute('app_login');
        }

        $pin = (new Pin())->setUser($this->getUser());
        $form = $this->createForm(PinType::class, $pin);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $entityManager->persist($pin);
            $entityManager->flush();

            return $this->redirectToRoute('app_pin_index', [], Response::HTTP_SEE_OTHER);
        }

        return $this->render('pin/create.html.twig', [
            'title' => 'Création d\'un Pin',
            'pin' => $pin,
            'form' => $form,
        ]);
    }

    /**
     * Affiche un Pin en fonction d'un ID
     * @param Pin $pin
     * @return Response
     */
    #[Route('/{id}', name: 'app_pin_show', methods: ['GET'])]
    public function show(Pin $pin): Response
    {
        if (!$this->getUser()) {
            $this->addFlash("warning", "Vous devez être connecté pour voir ce Pin.");
            return $this->redirectToRoute('app_login');
        }

        return $this->render('pin/show.html.twig', [
            'title' => 'Affiche un Pin',
            'pin' => $pin,
        ]);
    }

    /**
     * Page d'édition d'un Pin en fonction d'un id
     * @param Request $request
     * @param Pin $pin
     * @param EntityManagerInterface $entityManager
     * @return Response
     */
    #[Route('/{id}/edit', name: 'app_pin_edit', methods: ['GET', 'POST'])]
    public function edit(Request $request, Pin $pin, EntityManagerInterface $entityManager): Response
    {
        if (!$this->getUser()) {
            $this->addFlash("warning", "Vous devez être connecté pour pouvoir éditer ce Pin.");
            return $this->redirectToRoute('app_login');
        }

        if ($pin->getUser() !== $this->getUser()) {
            $this->addFlash("error", "Vous ne pouvez pas faire cette action sur ce Pin.");
            return $this->redirectToRoute('app_pin_index');
        }

        $form = $this->createForm(PinType::class, $pin);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $entityManager->flush();

            return $this->redirectToRoute('app_pin_index', [], Response::HTTP_SEE_OTHER);
        }

        return $this->render('pin/edit.html.twig', [
            'title' => 'Edition d\'un Pin',
            'pin' => $pin,
            'form' => $form,
        ]);
    }

    /**
     * Suppression d'un Pin en fonction d'un Pin
     * @param Request $request
     * @param Pin $pin
     * @param EntityManagerInterface $entityManager
     * @return Response
     */
    #[Route('/{id}', name: 'app_pin_delete', methods: ['POST'])]
    public function delete(Request $request, Pin $pin, EntityManagerInterface $entityManager): Response
    {
        if (!$this->getUser()) {
            $this->addFlash("warning", "Vous devez être connecté pour pouvoir supprimer de Pin.");
            return $this->redirectToRoute('app_login');
        }

        if ($pin->getUser() !== $this->getUser()) {
            $this->addFlash("error", "Vous ne pouvez pas faire cette action sur ce Pin.");
            return $this->redirectToRoute('app_pin_index');
        }

        if ($this->isCsrfTokenValid('delete' . $pin->getId(), $request->getPayload()->getString('_token'))) {
            $entityManager->remove($pin);
            $entityManager->flush();
        }

        return $this->redirectToRoute('app_pin_index', [], Response::HTTP_SEE_OTHER);
    }
}
