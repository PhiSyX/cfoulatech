<?php

require_once "./functions/auth.php";
require_once "./functions/redirect.php";

if (!is_connected()) {
	redirect_to("login.php");
}

$title = "Calculatrice";
$nav = "calculatrice";

$styles = ["assets/css/pages/calc.css"];
$scripts = ["assets/js/calc.js"];

include "./includes/layouts/header.php";
?>

<section id="calc-page">

	<button type="button" id="js-calc-run" class="calc-run">
		Lancer la calculatrice
	</button>

	<div id="js-app"></div>

</section>

<?php
require "./includes/calc_nav.php";
include "./includes/layouts/footer.php";
?>
