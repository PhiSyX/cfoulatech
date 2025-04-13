<?php

require_once "vendor/autoload.php";

use App\Auth\Controller\AuthLogoutController;
use App\Auth\Model\Repository\UserRepository;
use App\Auth\Service\AuthService;

$controller = new AuthLogoutController(new AuthService(new UserRepository()));

$controller->authOnly();

if ($controller->isPostRequest()) {
	$controller->handle();
} else {
	$controller->logout();
}
