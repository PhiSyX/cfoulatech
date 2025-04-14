<?php

require_once "vendor/autoload.php";

use App\Auth\Model\Repository\UserRepository;
use App\Auth\Service\AuthService;
use App\Controller\StagiaireController;
use App\Model\Repository\FormationRepository;
use App\Model\Repository\StagiaireRepository;

$controller = new StagiaireController(
	new AuthService(new UserRepository()),
	new StagiaireRepository(),
	new FormationRepository(),
);
$controller->authOnly();

if ($controller->hasGetRequest("action", "add")) {
	if ($controller->isPostRequest()) {
		$controller->store();
	} else {
		$controller->add();
	}
} else {
	$controller->index();
}
