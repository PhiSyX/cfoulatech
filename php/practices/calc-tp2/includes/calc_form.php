<?php

if (session_status() === PHP_SESSION_NONE) {
	session_start();
}

require_once "./functions/math.php";

if (isset($_GET["left_operand"], $_GET["right_operand"])) {
	if (trim($_GET["left_operand"]) === "" || trim($_GET["right_operand"]) === "") {
		$error = "Vous devez entrer deux nombres valides.";
	} else if ($nav === "division" && (float) $_GET["right_operand"] === 0.0) {
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

		set_session_math($nav, $left_operand, $operator, $right_operand, $result);
	}
}

?>
<form action="<?php echo $nav; ?>.php" method="GET" id="js-calc-form" class="calc-form">
	<input type="text" name="left_operand" placeholder="Operand Gauche" value="<?php echo isset($left_operand) ? $left_operand : ""; ?>">

	<!-- TP2:

	m. (Facile) Pour chaque page d’opération mathématique je veux une petite
	            image représentant le signe de l’opération entre les 2
				formulaires des nombres à introduire. Et une image du signe
				égale entre le deuxième formulaire et le formulaire résultat.

	-->
	<?php include "./assets/svg/icon-$nav.svg" ?>

	<input type="text" name="right_operand" placeholder="Operand Droit" value="<?php echo isset($right_operand) ? $right_operand : ""; ?>">

	<?php if (isset($result)) : ?>
		<div class="hide-on-error">
			<?php include "./assets/svg/icon-equal-sign.svg" ?>

			<!-- TP2:

			k. (Facile) Affichez le résultat de vos calcules dans un formulaire.

			-->
			<output readonly type="number" placeholder="Résultat">
				<?php echo $result ?>
			</output>
		</div>
	<?php endif ?>

	<button type="submit">Calculer</button>
</form>

<div id="js-alert-message" class="alert-message">
	<?php if (isset($error)): ?>
		<div class="alert alert--error">
			<p>
				<?php echo $error; ?>
			</p>
		</div>
	<?php endif ?>

	<?php if (isset($result)): ?>
		<div class="alert alert--success">
			<p>
				Le résultat du calcul est <strong><?php echo $result; ?></strong>
			</p>
		</div>
	<?php endif ?>
</div>
