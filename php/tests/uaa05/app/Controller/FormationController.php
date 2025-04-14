<?php

namespace App\Controller;

use App\Auth\Service\AuthService;
use App\Model\Repository\FormationRepository;
use App\Model\Repository\StagiaireRepository;

class FormationController extends BaseController
{
	private FormationRepository $formationRepository;
	private StagiaireRepository $stagiaireRepository;

	public function __construct(
		AuthService         $authService,
		FormationRepository $formationRepository,
		StagiaireRepository $stagiaireRepository
	)
	{
		parent::__construct($authService);
		$this->formationRepository = $formationRepository;
		$this->stagiaireRepository = $stagiaireRepository;
	}

	public function index(): void
	{
		$formations = $this->formationRepository->getAll();
		echo json_encode($formations);
	}

	public function show(int $id): void
	{
		$formation = $this->formationRepository->getOne(data: ["id" => $id]);

		if (!$formation) {
			$this->redirectTo("index.php", "error", "La formation demandée n'a pas été trouvée.");
		}

		$stagiaires = $this->stagiaireRepository->getAll(
			bindings: ["formation_id" => $id]
		);

		$formation->setStagiaires($stagiaires);

		$this->render('formation/show.html.php', [
			'formation' => $formation,
		], options: ["name" => "formation"]);
	}
}
