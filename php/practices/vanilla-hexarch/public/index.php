<?php

require_once __DIR__ . "/../vendor/autoload.php";

use Domain\Blog\Repository\ArticleRepository;
use Framework\Kernel;
use Infrastructure\Blog\Repository\MySQLArticleRepository;

$kernel = (new Kernel())
	->define_router_from_cfg("routes")
	->define_providers([
		ArticleRepository::class => MySQLArticleRepository::class
	]);
$kernel->run();
