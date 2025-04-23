<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

final class HomeController extends AbstractController
{
	#[Route('/', name: 'app_home')]
	public function index(): Response
	{
		return $this->render('home/index.html.twig', [
			"hero" => true,
			"hero_title" => "Le sport, c'est la vie",
			"hero_content" => 'Boost ta puissance et ta productivité en buvant nos boissons énergisantes <span class="hl">SportDrink</span>',
			"hero_btn" => "Profite des 20% de réduction",
			"hero_btn_link" => "app_home",
		]);
	}
}
