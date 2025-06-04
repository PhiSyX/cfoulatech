<?php

namespace App\Controller;

use App\Entity\ESport;
use App\Form\ESportType;
use App\Repository\ESportRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/e/sport')]
final class ESportController extends AbstractController
{
	#[Route(name: 'app_e_sport_index', methods: ['GET'])]
	public function index(ESportRepository $eSportRepository): Response
	{
		return $this->render('e_sport/index.html.twig', [
			'e_sports' => $eSportRepository->findAll(),
		]);
	}

	#[Route('/new', name: 'app_e_sport_new', methods: ['GET', 'POST'])]
	public function new(Request $request, EntityManagerInterface $entityManager): Response
	{
		$eSport = new ESport();
		$form = $this->createForm(ESportType::class, $eSport);
		$form->handleRequest($request);

		if ($form->isSubmitted() && $form->isValid()) {
			$entityManager->persist($eSport);
			$entityManager->flush();

			return $this->redirectToRoute('app_e_sport_index', [], Response::HTTP_SEE_OTHER);
		}

		return $this->render('e_sport/new.html.twig', [
			'e_sport' => $eSport,
			'form' => $form,
		]);
	}

	#[Route('/{id}', name: 'app_e_sport_show', methods: ['GET'])]
	public function show(ESport $eSport): Response
	{
		return $this->render('e_sport/show.html.twig', [
			'e_sport' => $eSport,
		]);
	}

	#[Route('/{id}/edit', name: 'app_e_sport_edit', methods: ['GET', 'POST'])]
	public function edit(Request $request, ESport $eSport, EntityManagerInterface $entityManager): Response
	{
		$form = $this->createForm(ESportType::class, $eSport);
		$form->handleRequest($request);

		if ($form->isSubmitted() && $form->isValid()) {
			$entityManager->flush();

			return $this->redirectToRoute('app_e_sport_index', [], Response::HTTP_SEE_OTHER);
		}

		return $this->render('e_sport/edit.html.twig', [
			'e_sport' => $eSport,
			'form' => $form,
		]);
	}

	#[Route('/{id}', name: 'app_e_sport_delete', methods: ['POST'])]
	public function delete(Request $request, ESport $eSport, EntityManagerInterface $entityManager): Response
	{
		if ($this->isCsrfTokenValid('delete' . $eSport->getId(), $request->getPayload()->getString('_token'))) {
			$entityManager->remove($eSport);
			$entityManager->flush();
		}

		return $this->redirectToRoute('app_e_sport_index', [], Response::HTTP_SEE_OTHER);
	}
}
