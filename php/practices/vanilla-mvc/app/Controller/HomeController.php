<?php

namespace App\Controller;

use App\Auth\Model\Repository\UserRepository;
use App\Auth\Service\AuthService;

class HomeController extends BaseController
{
	private UserRepository $userRepository;

	public function __construct(AuthService $authService)
	{
		parent::__construct($authService);
		$this->userRepository = $authService->getUserRepository();
	}

	/**
	 * Page d'accueil
	 */
	public function index(): void
	{
		$users = $this->userRepository->getAll();
		$this->render(
			"home/index.html.php",
            dataView: ["users" => $users],
			options: ["name" => "home"]);
	}
}
