<?php

if (session_status() === PHP_SESSION_NONE) {
	session_start();
}

require_once "./functions/math.php";

if (isset($_POST["left_operand"], $_POST["right_operand"])) {
	if (trim($_POST["left_operand"]) === "" || trim($_POST["right_operand"]) === "") {
		$error = "Vous devez entrer deux nombres valides.";
	} else if ($nav === "division" && (float) $_POST["right_operand"] === 0.0) {
		$error = "La division par zéro est interdite";
	} else {
		// x
		$left_operand = (float) $_POST["left_operand"];
		// opérateurs arithmétiques
		$operator = operator_sign($nav);
		// y
		$right_operand = (float) $_POST["right_operand"];
		// =
		$result = calc($left_operand, $operator, $right_operand);

		set_session_math($nav, $left_operand, $operator, $right_operand, $result);
	}
}

?>
<form action="<?= $nav; ?>.php" method="POST" class="calc-form max-wc inline">
	<input type="number" name="left_operand" placeholder="Operand Gauche">

	<!-- TP2:

	m. (Facile) Pour chaque page d’opération mathématique je veux une petite
	            image représentant le signe de l’opération entre les 2
				formulaires des nombres à introduire. Et une image du signe
				égale entre le deuxième formulaire et le formulaire résultat.

	-->
	<input disabled type="image" src="<?= "./assets/img/$nav.png"; ?>" alt="<?= $nav; ?>">
	<input type="number" name="right_operand" placeholder="Operand Droit">
	<input disabled type="image" src="<?= "./assets/img/equal-sign.png"; ?>" alt="<?= $nav; ?>">

	<!-- TP2:

	k. (Facile) Affichez le résultat de vos calcules dans un formulaire.

	-->
	<input readonly disabled type="number" value="<?= isset($result) ? $result : ""; ?>" placeholder="Résultat">
	<button type="submit">Calculer</button>
</form>

<?php if (isset($error)): ?>
	<div class="alert">
		<p class="error">
			<?= $error; ?>
		</p>
	</div>
<?php endif ?>

<?php if (isset($result)): ?>
	<div class="alert">
		<p class="success">
			Le résultat du calcul est <strong><?= $result; ?></strong>
		</p>
	</div>
<?php endif ?>
