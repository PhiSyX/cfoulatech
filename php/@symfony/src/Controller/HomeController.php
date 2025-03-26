<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

final class HomeController extends AbstractController
{
	#[Route("/", name: "app_home")]
	public function index(): Response
	{
		return $this->render(
			"home/index.html.twig",
			[
				"controller_name" => HomeController::class,
			]
		);
	}

	#[Route("/hello-world", name: "app_hello_world")]
	public function hello_world(): Response
	{
		return new Response("<h1>Hello World</h1>");
	}
}
