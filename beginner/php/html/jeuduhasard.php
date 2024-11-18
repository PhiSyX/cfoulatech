<?php

$title = "Jeu du Hasard";
$nav = "jeuduhasard";

$numeroGagnant = rand(0, 10);

require_once "./header.php";
?>
<main>
	<h1>Jeu du Hasard</h1>

	<?php if (isset($_GET["nombre"])): ?>
		<?php if ((int) $_GET["nombre"] > $numeroGagnant): ?>
			<p class="error">
				Oops,
				votre numéro est trop grand,
				le numéro gagnant est <strong><?= $numeroGagnant; ?></strong>
			</p>
		<?php elseif ((int) $_GET["nombre"] < $numeroGagnant): ?>
			<p class="error">
				Oops,
				votre numéro est trop petit,
				le numéro gagnant est <strong><?= $numeroGagnant; ?></strong>
			</p>
		<?php else: ?>
			<p class="success">
				Bravo,
				le numéro entré est bien le numéro <strong><?= $numeroGagnant; ?></strong>
			</p>
		<?php endif; ?>
	<?php endif; ?>

	<form action="jeuduhasard.php" method="GET">
		<div>
			<label for="nombre">Numéro</label>
			<input
				type="number"
				name="nombre"
				id="nombre"
				placeholder="Entre votre numéro entre 0 et 10"
			>
		</div>

		<button type="submit">Deviner</button>
	</form>
</main>

<?php require_once "./footer.php"; ?>
