<?php

require_once "vendor/autoload.php";

use App\Auth\Model\Repository\UserRepository;
use App\Auth\Service\AuthService;
use App\Controller\FormationController;
use App\Model\Repository\FormationRepository;
use App\Model\Repository\StagiaireRepository;

$controller = new FormationController(
	new AuthService(new UserRepository()),
	new FormationRepository(),
	new StagiaireRepository(),
);

$controller->authOnly();

if ($controller->hasGetRequest("id")) {
	$controller->show((int)$_GET["id"]);
}else {
	$controller->index();
}
