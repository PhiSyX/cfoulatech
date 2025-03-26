<?php

namespace Framework;

define("ROOT_URL", "/cfoulatech/php/practices/hexarch");

class Controller
{
	/**
	 * Rend une vue du répertoire `templates` située à la racine du projet.
	 *
	 * La vue a accès à la variable `$payload`.
	 */
	public function render(string $name, ?array $payload = [])
	{

		ob_start();
		require_once __DIR__ . "/../../templates/$name.html.php";
		$temp = ob_get_clean();

		ob_start();
		require_once __DIR__ . "/../../templates/_partials/debug.html.php";
		$debug = ob_get_clean();

		$temp = str_replace("</body>", "$debug</body>", $temp);
		return $temp;
	}

	public function redirect(string $url, ?int $code = 302)
	{
		$url = ROOT_URL . $url;
		header("Location: $url", true, $code);
		exit();
	}

	public function redirect_back()
	{
		$url = get_headers("Referer");

		if (!str_starts_with($url, ROOT_URL)) {
			header("Location: $url", true, 302);
		} else {
			$url = ROOT_URL . $url;
			header("Location: $url", true, 302);
		}

		exit();
	}
}
