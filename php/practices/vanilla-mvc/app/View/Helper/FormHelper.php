<?php

namespace App\View\Helper;

class FormHelper
{
	public function __construct()
	{
		if (session_status() == PHP_SESSION_NONE) {
			session_start();
		}
	}

	/**
	 * Récupère une valeur d'un champ d'<input/> en se basant sur le nom (attribut name).
	 */
	public function inputData(string $name, string $default = ""): string
	{
		if (isset($_SESSION[$_SERVER["REQUEST_URI"]][$name])) {
			$data = $_SESSION[$_SERVER["REQUEST_URI"]][$name];
			unset($_SESSION[$_SERVER["REQUEST_URI"]][$name]);
			return $data;
		}

		return $default;
	}

	public function inputValueAttribute(string $name, string $default = ""): string
	{
		return 'value="' . $this->inputData($name, $default) . '"';
	}

	/**
	 * Récupère une erreur en session si existe.
	 */
	public function error(string $name): void
	{
		if (isset($_SESSION["errors"][$name])):
			$msg = $_SESSION["errors"][$name];
			unset($_SESSION["errors"][$name]);
			?>
			<p class="error-message">
				<?= $msg ?>
			</p>
		<?php
		endif;
	}
}
