<?php

namespace App\Controller;

use App\DTO\SearchDTO;
use App\Entity\Recipe;
use App\Entity\RecipeComment;
use App\Entity\User;
use App\Form\RecipeCommentType;
use App\Form\RecipeType;
use App\Form\SearchForm;
use App\Repository\RecipeCommentRepository;
use App\Repository\RecipeRepository;
use DateTimeImmutable;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Contracts\Translation\TranslatorInterface;

final class RecipeController extends AbstractController
{
	public function __construct(private TranslatorInterface $translator, private EntityManagerInterface $em)
	{
	}

	#[Route("/recette", name: "app_recipe_index")]
	public function index(
		Request          $req,
		RecipeRepository $recipeRepository,
	): Response
	{
		/** @var ?User $user */
		$user = $this->getUser();
		if ($user && !$user->isVerified()) {
			$this->addFlash("info", $this->translator->trans("user.error.need_verify_email"));
		}

		$searchDTO = new SearchDTO();
		$searchForm = $this
			->createForm(SearchForm::class, $searchDTO, [
				"attr" => [
					"placeholder" => "Recherche une recette...",
				],
			])
			->handleRequest($req);

		if ($searchForm->isSubmitted() && $searchForm->isValid()) {
			$recipes = $recipeRepository->filter(
				$searchDTO,
				$req->query->getInt("page", 1),
			);
		} else {
			$recipes = $recipeRepository->all(
				duration: $req->query->filter(
					"duration",
					$req->query->has("duration") ? 0 : null,
					FILTER_VALIDATE_INT,
					["flags" => FILTER_NULL_ON_FAILURE],
				),
				page: $req->query->getInt("page", 1),
			);
		}

		return $this->render("recipe/index.html.twig", [
			"searchForm" => $searchForm->createView(),
			"recipes" => $recipes,
		]);
	}

	/*
	// Récupérer les chemins d'URL. Les associer à des noms.
	//
	// Valider la valeur de ces chemins via leur nom, en utilisant les
	// expressions régulières.
	#[Route(
		"/recette/{slug}-{id}",
		requirements: ["slug" => "[\w\d-]+", "id" => "\d+"],
		name: "app_recipe_show",
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
		"/recette/{slug}-{id}",
		name: "app_recipe_show",
		requirements: ["slug" => "[\w\d-]+", "id" => "\d+"],
	)]
	public function show(
		Recipe  $recipe,
		Request $req,
		string  $slug,
	): Response
	{
		if ($slug !== $recipe->getSlug()) {
			return $this->redirectToRoute("app_recipe_show", [
				"id" => $recipe->getId(),
				"slug" => $recipe->getSlug(),
			]);
		}

		/** @var ?User $user */
		$user = $this->getUser();
		$canAlter = (
			$user !== null &&
			$user->getEmail() === $recipe->getUser()->getEmail()
		);

		$recipeCommentForm = $this
			->createForm(RecipeCommentType::class, options: [
				"action" => $this->generateUrl("app_recipe_create_comment", ["id" => $recipe->getId()]),
			])
			->handleRequest($req);

