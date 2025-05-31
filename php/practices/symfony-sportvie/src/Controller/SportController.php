<?php

namespace App\Controller;

use App\Entity\Sport;
use App\Form\SportForm;
use App\Repository\SportRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\Routing\Attribute\Route;

final class SportController extends AbstractController
{
	#[Route('/sport', name: 'app_sport')]
	public function index(SportRepository $sportRepository): Response
	{
		$sports = $sportRepository->findAll();
		return $this->render('sport/index.html.twig', [
			'sports' => $sports,
		]);
	}

	#[Route('/sport/{id}', name: 'app_sport_show', requirements: ['id' => '\d+'])]
	public function show(SportRepository $sportRepository, int $id): Response
	{
		$sport = $sportRepository->find($id);

		// FIXME: handle id not found here

		return $this->render('sport/show.html.twig', [
			'sport' => $sport,
			'sport_id' => $id,
		]);
	}

	// 1) symfony console make:form Sport
	#[Route('/sport/update/{id}', name: 'app_sport_edit', requirements: ['id' => '\d+'])]
	public function edit(Request $req, EntityManagerInterface $em, Sport $sport): Response
	{
		$sportForm = $this->createForm(SportForm::class, $sport)->handleRequest($req);

		// 5)
		if ($sportForm->isSubmitted() && $sportForm->isValid()) {
			$em->flush();
			$this->addFlash("success", "La modification du sport a bien été effectué.");
			return $this->redirectToRoute('app_sport_show', ['id' => $sport->getId()]);
		}

		return $this->render('sport/edit.html.twig', [
			'sport' => $sport,
			"sportForm" => $sportForm,
		]);
	}
}
