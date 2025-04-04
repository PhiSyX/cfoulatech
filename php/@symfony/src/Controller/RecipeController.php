<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

final class RecipeController extends AbstractController
{
	#[Route(path: "/recette", name: "app_recipe_index")]
	public function index(Request $req): Response
	{
		return new Response("Bienvenue dans la page des recettes !");
	}

	// Récupérer les chemins d'URL. Les associer à des noms.
	//
	// Valider la valeur de ces chemins via leur nom, en utilisant les
	// expressions régulières.
	#[Route(
		path: "/recette/{slug}-{id}",
		requirements: ["slug" => '[\w\d-]+', "id" => '\d+'],
		name: 'app_recipe_show',
	)]
	public function show(Request $req, string $slug, int $id): Response
	{
		// Soit 2:
		//
		// $slug = $req->attributes->get("slug");
		// $id   = $req->attributes->get("id");

		$nom = $req->query->get("recette", $slug);

		// Soit 2
		dump($slug);
		dump($id);
		return $this->render('recipe/show.html.twig', [
			"nom"  => $nom,
			"id"   => $id,
		]);
	}

	// Récupérer les chemins d'URL. Les associer à des noms.
	//
	// Valider la valeur de ces chemins via leur nom, en utilisant les
	// expressions régulières.
	#[Route(
		path: "/api/recette/{slug}-{id}",
		requirements: ["slug" => '[\w\d-]+', "id" => '\d+'],
		name: 'api_recipe_show',
	)]
	public function api_show(Request $req, string $slug, int $id): Response
	{
		// use Symfony\Component\HttpFoundation\JsonResponse;
		//
		// return new JsonResponse([
		// 	"id" => $id,
		// 	"slug" => $slug,
		// ]);

		// `compact("id", "slug")` est un équivalent de `["id" => $id, "slug" => $slug]`
		return $this->json( compact("id", "slug") );
	}
}
