<?php

namespace App\Controller;

use App\Repository\SportRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

final class SportController extends AbstractController
{
	#[Route('/sport', name: 'app_sport')]
	public function index(SportRepository $sportRepository): Response
	{
		$sports = $sportRepository->findAll();
		dump($sports);
		return $this->render('sport/index.html.twig', [
			'controller_name' => 'SportController',
			'sports' => $sports,
		]);
	}

	#[Route('/sport/{id}', name: 'app_sport_show', requirements: ['id' => '\d+'])]
	public function show(SportRepository $sportRepository, int $id): Response
	{
		$sport = $sportRepository->find($id);
		dump($sport);
		return $this->render('sport/show.html.twig', [
			'controller_name' => 'SportController',
			'sport' => $sport,
		]);
	}
}
