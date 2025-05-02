<?php

namespace App\Controller;

use App\Repository\SportRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
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
}
