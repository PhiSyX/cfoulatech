<?php

namespace App\Controller;

use App\Entity\Recipe;
use App\Repository\RecipeRepository;
use DateTimeImmutable;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

final class RecipeController extends AbstractController
{
	#[Route(path: "/recette", name: "app_recipe_index")]
	public function index(Request $req, RecipeRepository $recipeRepository): Response
	{
		if ($req->query->has("duration")) {
			$recipes = $recipeRepository->findFromSmallerDuration(
				(int)$req->query->filter(
					"duration",
					0,
					\FILTER_VALIDATE_INT,
					['flags' => FILTER_NULL_ON_FAILURE],
				),
			);
		} else {
			$recipes = $recipeRepository->findAll();
		}
		return $this->render("recipe/index.html.twig", [
			"recipes" => $recipes,
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
	public function show(
		RecipeRepository $recipeRepository,
		int              $id,
		string           $slug,
	): Response
	{
		$recipe = $recipeRepository->find($id);

		if ($slug !== $recipe->getSlug()) {
			return $this->redirectToRoute('app_recipe_show', [
				'id' => $id,
				'slug' => $recipe->getSlug(),
			]);
		}

		$user = [
			"firstname" => "Mike",
			"username" => "PhiSyX",
		];

		//		dump($slug);
		//		dump($id);
		//		dump($user);

		return $this->render("recipe/show.html.twig", [
			"user" => $user,
			"recipe" => $recipe,
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

//	#[Route(path: "/recette/create", name: "app_recipe_create")]
//	public function create(): Response
//	{
//		return $this->create([]);
//	}

	#[Route(path: "/recette/create", methods: ["POST"])]
	public function store(EntityManagerInterface $em): Response
	{
		$recipe = (new Recipe())
			->setTitle("Omelette")
			->setSlug("omelette")
			->setContent("Prenez des oeufs, cassez-les et battez-les en rajoutant du sel")
			->setDuration(6)
			->setCreatedAt(new DateTimeImmutable())
			->setUpdatedAt(new DateTimeImmutable());

		$em->persist($recipe);
		$em->flush();

		return $this->json($recipe);
	}

	#[Route(
		path: "/recette/{id}/edit",
		requirements: ["id" => '\d+'],
		methods: ["PUT"]
	)]
	public function update(
		int                    $id,
		RecipeRepository       $recipeRepository,
		EntityManagerInterface $em,
	): Response
	{
		$recipe = $recipeRepository->find($id);
		$recipe->setTitle("Omelette");
		$em->persist($recipe);
		$em->flush();

		return $this->json(compact("recipe"));
	}

	#[Route(
		path: "/recette/{id}/delete",
		requirements: ["id" => '\d+'],
		methods: ["DELETE"]
	)]
	public function delete(
		int                    $id,
		RecipeRepository       $recipeRepository,
		EntityManagerInterface $em,
	): Response
	{
		$recipe = $recipeRepository->find($id);
		$em->remove($recipe);
		$em->flush();

		return $this->json(compact("recipe"));
	}

	/*
	#[Route(path: "/recette/exo12")]
	public function exo12(EntityManagerInterface $em): Response
	{
		$recipe1 = (new Recipe())
			->setCreatedAt(new DateTimeImmutable())
			->setUpdatedAt(new DateTimeImmutable())
			->setTitle("Exo 12 #1")
			->setContent("Le contenu de l'exo 12 #1")
			->setSlug("exo12-1");

		$recipe2 = (new Recipe())
			->setCreatedAt(new DateTimeImmutable())
			->setUpdatedAt(new DateTimeImmutable())
			->setTitle("Exo 12 #2")
			->setContent("Le contenu de l'exo 12 #2")
			->setSlug("exo12-2");

		$em->persist($recipe1);
		$em->persist($recipe2);
		$em->flush();

		return $this->json(compact("recipe1", "recipe2"));
	}

	#[Route(path: "/recette/exo13")]
	public function exo13(EntityManagerInterface $em): Response
	{
		$recipe = $em->getRepository(Recipe::class)->find(5);
		$recipe
			->setTitle("Exo 12")
			->setSlug("exo12")
			->setContent("Le contenu de l'exo 12");
		$em->persist($recipe);
		$em->flush();
		return $this->json(compact("recipe"));
	}

	#[Route(path: "/recette/exo14")]
	public function exo14(EntityManagerInterface $em): Response
	{
		$recipe = $em->getRepository(Recipe::class)->find(6);
		$em->remove($recipe);
		$em->flush();
		return new Response("Recette id 6 bien supprimé");
	}
	*/
}
