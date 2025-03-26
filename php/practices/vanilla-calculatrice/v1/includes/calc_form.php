<?php

if (session_status() === PHP_SESSION_NONE) {
	session_start();
}

require_once "./functions/math.php";

if (isset($_GET["left_operand"], $_GET["right_operand"])) {
	if (
		trim($_GET["left_operand"]) === "" ||
		trim($_GET["right_operand"]) === ""
	) {
		$error = "Vous devez entrer deux nombres valides.";
	} elseif ($nav === "division" && (float) $_GET["right_operand"] === 0.0) {
		$error = "La division par zéro est interdite";
	} else {
		// x
		$left_operand = (float) $_GET["left_operand"];
		// Symbole de l'opérateur arithmétique, en fonction de $nav
		$operator = operator_sign($nav);
		// y
		$right_operand = (float) $_GET["right_operand"];
		// =
		$result = calc($left_operand, $operator, $right_operand);

		set_session_math(
			$nav,
			$left_operand,
			$operator,
			$right_operand,
			$result
		);
	}
}
?>
<form action="<?= $nav ?>.php" method="GET" id="js-calc-form" class="calc-form">
	<input type="number" name="left_operand" placeholder="Operand Gauche"
		value="<?= isset($left_operand) ? $left_operand : "" ?>">

	<?php include "./assets/svg/icon-$nav.svg"; ?>

	<input type="number" name="right_operand" placeholder="Operand Droit"
		value="<?= isset($right_operand) ? $right_operand : "" ?>">

	<button type="submit">Calculer</button>
</form>

<div id="js-alert-message" class="alert-message">
	<?php if (isset($error)): ?>
		<div class="alert alert--error">
			<p>
				<?= $error ?>
			</p>
		</div>
	<?php endif; ?>

	<?php if (isset($result)): ?>
		<div class="alert alert--success">
			<p>
				Le résultat du calcul est <strong><?= $result ?></strong>
			</p>
		</div>
	<?php endif; ?>
</div>
