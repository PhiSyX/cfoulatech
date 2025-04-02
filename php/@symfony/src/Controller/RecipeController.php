<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

final class RecipeController extends AbstractController
{
	#[Route(
		name: 'app_recipe_show',
		path: "/recette/{slug}-{id}",
		requirements: ["slug" => '[\w-]+', "id" => '\d+'],
	)]
	public function show(Request $request, string $slug, int $id): Response
	{
		// Soit 2:
		//
		// $slug = $request->attributes->get("slug");
		// $id   = $request->attributes->get("id");

		$nom = $request->query->get("recette", $slug);

		// Soit 2
		dump($slug);
		dump($id);
		return $this->render('recipe/show.html.twig', [
			"nom"  => $nom,
			"id"   => $id,
		]);
	}
}
