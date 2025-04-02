<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

final class HomeController extends AbstractController
{
	/*
	// Méthode auto-généré par le framework Symfony via la commande de création
	// de controller
	#[Route(path: "/", name: "app_home")]
	public function index(): Response
	{
		return $this->render(
			"home/index.html.twig",
			[
				"controller_name" => HomeController::class,
			]
		);
	}
	*/

	/*
	// Définir explicitement la route dans config/routes.yaml
	public function hello_world(): Response
	{
		return new Response("<h1>Hello World</h1>");
	}
	*/

	/*
	// Définir explicitement la route via l'attribut Route
	#[Route(path: "/", name: "hello_world")]
	public function hello_world(): Response
	{
		return new Response("<h1>Hello World</h1>");
	}
	*/

	// Essayons d'accéder à notre page avec et sans paramètres d'URL :
	//
	//    http://symfony/
	//    http://symfony/?nom=XXX
	//
	// Remplacer le World par le nom passé en paramètre, uniquement s'il existe.
	#[Route(path: "/", name: "hello_name")]
	public function hello_name(Request $request): Response
	{
		//var_dump($request);
		//die(dump($request));
		//dd($request);
		$nom = $request->query->get("nom", "World");
		return new Response("<h1>Hello $nom</h1>");
	}
}
