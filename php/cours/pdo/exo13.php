<?php

try {
	$pdo = new PDO('mysql:dbname=coursmysql;host=localhost', "root", "");
	$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
	die("Erreur de connexion : " . $e->getMessage());
}

try {
	$users = $pdo->query("
		SELECT * FROM users
	")
		->fetchAll(PDO::FETCH_OBJ);
} catch (PDOException $e) {
	die("Erreur de sélection " . $e->getMessage());
}

if (isset($_POST["update_user"])) {
	try {
		$req = $pdo->prepare("
			UPDATE users SET
				firstname = :firstname,
				lastname = :lastname,
				gender = :gender,
				date_of_birth = :date_of_birth,
				city = :city,
				weight_kg = :weight_kg
			WHERE id_user = :id_user
		");

		$success = $req->execute([
			"id_user" => (int) $_GET["id_user"],

			"firstname" => $_POST["firstname"],
			"lastname" => $_POST["lastname"],
			"gender" => $_POST["gender"],
			"date_of_birth" => $_POST["date_of_birth"],
			"city" => $_POST["city"],
			"weight_kg" => $_POST["weight_kg"],
		]);
	} catch (PDOException $e) {
		$success = false;
	}
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

function capitalize(string $text): string {
	$w = "";
	foreach (explode("_", $text) as $key => $value) {
		$w .= " ";
		$w .= ucfirst($value);
	}
	return $w;
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
	border: 1px solid #87c3b7;
}

dialog {
	padding: 1rem;

	border-radius: 8px;
	border: 6px outset #bdeae1;
	box-shadow: 7px 7px 11px #726f6f;
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
					<?= $xuser->firstname ?> <?= $xuser->lastname ?>
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

			<dialog id="update-dialog" popover>
				<h1>
					Modifier les informations de l'utilisateur:
					<?= $user->firstname ?>
					<?= $user->lastname ?>
				</h1>

				<?php if(isset($success)): ?>
					<?php if ($success): ?>
						<p style="color: green">
							L'utilisateur
							<?= (int) $_GET["id_user"] ?>
							a bien été modifié
						</p>
					<?php else: ?>
						<p style="color: red">
							Impossible de modifier l'utilisateur
							<?= (int) $_GET["id_user"] ?>
						</p>
					<?php endif ?>
				<?php endif ?>

				<form action="?id_user=<?= (int) $_GET["id_user"] ?>" method="post">
					<input
						type="hidden"
						name="id_user"
						value="<?= (int) $_GET["id_user"] ?>"
					>

					<?php foreach ($user as $field => $val): ?>
						<div class="form-group">
							<label for="<?= $field ?>">
								<?= capitalize($field) ?>
							</label>

							<input
								id="<?= $field ?>"
								type="text"
								name="<?= $field ?>"
								value="<?= $val ?>"
							>
						</div>
					<?php endforeach ?>

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