		return $this->render("recipe/show.html.twig", [
			"commentForm" => $recipeCommentForm->createView(),
			"recipe" => $recipe,
			"user" => $user,
			"canAlter" => $canAlter,
		]);
	}

	// Ajout de commentaire pour la recette
	#[Route(
		"/recette/{id}/comment",
		name: "app_recipe_create_comment",
		requirements: ["id" => "\d+"],
		methods: ["POST"],
	)]
	public function createCommentFor(
		Recipe  $recipe,
		Request $req,
	): Response
	{
		/** @var ?User $user */
		$user = $this->getUser();

		if (!$user) {
			$this->addFlash("error", $this->translator->trans("comment.error.need_auth"));
			return $this->redirectToRoute("app_recipe_show", [
				"id" => $recipe->getId(),
				"slug" => $recipe->getSlug(),
			]);
		}

		$recipeComment = (new RecipeComment())
			->setAuthor($user)
			->setRecipe($recipe)
			->setCreatedAt(new DateTimeImmutable());
		$recipeCommentForm = $this->createForm(RecipeCommentType::class, $recipeComment)
			->handleRequest($req);

		if ($recipeCommentForm->isSubmitted() && $recipeCommentForm->isValid()) {
			$this->em->persist($recipeComment);
			$this->em->flush();
			$this->addFlash("success", $this->translator->trans("comment.success.created"));
		}

		return $this->forward(RecipeController::class . "::show", [
			"id" => $recipe->getId(),
			"slug" => $recipe->getSlug(),
		]);
	}

	// Ajout de commentaire pour la recette
	#[Route(
		"/recette/{rid}/comment/{cid}",
		name: "app_recipe_delete_comment",
		requirements: ["rid" => "\d+", "cid" => "\d+"],
		methods: ["DELETE"],
	)]
	public function deleteCommentFor(
		RecipeCommentRepository $recipeCommentRepository,
		Request                 $req,
		int                     $rid,
		int                     $cid,
	): Response
	{
		$csrfToken = $req->getPayload()->get("_csrf_token");

		if (!$this->isCsrfTokenValid("recipe_comment_delete", $csrfToken)) {
			throw $this->createAccessDeniedException("Jeton CSRF Invalide.");
		}

		/** @var ?User $user */
		$user = $this->getUser();

		$showParams = [
			"id" => $rid,
			"slug" => "xxx",
		];

		if (!$user) {
			$this->addFlash("error", $this->translator->trans("comment.error.need_auth"));
			return $this->redirectToRoute("app_recipe_show", $showParams);
		}

		$comment = $recipeCommentRepository->findOne($rid, $user->getId(), $cid);

		if (!$comment) {
			$this->addFlash("error", $this->translator->trans("comment.error.not_found"));
			return $this->redirectToRoute("app_recipe_show", $showParams);
		}

		$this->em->remove($comment);
		$this->em->flush();

		$this->addFlash("success", $this->translator->trans("comment.success.deleted"));
		return $this->forward(RecipeController::class . "::show", $showParams);
	}

	/*
	// Récupérer les chemins d'URL. Les associer à des noms.
	//
	// Valider la valeur de ces chemins via leur nom, en utilisant les
	// expressions régulières.
	#[Route(
		"/api/recette/{slug}-{id}",
		requirements: ["slug" => "[\w\d-]+", "id" => "\d+"],
		name: "api_recipe_show",
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
	#[
		Route(
			"/api/recette/{slug}-{id}",
			name: "api_recipe_show",
			requirements: ["slug" => "[\w\d-]+", "id" => "\d+"],
		)]
	public function api_show(Request $req, string $slug, int $id): Response
	{
		// La fonction `compact("id", "slug")` est un équivalent de faire
		// `["id" => $id, "slug" => $slug]`
		return $this->json(compact("id", "slug"));
	}

	#[Route("/recette/create", name: "app_recipe_create", methods: ["GET", "POST"])]
	#[IsGranted("ROLE_USER")]
	public function add(Request $req): Response
	{
		/** @var ?User $user */
		$user = $this->getUser();
		if ($user) {
			if (!$user->isVerified()) {
				$this->addFlash("error", $this->translator->trans("user.error.need_verify_email_access_denied"));
				return $this->redirectToRoute("app_recipe_index");
			}
		} else {
			$this->addFlash("error", $this->translator->trans("recipe.error.need_auth_alter"));
			return $this->redirectToRoute("app_login");
		}

		$recipe = (new Recipe())
			->setUser($this->getUser())
			->setCreatedAt(new DateTimeImmutable())
			->setUpdatedAt(new DateTimeImmutable());

		$form = $this->createForm(RecipeType::class, $recipe)->handleRequest($req);
		if ($form->isSubmitted() && $form->isValid()) {
			$this->em->persist($recipe);
			$this->em->flush();
			$this->addFlash("success", $this->translator->trans("recipe.success.created"));
			return $this->redirectToRoute("app_recipe_index");
		}
		return $this->render("recipe/add.html.twig", [
			"myRecipeForm" => $form,
		]);
	}

	#[Route("/recette/create", methods: ["POST"])]
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
		"/recette/{id}/edit",
		name: "app_recipe_edit",
		requirements: ["id" => "\d+"],
	)]
	public function edit(Request $request, Recipe $recipe): Response
	{
		/** @var ?User $user */
		$user = $this->getUser();
		if ($user) {
			if (!$user->isVerified()) {
				$this->addFlash("error", $this->translator->trans("user.error.need_verify_email_access_denied"));
				return $this->redirectToRoute("app_recipe_index");
			}

			if ($user->getEmail() !== $recipe->getUser()->getEmail()) {
				$this->addFlash("error", $this->translator->trans("recipe.error.cant_alter", [
					'%name%' => $recipe->getUser()->getFirstname(),
				]));
				return $this->redirectToRoute("app_recipe_index");
			}
		} else {
			$this->addFlash("error", $this->translator->trans("recipe.error.need_auth_alter"));
			return $this->redirectToRoute("app_login");
		}

		$form = $this->createForm(
			RecipeType::class,
			$recipe,
			["label" => ["save" => "Éditer"]],
		)->handleRequest($request);

		if ($form->isSubmitted() && $form->isValid()) {
			$recipe->setUpdatedAt(new DateTimeImmutable());
			$this->em->flush();
			$this->addFlash("success", $this->translator->trans("recipe.success.edited"));
			return $this->redirectToRoute("app_recipe_show", [
				"id" => $recipe->getId(),
				"slug" => $recipe->getSlug(),
			]);
		}

		return $this->render("recipe/edit.html.twig", [
			"recipe" => $recipe,
			"myForm" => $form,
		]);
	}

	#[Route(
		"/recette/{id}/update",
		requirements: ["id" => "\d+"],
		methods: ["PUT"]
	)]
	public function update(
		int              $id,
		RecipeRepository $recipeRepository,
	): Response
	{
		$recipe = $recipeRepository->find($id);
		$recipe->setTitle("Omelette");
		$this->em->persist($recipe);
		$this->em->flush();

		return $this->json(compact("recipe"));
	}

	#[Route(
		"/recette/{id}/delete",
		name: "app_recipe_delete",
		requirements: ["id" => "\d+"],
	)]
	public function delete(
		Recipe $recipe,
	): Response
	{
		/** @var ?User $user */
		$user = $this->getUser();
		if ($user) {
			if (!$user->isVerified()) {
				$this->addFlash("error", $this->translator->trans("user.error.need_verify_email_access_denied"));
				return $this->redirectToRoute("app_recipe_index");
			}

			if ($user->getEmail() !== $recipe->getUser()->getEmail()) {
				$this->addFlash("error", $this->translator->trans("recipe.error.cant_alter", [
					'%name%' => $recipe->getUser()->getFirstname(),
				]));
				return $this->redirectToRoute("app_recipe_index");
			}
		} else {
			$this->addFlash("error", $this->translator->trans("recipe.error.need_auth_alter"));
			return $this->redirectToRoute("app_login");
		}

		$title = $recipe->getTitle();
		$this->em->remove($recipe);
		$this->em->flush();
		$this->addFlash("info", $this->translator->trans("recipe.success.deleted", [
			"%title%" => $title,
		]));
		return $this->redirectToRoute("app_recipe_index");
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

	#[Route('/recette/{id}/like', name: 'app_recipe_like', methods: ['POST'])]
	public function like(Recipe $recipe): Response
	{
		/** @var ?User $user */
		$user = $this->getUser();
		if (!$user || $recipe->hasLikeFrom($user)) {
			throw $this->createAccessDeniedException();
		}

		$recipe->addLike($user);
		$this->em->flush();

		return $this->json([
			"success" => $this->translator->trans("recipe.success.created_like", [
				"%title%" => $recipe->getTitle(),
			]),
			"likes" => count($recipe->getLikes()),
			"flow" => ["unlike", "like"],
			"button_title" => $this->translator->trans("recipe.unlike.button.title"),
		]);
	}

	#[Route('/recette/{id}/unlike', name: 'app_recipe_unlike', methods: ['DELETE'])]
	public function unlike(Recipe $recipe): Response
	{
		/** @var ?User $user */
		$user = $this->getUser();
		if (!$user || !$recipe->hasLikeFrom($user)) {
			throw $this->createAccessDeniedException();
		}

		$recipe->removeLike($user);
		$this->em->flush();

		return $this->json([
			"success" => $this->translator->trans("recipe.success.deleted_like", [
				"%title%" => $recipe->getTitle(),
			]),
			"likes" => count($recipe->getLikes()),
			"flow" => ["like", "unlike"],
			"button_title" => $this->translator->trans("recipe.like.button.title"),
		]);
	}
}
