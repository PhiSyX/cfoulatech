<?php

session_start();

const NUM_MIN = 0;
const NUM_MAX = 10;

$title = "Jeu du Hasard";
$nav = "jeuduhasard";

if (!isset($_SESSION["numeroGagnant"])) {
	$_SESSION["numeroGagnant"] = rand(NUM_MIN, NUM_MAX);
}

$numeroGagnant = $_SESSION["numeroGagnant"];
$numeroUtilisateur = isset($_POST["nombre"]) ? (int) $_POST["nombre"] : null;

if ($numeroGagnant === $numeroUtilisateur) {
	unset($_SESSION["numeroGagnant"]);
}

require_once "./header.php";
?>
<link rel="stylesheet" href="./assets/css/pages/jeuduhasard.css">

<div class="center:i">
	<section id="jeuduhasard">
		<h1>Jeu du Hasard</h1>

		<?php if ($numeroUtilisateur !== null): ?>
			<?php if ($numeroUtilisateur < NUM_MIN || $numeroUtilisateur > NUM_MAX): ?>
				<div class="alert alert--error">
					Oops, votre numéro DOIT être compris
					ENTRE <strong><?= NUM_MIN ?></strong> ET <strong><?= NUM_MAX ?></strong>.
				</div>
			<?php elseif ($numeroUtilisateur > $numeroGagnant): ?>
				<div class="alert alert--error">
					Oops,
					votre numéro est trop <strong>grand</strong>.
				</div>
			<?php elseif ($numeroUtilisateur < $numeroGagnant): ?>
				<div class="alert alert--error">
					Oops,
					votre numéro est trop <strong>petit</strong>.
				</div>
			<?php else: ?>
				<div class="alert alert--success">
					Bravo !!!!!<br>
					Le numéro gagnant est bien le numéro <strong><?= $numeroGagnant ?></strong>
				</div>
			<?php endif; ?>
		<?php endif; ?>

		<form action="jeuduhasard.php" method="POST">
			<div>
				<label for="nombre">Numéro</label>
				<input
					type="number"
					name="nombre"
					id="nombre"
					placeholder="Entre votre numéro entre <?= NUM_MIN ?> et <?= NUM_MAX ?>"
					min="<?= NUM_MIN ?>"
					max="<?= NUM_MAX ?>"
					value="<?= $numeroUtilisateur ?>">
			</div>

			<button type="submit">Deviner</button>
		</form>
	</section>
</div>

<?php require_once "./footer.php"; ?>
