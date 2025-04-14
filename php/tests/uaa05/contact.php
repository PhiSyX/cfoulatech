<?php

require_once "vendor/autoload.php";

use App\Auth\Model\Repository\UserRepository;
use App\Auth\Service\AuthService;
use App\Controller\ContactController;

$controller = new ContactController(new AuthService(new UserRepository()));

if ($controller->isPostRequest()) {
	$controller->handle();
} else {
	$controller->index();
}
