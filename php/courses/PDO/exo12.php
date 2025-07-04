<?php

require_once "./pdo.php";
require_once "./utils.php";

$users = fetch_all("
	SELECT
		id_user,
		firstname,
		lastname
	FROM users
");

if (isset($_GET["id_user"])) {
	// See https://php.net/manual/en/function.filter-input.php
	$idUser = filter_input(INPUT_GET, "id_user", FILTER_VALIDATE_INT);

	$describesUsers = describe("users");

	$user = fetch_one(
		"SELECT * FROM users WHERE id_user = :id_user",
		[
			"id_user" => $idUser
		]
	);
}
?>

<!DOCTYPE html>
<html lang="fr">

<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Trouver un utilisateur</title>
	<link rel="stylesheet" href="style.css">
</head>

<body>

<h1>Trouver un utilisateur</h1>

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

	<button type="submit">Trouver l'utilisateur</button>
</form>

<section>
	<?php if (isset($_GET["id_user"])) : ?>
		<?php if ($user): ?>
			<h2>Utilisateur trouvé :</h2>
			<table>
				<thead>
				<tr>
					<?php foreach ($describesUsers as $describe): ?>
						<th><?= capitalize($describe->Field) ?></th>
					<?php endforeach ?>
				</tr>
				</thead>

				<tbody>
				<tr>
					<?php foreach ($user as $field => $value): ?>
						<td><?= $value ?></td>
					<?php endforeach ?>
				</tr>
				</tbody>
			</table>
		<?php else: ?>
			<p class="alert alert-error">
				Erreur, l'utilisateur demandé <?= $idUser ?> n'existe pas.
			</p>
		<?php endif ?>
	<?php endif ?>
</section>

</body>

</html>
