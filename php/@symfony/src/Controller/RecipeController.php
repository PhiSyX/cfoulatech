<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

final class RecipeController extends AbstractController
{
	#[Route(path: "/recette", name: "app_recipe_index")]
	public function index(Request $req): Response
	{
		return $this->render("recipe/index.html.twig", [
			"recipes" => [
				[
					"id" => 1,
					"title" => "Pizza Capricieuse",
					"slug" => "pizza-capricciosa",
				], [
					"id" => 2,
					"title" => "Pizza 4 Fromages",
					"slug" => "pizza-4-fromages",
				], [
					"id" => 3,
					"title" => "Pizza Margherita",
					"slug" => "pizza-margherita",
				],
			],
		]);
	}

	/*
	// Récupérer les chemins d'URL. Les associer à des noms.
	//
	// Valider la valeur de ces chemins via leur nom, en utilisant les
	// expressions régulières.
	#[Route(
		path: "/recette/{slug}-{id}",
		requirements: ["slug" => '[\w\d-]+', "id" => '\d+'],
		name: 'app_recipe_show',
	)]
	public function show(Request $req): Response
	{
		$slug = $req->attributes->get("slug");
		$id   = $req->attributes->get("id");

		dump($slug);
		dump($id);
		return $this->render("recipe/show.html.twig", [
			"slug"  => $slug,
			"id"   => $id,
		]);
	}
	*/

	// Récupérer les chemins d'URL. Les associer à des noms.
	//
	// Valider la valeur de ces chemins via leur nom, en utilisant les
	// expressions régulières.
	#[Route(
		path: "/recette/{slug}-{id}",
		name: "app_recipe_show",
		requirements: ["slug" => '[\w\d-]+', "id" => '\d+'],
	)]
	public function show(Request $req, string $slug, int $id): Response
	{
		$user = [
			"firstname" => "Mike",
			"username" => "PhiSyX",
		];

		dump($slug);
		dump($id);
		dump($user);

		return $this->render("recipe/show.html.twig", [
			"slug" => $slug,
			"id" => $id,
			"user" => $user,
		]);
	}

	/*
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
		return new JsonResponse([
			"id" => $id,
			"slug" => $slug,
		]);
	}
	*/

	// Récupérer les chemins d'URL. Les associer à des noms.
	//
	// Valider la valeur de ces chemins via leur nom, en utilisant les
	// expressions régulières.
	#[Route(
		path: "/api/recette/{slug}-{id}",
		name: "api_recipe_show",
		requirements: ["slug" => '[\w\d-]+', "id" => '\d+'],
	)]
	public function api_show(Request $req, string $slug, int $id): Response
	{
		// La fonction `compact("id", "slug")` est un équivalent de faire
		// `["id" => $id, "slug" => $slug]`
		return $this->json(compact("id", "slug"));
	}
}
