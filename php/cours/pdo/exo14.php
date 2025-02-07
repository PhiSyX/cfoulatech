<?php

try {
	$pdo = new PDO('mysql:dbname=coursmysql;host=localhost', "root", "");
	$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
	die("Erreur de connexion : " . $e->getMessage());
}

try {
	$users = $pdo->query("
		SELECT * FROM users u
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

<style>
*,
*::before,
*::after {
	box-sizing: border-box;
}

body {
	display: grid;
	place-content: center;
}

form * + * {
	margin-top: 8px;
}

form input {
	width: 100%;

	padding: 8px;
	border-radius: 4px;
	border: 1px solid rgb(195, 135, 140);
}

dialog {
	padding: 1rem;

	border-radius: 8px;
	border: 6px outset rgb(234, 101, 113);
	box-shadow: 7px 7px 11px #726f6f;
	background: rgb(255, 221, 224);
}
button[type="submit"] {
	padding: 8px;
	background: #e96e6e;
	border: none;
	border-radius: 3px;
	cursor: pointer;
}
button[type="button"] {
	padding: 8px;
	background: black;
	color: white;
	border: none;
	border-radius: 3px;
}
</style>

<form action="" method="get">
	<div class="form-group">
		<label for="id_user">ID utilisateur</label>
		<input
			type="text"
			name="id_user"
			id="id_user"
			list="users"
			<?php if (isset($_GET["id_user"])): ?>
				value="<?= (int) $_GET["id_user"] ?>"
			<?php endif ?>
		>

		<datalist id="users">
			<?php foreach ($users as $xuser): ?>
				<option value="<?= $xuser->id_user ?>">
					<?= $xuser->firstname ?> <?= $xuser->lastname ?> (<?= $xuser->id_article ? 'NOOOO' : 'YEEES' ?>)
				</option>
			<?php endforeach ?>
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

			<?php if(!isset($success)): ?>

			<dialog id="delete-dialog" popover>

				<form action="?id_user=<?= (int) $_GET["id_user"] ?>" method="post">
					<input
						type="hidden"
						name="id_user"
						value="<?= (int) $_GET["id_user"] ?>"
					>

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

			<?php if(isset($success)): ?>
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
