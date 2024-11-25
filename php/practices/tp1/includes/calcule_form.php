<?php
if (session_status() === PHP_SESSION_NONE) {
	session_start();
}

require_once "./functions/math.php";

if (isset($_POST["left_operand"], $_POST["right_operand"])) {
	if ($nav === "division" && (float) $_POST["right_operand"] === 0.0) {
		$error = "La division par zéro est interdite";
	} else {
		$result = calc(
			(float) $_POST["left_operand"],
			$nav,
			(float) $_POST["right_operand"]
		);
		$_SESSION[$nav] = $result;
	}
}

?>
<form action="<?= $nav; ?>.php" method="POST" class="max-wc">
	<input type="number" name="left_operand" placeholder="Operand Gauche">
	<input type="number" name="right_operand" placeholder="Operand Droit">
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
