<?php

namespace Framework;

use ReflectionClass;

class Kernel
{
	/**
	 * @var Router[]
	 */
	private array $routers = [];
	private array $providers = [];

	/**
	 * Définis les routes à partir d'un fichier de configuration située dans le
	 * répertoire de la configuration.
	 */
	public function define_router_from_cfg(string $route_file): self
	{
		$router = include __DIR__ . "/../../config/$route_file.php";
		return $this->with_router($router);
	}

	/**
	 * Ajoute un routeur dans les propriétés de l'instance.
	 */
	public function with_router(Router $router): self
	{
		array_push($this->routers, $router);
		return $this;
	}

	/**
	 * Démarre le processus d'affichage de la vue.
	 */
	public function run()
	{
		$req = new Request();

		$method = $req->method();
		$page_param = $req->search("page") ?: "/";

		foreach ($this->routers as $router) {
			$route = $router->get($method, $page_param);

			if ($route == null) {
				$err_ctrl = new ErrorController();
				echo $err_ctrl->render("errors/error404");
				break;
			}

			[$ctrl, $ctrl_method, $args] = $route;

			// FIXME: à améliorer, récursivement
			$refl = new ReflectionClass($ctrl);

			$params = array_map(
				function ($param) {
					// FIXME: à améliorer, ça peut bug ici
					$cls = $this->providers[$param->getType()->getName()];
					return new $cls;
				},
				$refl->getConstructor()?->getParameters() ?: []
			);

			$res = null;
			if (count($params) > 0) {
				$res = (new $ctrl(...$params))->$ctrl_method($req, ...$args);
			} else {
				$res = (new $ctrl())->$ctrl_method($req, ...$args);
			}

			echo $res;

			break;
		}
	}

	public function define_providers(array $providers): self
	{
		$this->providers = $providers;
		return $this;
	}

	private function fill_args() {}
}
