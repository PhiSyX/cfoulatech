<?php

try {
	$pdo = new PDO('mysql:dbname=coursmysql;host=localhost', "root", "");
	$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
	die("Erreur de connexion : " . $e->getMessage());
}

try {
	$cities = $pdo
	->query("SELECT DISTINCT city FROM users")
	->fetchAll(PDO::FETCH_OBJ);
} catch (PDOException $e) {
	die("Erreur de selection : " . $e->getMessage());
}

if (
	isset(
		$_POST["firstname"],
		$_POST["lastname"],
		$_POST["gender"],
		$_POST["date_of_birth"],
		$_POST["weight_kg"],
		$_POST["city"],
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
		$req->execute([
			"firstname" => $_POST["firstname"],
			"lastname" => $_POST["lastname"],
			"gender" => $_POST["gender"],
			"date_of_birth" => $_POST["date_of_birth"],
			"weight_kg" => $_POST["weight_kg"],
			"city" => $_POST["city"],
		]);

		echo "Une nouvelle ligne a été ajouté dans la table `coursmysql`.`users`. ";
		echo "il s'agit de l'utilisateur ";
		echo htmlspecialchars($_POST["firstname"]);
		echo " ";
		echo htmlspecialchars($_POST["lastname"]);
		echo ", à l'ID: " . $pdo->lastInsertId();

	} catch (PDOException $e) {
		die("Erreur d'insertion : " . $e->getMessage());
	}
}

?>
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
			<?php endforeach ?>
		</datalist>
	</div>

	<button type="submit">Enregistrer l'utilisateur</button>
</form>
