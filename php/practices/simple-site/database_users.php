<?php

require_once "./functions/authentification.php";

if (!is_connected()) {
	header("Location: login.php");
	exit();
}

$navigations = [
	[
		"id" => "db_articles",
		"href" => "database_articles.php",
		"title" => "Tous les articles",
		"text" => "Articles",
	],
	[
		"id" => "db_users",
		"href" => "database_users.php",
		"title" => "Tous les utilisateurs",
		"text" => "Utilisateurs",
	],
];

$nav = "db_users";
$title = "Tous les utilisateurs de la base de données";

try {
	$pdo = new PDO("mysql:dbname=coursmysql;host=localhost", "root", "");
	$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
	die("Erreur : " . $e->getMessage());
}

try {
	$describes = $pdo->query("DESCRIBE users")->fetchAll(PDO::FETCH_OBJ);

	$users = $pdo
		->query("SELECT * FROM users ORDER BY id_user DESC")
		->fetchAll(PDO::FETCH_OBJ);

	$cities = $pdo
		->query("SELECT DISTINCT city FROM users")
		->fetchAll(PDO::FETCH_OBJ);
} catch (PDOException $e) {
	die("Erreur de sélection : " . $e->getMessage());
}

if (
	isset($_GET["create_user"]) &&
	isset(
		$_POST["firstname"],
		$_POST["lastname"],
		$_POST["gender"],
		$_POST["date_of_birth"],
		$_POST["weight_kg"],
		$_POST["city"]
	) &&
	!empty($_POST["firstname"]) &&
	!empty($_POST["lastname"]) &&
	!empty($_POST["gender"]) &&
	!empty($_POST["date_of_birth"]) &&
	!empty($_POST["weight_kg"]) &&
	!empty($_POST["city"])
) {
	try {
		$req = $pdo->prepare("
			INSERT INTO users (
				firstname,
				lastname,
				gender,
				date_of_birth,
				weight_kg,
				city
			) VALUES (
				:firstname,
				:lastname,
				:gender,
				:date_of_birth,
				:weight_kg,
				:city
			)
		");

		$insertSuccess = $req->execute([
			"firstname" => $_POST["firstname"],
			"lastname" => $_POST["lastname"],
			"gender" => $_POST["gender"],
			"date_of_birth" => $_POST["date_of_birth"],
			"weight_kg" => $_POST["weight_kg"],
			"city" => $_POST["city"],
		]);

		header("Location: database_users.php");
		exit();
	} catch (PDOException $e) {
		$insertSuccess = false;
	}
} elseif (
	isset($_GET["read_user"]) &&
	isset($_POST["search"]) &&
	!empty(trim($_POST["search"]))
) {
	try {
		$users_req = $pdo->prepare("
			SELECT * FROM users
			WHERE
				id_user = :search  OR
				firstname = :search OR
				lastname = :search OR
				gender = :search OR
				city = :search OR
				date_of_birth = :search OR
				weight_kg = :search
		");
		$users_req->execute(["search" => $_POST["search"]]);
		$users = $users_req->fetchAll(PDO::FETCH_OBJ);
	} catch (PDOException $e) {
		die("Erreur de sélection : " . $e->getMessage());
	}
} elseif (
	isset($_GET["update_user"]) &&
	isset(
		$_POST["id_user"],
		$_POST["firstname"],
		$_POST["lastname"],
		$_POST["gender"],
		$_POST["date_of_birth"],
		$_POST["city"],
		$_POST["weight_kg"]
	)
) {
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

		$updateSuccess = $req->execute([
			"id_user" => (int) $_POST["id_user"],

			"firstname" => $_POST["firstname"],
			"lastname" => $_POST["lastname"],
			"gender" => $_POST["gender"],
			"date_of_birth" => $_POST["date_of_birth"],
			"city" => $_POST["city"],
			"weight_kg" => (int) $_POST["weight_kg"],
		]);

		header("Location: database_users.php");
		exit();
	} catch (PDOException $e) {
		$updateSuccess = false;
	}
} elseif (isset($_GET["delete_user"])) {
	try {
		$req = $pdo->prepare("
			DELETE FROM users
			WHERE id_user = :id_user
		");

		$deleteSuccess = $req->execute([
			"id_user" => (int) $_POST["id_user"],
		]);

		header("Location: database_users.php");
		exit();
	} catch (PDOException $e) {
		$deleteSuccess = false;
	}
}

function capitalize(string $text): string
{
	$w = "";
	foreach (explode("_", $text) as $key => $value) {
		$w .= " ";
		$w .= ucfirst($value);
	}
	return $w;
}

require_once "./header.php";
?>

<link rel="stylesheet" href="assets/css/pages/database.css">

<section id="database-page" class="center:i">

	<section>
		<h1>Tous les utilisateurs</h1>

		<div class="d-flex gap=1">
			<form action="?read_user" method="post" class="mr:a">
				<input type="search" name="search" placeholder="Rechercher">
			</form>

			<button type="button" popovertarget="add-user-dialog">
				Ajouter
			</button>
		</div>

		<?php if (count($users) > 0): ?>
			<br>

			<table>
				<thead>
					<tr>
						<?php foreach ($describes as $describe): ?>
							<th><?= $describe->Field ?></th>
						<?php endforeach; ?>

						<th>Actions</th>
					</tr>
				</thead>

				<tbody>
					<?php foreach ($users as $user): ?>
						<tr>
							<?php foreach ($user as $field => $val): ?>
								<td headers="<?= $field ?>"><?= $val ?></td>
							<?php endforeach; ?>

							<td>
								<form action="?delete_user" method="post">
									<input type="hidden" name="id_user" value="<?= $user->id_user ?>">
									<button
										type="button"
										popovertarget="delete-user-<?= $user->id_user ?>-dialog"
									>
										Supprimer
									</button>
								</form>

								<br>

								<form action="?update_user" method="post">
									<input type="hidden" name="id_user" value="<?= $user->id_user ?>">

									<button
										type="button"
										popovertarget="update-user-<?= $user->id_user ?>-dialog"
									>
										Éditer
									</button>
								</form>
							</td>
						</tr>
					<?php endforeach; ?>
				</tbody>
			</table>

			<?php foreach ($users as $user): ?>
				<dialog id="delete-user-<?= $user->id_user ?>-dialog" popover>
					<form action="?delete_user" method="post">
						<input
							type="hidden"
							name="id_user"
							value="<?= $user->id_user ?>"
						>

						<p>
							Voulez-vous vraiment supprimer

							<strong>
								<?= $user->firstname ?>
								<?= $user->lastname ?>
							</strong>

							?
						</p>

						<button type="submit">
							Oui
						</button>

						<button type="button" popovertarget="delete-user-<?= $user->id_user ?>-dialog" popovertargetaction="hide">
							Annuler
						</button>
					</form>
				</dialog>

				<dialog id="update-user-<?= $user->id_user ?>-dialog" popover>

					<h1>
						Modifier les informations de l'utilisateur:
						<?= $user->firstname ?>
						<?= $user->lastname ?>
					</h1>

					<form action="?update_user" method="post">
						<input
							type="hidden"
							name="id_user"
							value="<?= $user->id_user ?>"
						>

						<?php foreach ($user as $field => $val):
      	if ($field === "id_user") {
      		continue;
      	} ?>
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
						<?php
      endforeach; ?>

						<button type="submit">
							Modifier les infos
						</button>

						<button type="button" popovertarget="update-user-<?= $user->id_user ?>-dialog" popovertargetaction="hide">
							Fermer la &lt;dialog&gt;
						</button>
					</form>


				</dialog>
			<?php endforeach; ?>

		<?php endif; ?>
	</section>

	<dialog id="add-user-dialog" popover>
		<h1>Ajouter un utilisateur</h1>

		<form action="?create_user" method="post">
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
				<label for="weight_kg">Poids</label>

				<span>50</span>
				<input type="range" name="weight_kg" id="weight_kg" min="50" max="180">
				<span>180</span>
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
	</dialog>
</section>

<?php require_once "./footer.php"; ?>
