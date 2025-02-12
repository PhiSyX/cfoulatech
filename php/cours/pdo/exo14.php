<?php

require_once "./pdo.php";

try {
	// Récupère tous les utilisateurs n'ayant pas crées d'articles.
	$users = $pdo->query("
		SELECT
			a.id_article,
			u.id_user,
			u.firstname,
			u.lastname
		FROM users u
		LEFT JOIN articles a
		ON u.id_user = a.id_user_article
	")
		->fetchAll(PDO::FETCH_OBJ);
} catch (PDOException $e) {
	die("Erreur de sélection " . $e->getMessage());
}

if (isset($_GET["id_user"])) {
	try {
		$describes = $pdo
			->query("DESCRIBE users")
			->fetchAll(PDO::FETCH_OBJ);

		$user = $pdo->prepare("
			SELECT
				firstname,
				lastname,
				gender,
				date_of_birth,
				city,
				weight_kg
			FROM users
			WHERE id_user = :id_user
		");

		$user->execute([
			"id_user" => (int) $_GET["id_user"]
		]);

		$user = $user->fetch(PDO::FETCH_OBJ);
	} catch (PDOException $e) {
		die("Erreur de selection : " . $e->getMessage());
	}
}

if (isset($_POST["delete_user"])) {
	try {
		$req = $pdo->prepare("
			DELETE FROM users
			WHERE id_user = :id_user
		");

		$success = $req->execute([
			"id_user" => (int) $_GET["id_user"],
		]);
	} catch (PDOException $e) {
		$success = false;
	}
}
?>

<!DOCTYPE html>
<html lang="fr">

<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Supprime un utilisateur</title>
	<link rel="stylesheet" href="style.css">
</head>

<body>
	<h1>Supprimer un utilisateur</h1>

	<form action="" method="get">
		<div class="form-group">
			<label for="id_user">ID utilisateur</label>
			<input
				type="number"
				name="id_user"
				id="id_user"
				list="users"
				<?php if (isset($_GET["id_user"])): ?>
				value="<?= filter_input(INPUT_GET, 'id_user', FILTER_VALIDATE_INT) ?>"
				<?php endif; ?>
			>

			<datalist id="users">
				<?php foreach ($users as $xuser): ?>
					<?php if ($xuser->id_article === NULL): ?>
					<option value="<?= $xuser->id_user ?>">
						<?= $xuser->firstname ?> <?= $xuser->lastname ?>)
					</option>
					<?php endif; ?>
				<?php endforeach; ?>
			</datalist>
		</div>

		<button type="submit">Retrouver l'utilisateur</button>
	</form>

	<section>
		<?php if (isset($_GET["id_user"])) : ?>
			<?php if (!$user): ?>

				<p style="color:red">
					Erreur, l'utilisateur à l'ID demandé
					"<?= htmlspecialchars($_GET["id_user"]) ?>"
					n'existe pas.
				</p>

			<?php else: ?>

				<?php if (!isset($success)): ?>

					<dialog id="delete-dialog" popover>

						<form action="?id_user=<?= (int) $_GET["id_user"] ?>" method="post">
							<input
								type="hidden"
								name="id_user"
								value="<?= filter_input(INPUT_GET, 'id_user', FILTER_VALIDATE_INT) ?>">

							<p>
								Voulez-vous vraiment supprimer

								<strong>
									<?= $user->firstname ?>
									<?= $user->lastname ?>
								</strong>

								?
							</p>

							<button type="submit" name="delete_user">
								Oui
							</button>

							<button type="button" popovertarget="delete-dialog" popovertargetaction="hide">
								Annuler
							</button>
						</form>
					</dialog>

					<script>
						let dialog = document.querySelector("#delete-dialog");
						dialog.showPopover();
					</script>
				<?php endif ?>

				<?php if (isset($success)): ?>
					<?php if ($success): ?>
						<p style="color: green">
							L'utilisateur
							<?= (int) $_GET["id_user"] ?>
							a bien été supprimé
						</p>
					<?php else: ?>
						<p style="color: red">
							Impossible de supprimer l'utilisateur
							<?= (int) $_GET["id_user"] ?>
						</p>
					<?php endif ?>
				<?php endif ?>

			<?php endif ?>
		<?php endif ?>
	</section>

</body>

</html>
