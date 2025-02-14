<?php

require_once "./pdo.php";
require_once "./utils.php";

$users = fetchAll("SELECT * FROM users");
$cities = fetchAll("SELECT DISTINCT city FROM users");

if (isset($_GET["id_user"])) {
	// See https://php.net/manual/en/function.filter-input.php
	$idUser = filter_input(INPUT_GET, "id_user", FILTER_VALIDATE_INT);
}

if (isset($_POST["update_user"], $idUser)) {
	// See https://php.net/manual/en/function.filter-input.php
	$weight_kg = filter_input(INPUT_POST, "weight_kg", FILTER_VALIDATE_INT);

	if (!isset(
		$_POST["firstname"],
		$_POST["lastname"],
		$_POST["gender"],
		$_POST["date_of_birth"],
		$_POST["city"],
		$_POST["weight_kg"],
	)) {
		$success = false;
	} else {
		$success = executeQuery("
			UPDATE users SET
				firstname     = :firstname,
				lastname      = :lastname,
				gender        = :gender,
				date_of_birth = :date_of_birth,
				city          = :city,
				weight_kg     = :weight_kg
			WHERE id_user = :id_user
		", [
			"id_user"       => $idUser,
			"firstname"		=> $_POST["firstname"],
			"lastname"      => $_POST["lastname"],
			"gender"        => $_POST["gender"],
			"date_of_birth" => $_POST["date_of_birth"],
			"city"          => $_POST["city"],
			"weight_kg"     => $weight_kg,
		]);
	}
}

if (isset($_GET["id_user"])) {
	$describes = describe("users");
	$user = fetchOne("
		SELECT
			firstname,
			lastname,
			gender,
			date_of_birth,
			city,
			weight_kg
		FROM users
		WHERE id_user = :id_user
	", [
		"id_user" => [$idUser, PDO::PARAM_INT]
	]);
}
?>
<!DOCTYPE html>
<html lang="fr">

<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Modifier un utilisateur</title>
	<link rel="stylesheet" href="style.css">
</head>

<body>

	<h1>Modifier un utilisateur</h1>

	<form action="" method="get">
		<div class="form-group">
			<?= input("id_user", "ID Utilisateur", [
				"type" => "number",
				"list" => "users",
				// See https://php.net/manual/en/function.array-reduce.php
				// It's difficult to understand and to use, but it's ok
				"datalist" => array_reduce(
					$users,
					function ($acc, $user) {
						$acc[$user->id_user] = sprintf(
							"%s %s",
							$user->firstname,
							$user->lastname,
						);
						return $acc;
					},
					[]
				),
				"value" => $idUser ?? "",
			]) ?>
		</div>

		<button type="submit">Retrouver l'utilisateur</button>
	</form>

	<section>
		<?php if (isset($_GET["id_user"])) : ?>
			<?php if (!$user): ?>

				<p alert="alert alert-error">
					Erreur, l'utilisateur à l'ID demandé
					"<?= htmlspecialchars($_GET["id_user"]) ?>"
					n'existe pas.
				</p>

			<?php else: ?>

				<dialog id="update-dialog" popover>
					<h1>
						Modifier les informations de l'utilisateur:
						<?= $user->firstname ?>
						<?= $user->lastname ?>
					</h1>

					<?php if (isset($success)): ?>
						<?php if ($success): ?>
							<p style="color: green">
								L'utilisateur
								<?= $idUser ?>
								a bien été modifié
							</p>
						<?php else: ?>
							<p style="color: red">
								Impossible de modifier l'utilisateur
								<?= $idUser ?>
							</p>
						<?php endif ?>
					<?php endif ?>

					<form action="?id_user=<?= $idUser ?>" method="post">
						<?= input("id_user", attrs: [
							"type" => "hidden",
							"value" => $idUser ?? "",
						]) ?>

						<div class="form-group">
							<?= input("firstname", "Prénom", [
								"type" => "text",
								"value" => $user->firstname,
								"placeholder" => $user->firstname,
							]) ?>
						</div>

						<div class="form-group">
							<?= input("lastname", "Nom", [
								"type" => "text",
								"value" => $user->lastname,
								"placeholder" => $user->lastname,
							]) ?>
						</div>

						<div class="form-group">
							<?= select("gender", "Genre", [
								"M" => "Homme",
								"F" => "Femme",
								"X" => "X",
							], [
								"value" => $user->gender,
							]) ?>
						</div>

						<div class="form-group">
							<?= input("date_of_birth", "Date de naissance", [
								"type" => "date",
								"value" => $user->date_of_birth,
							]) ?>
						</div>

						<div class="form-group">
							<?= input("city", "Ville", [
								"type" => "text",
								// See https://php.net/manual/en/function.array-reduce.php
								// It's difficult to understand and to use, but it's ok
								"datalist" => array_reduce(
									$cities,
									function ($acc, $item) {
										$acc[$item->city] = $item->city;
										return $acc;
									},
									[]
								),
								"list" => "cities",
								"value" => $user->city,
								"placeholder" => $user->city,
							]) ?>
						</div>

						<div class="form-group">
							<?= input("weight_kg", "Poids", [
								"type" => "number",
								"value" => $user->weight_kg,
								"placeholder" => $user->weight_kg,
							]) ?>
						</div>

						<button type="submit" name="update_user">
							Modifier les infos
						</button>

						<button type="button" popovertarget="update-dialog" popovertargetaction="hide">
							Fermer la &lt;dialog&gt;
						</button>
					</form>
				</dialog>

				<script>
					let dialog = document.querySelector("#update-dialog");
					dialog.showPopover();
				</script>

			<?php endif ?>
		<?php endif ?>
	</section>

</body>

</html>
