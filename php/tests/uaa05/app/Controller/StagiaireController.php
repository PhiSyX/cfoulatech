<?php

namespace App\Controller;

use App\Auth\Service\AuthService;
use App\Model\Repository\FormationRepository;
use App\Model\Repository\StagiaireRepository;

class StagiaireController extends BaseController
{
	private FormationRepository $formationRepository;
	private StagiaireRepository $stagiaireRepository;

	public function __construct(
		AuthService         $authService,
		StagiaireRepository $stagiaireRepository,
		FormationRepository $formationRepository
	)
	{
		parent::__construct($authService);
		$this->formationRepository = $formationRepository;
		$this->stagiaireRepository = $stagiaireRepository;
	}

	public function index(): void
	{
		$stagiaires = $this->stagiaireRepository->getAll(
			fields: [
				"stagiaires.id",
				"stagiaires.nom",
				"stagiaires.prenom",
				"stagiaires.email",
				"stagiaires.date_naissance",
				"formations.id AS formation_id",
				"formations.intitule"
			],
			options: [
				"join.inner" => [
					"table" => "formations",
					"field" => "formations.id",
					"ref" => "stagiaires.formation_id"
				],
				"order.asc" => "nom"
			]);

		$this->render(
			"stagiaire/index.html.php",
			["stagiaires" => $stagiaires],
			["name" => "stagiaires"]);
	}

	public function add(): void
	{
		$formations = $this->formationRepository->getAll();
		$this->render("stagiaire/add.html.php",
			dataView: [
				"formations" => $formations
			], options: ["name" => "stagiaire"]);
	}

	public function store(): void
	{
		$data = $this->formData(["nom", "prenom", "email", "date_naissance", "formation_id"]);
		$state = $this->stagiaireRepository->insertMany([
			[
				"nom" => $data["nom"],
				"prenom" => $data["prenom"],
				"email" => $data["email"],
				"date_naissance" => $data["date_naissance"],
				"formation_id" => $data["formation_id"]
			]
		]);
		if ($state) {
			$this->redirectTo(
				"stagiaires.php",
				"success",
				"Le stagiaire a été ajouté"
			);
		} else {
			$this->redirectBack("error", "Impossible d'ajouter ce stagiaire");
		}
	}
}
