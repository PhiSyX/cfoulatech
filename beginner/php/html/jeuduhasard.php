<?php

const NUM_MIN = 0;
const NUM_MAX = 10;

$title = "Jeu du Hasard";
$nav = "jeuduhasard";

$numeroGagnant = rand(NUM_MIN, NUM_MAX);

$numeroUtilisateur = isset($_GET["nombre"]) ? (int) $_GET["nombre"] : null;

require_once "./header.php";
?>
<main>
	<h1>Jeu du Hasard</h1>

	<?php if ($numeroUtilisateur !== null): ?>
		<div class="alert">
			<?php if ($numeroUtilisateur < NUM_MIN || $numeroUtilisateur > NUM_MAX): ?>
				<p class="error">
					Oops, votre numéro DOIT être compris
					ENTRE <strong><?= NUM_MIN; ?></strong> ET <strong><?= NUM_MAX; ?></strong>.
				</p>
			<?php elseif ($numeroUtilisateur > $numeroGagnant): ?>
				<p class="error">
					Oops,
					votre numéro est trop <strong>grand</strong>. <br>
					Le numéro gagnant était <strong><?= $numeroGagnant; ?></strong>
				</p>
			<?php elseif ($numeroUtilisateur < $numeroGagnant): ?>
				<p class="error">
					Oops,
					votre numéro est trop <strong>petit</strong>. <br>
					Le numéro gagnant était <strong><?= $numeroGagnant; ?></strong>
				</p>
			<?php else: ?>
				<p class="success">
					Bravo !!!!!<br>
					Le numéro gagnant est bien le numéro <strong><?= $numeroGagnant; ?></strong>
				</p>
			<?php endif; ?>
		</div>
	<?php endif; ?>

	<form action="jeuduhasard.php" method="GET">
		<div>
			<label for="nombre">Numéro</label>
			<input
				type="number"
				name="nombre"
				id="nombre"
				placeholder="Entre votre numéro entre <?= NUM_MIN; ?> et <?= NUM_MAX; ?>"
				min="<?= NUM_MIN; ?>"
				max="<?= NUM_MAX; ?>"
				value="<?= $numeroUtilisateur; ?>"
			>
		</div>

		<button type="submit">Deviner</button>
	</form>
</main>

<?php require_once "./footer.php"; ?>
