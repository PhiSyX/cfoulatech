<?php

namespace App\Controller;

use App\Model\Repository\FormationRepository;
use App\Auth\Service\AuthService;

class HomeController extends BaseController
{
	private FormationRepository $formationRepository;

	public function __construct(AuthService $authService, FormationRepository $formationRepository)
	{
		parent::__construct($authService);
		$this->formationRepository = $formationRepository;
	}

	/**
	 * Page d'accueil
	 */
	public function index(): void
	{
		$formations = $this->formationRepository->getAll();
		$this->render(
			"home/index.html.php",
            dataView: ["formations" => $formations],
			options: ["name" => "home"]);
	}
}
