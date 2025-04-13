<?php

require_once "vendor/autoload.php";

use App\Auth\Model\Repository\UserRepository;
use App\Auth\Service\AuthService;
use App\Controller\HomeController;

$controller = new HomeController(new AuthService(new UserRepository()));
$controller->index();
