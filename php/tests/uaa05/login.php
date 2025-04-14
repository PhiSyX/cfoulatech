<?php

require_once "vendor/autoload.php";

use App\Auth\Controller\AuthLoginController;
use App\Auth\Model\Repository\UserRepository;
use App\Auth\Service\AuthService;

$controller = new AuthLoginController(new AuthService(new UserRepository()));

$controller->anonymousOnly();

if ($controller->isPostRequest()) {
	$controller->handle();
} else {
	$controller->login();
}
