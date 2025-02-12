<?php

require_once "./pdo.php";
require_once "./utils.php";

// Récupère toutes les villes de la table `users`.
$cities = fetchAll("SELECT DISTINCT city FROM users");

if (isset(
	$_POST["firstname"],
	$_POST["lastname"],
	$_POST["gender"],
	$_POST["date_of_birth"],
	$_POST["weight_kg"],
	$_POST["city"],
)) {
	if (
		!empty($_POST["firstname"])      &&
		!empty($_POST["lastname"])      &&
		!empty($_POST["gender"])        &&
		!empty($_POST["date_of_birth"]) &&
		!empty($_POST["weight_kg"])     &&
		!empty($_POST["city"])
	) {
		$success = insertQuery("users", [
			"firstname" => $_POST["firstname"],
			"lastname" => $_POST["lastname"],
			"gender" => $_POST["gender"],
			"date_of_birth" => $_POST["date_of_birth"],
			"weight_kg" => $_POST["weight_kg"],
			"city" => $_POST["city"],
		]);
	} else {
		$emptyForm = true;
	}
}

?><!DOCTYPE html>
<html lang="fr">

<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Ajouter un utilisateur</title>
	<link rel="stylesheet" href="style.css">
</head>

<body>

	<h1>Ajouter un utilisateur</h1>

	<?php if (isset($success)): ?>
		<?php if ($success): ?>
			<p class="alert alert-success">
				Une nouvelle ligne a été ajouté dans la table `coursmysql`.`users`.
				il s'agit de l'utilisateur&nbsp;
				<?= htmlspecialchars($_POST["firstname"]) ?>&nbsp;
				<?= htmlspecialchars($_POST["lastname"]) ?>, à l'ID:
				<?= $pdo->lastInsertId() ?>.
			</p>
		<?php else : ?>
			<p class="alert alert-error">
				Impossible d'ajouter l'utilisateur&nbsp;
				<?= htmlspecialchars($_POST["firstname"]) ?>&nbsp;
				<?= htmlspecialchars($_POST["lastname"]) ?>.
			</p>
		<?php endif; ?>
	<?php endif; ?>

	<?php if (isset($emptyForm)): ?>
		<?php if ($emptyForm): ?>
			<p class="alert alert-error">
				Le formulaire ne peut pas avoir de données vides.
			</p>
		<?php endif; ?>
	<?php endif; ?>

	<form action="" method="post">
		<div class="form-group">
			<label for="firstname">Prénom</label>
			<input type="text" name="firstname" id="firstname">
		</div>

		<div class="form-group">
			<label for="lastname">Nom</label>
			<input type="text" name="lastname" id="lastname">
		</div>

		<div class="form-group">
			<label for="gender">Genre</label>
			<select name="gender" id="gender">
				<option value="F">Femme</option>
				<option value="M">Homme</option>
				<option value="X">X</option>
			</select>
		</div>

		<div class="form-group">
			<label for="date_of_birth">Date de naissance</label>
			<input type="date" name="date_of_birth" id="date_of_birth">
		</div>

		<div class="form-group">
			<label for="weight_kg">Poids (Min: 40, Courant: <output id="weight_kg_out">0</output>, Max: 180)</label>
			<input type="range" name="weight_kg" id="weight_kg" min="40" max="180">
		</div>

		<div class="form-group">
			<label for="city">Ville</label>
			<input type="text" name="city" id="city" list="cities">
			<datalist id="cities">
				<?php foreach ($cities as $user): ?>
					<option value="<?= $user->city ?>"><?= $user->city ?></option>
				<?php endforeach; ?>
			</datalist>
		</div>

		<button type="submit">Enregistrer l'utilisateur</button>
	</form>

	<script>
		weight_kg_out.value = weight_kg.value;

		weight_kg.addEventListener("input", function(evt) {
			weight_kg_out.value = evt.target.value;
		})
	</script>

</body>

</html>
