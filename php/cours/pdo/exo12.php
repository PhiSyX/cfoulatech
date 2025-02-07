<?php

try {
	$pdo = new PDO('mysql:dbname=coursmysql;host=localhost', "root", "");
	$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
	die("Erreur de connexion : " . $e->getMessage());
}

if (isset($_POST["id_user"])) {
	try {
		$describes = $pdo
			->query("DESCRIBE users")
			->fetchAll(PDO::FETCH_OBJ);

		$user = $pdo->prepare("
			SELECT * FROM users
			WHERE id_user = :id_user
		");

		$user->execute([
			"id_user" => (int) $_POST["id_user"]
		]);

		$user = $user->fetch(PDO::FETCH_OBJ);
	} catch (PDOException $e) {
		die("Erreur de selection : " . $e->getMessage());
	}
}
?>
<form action="" method="post">
	<div class="form-group">
		<label for="id_user">ID utilisateur</label>
		<input type="number" name="id_user" id="id_user">
	</div>

	<button type="submit">Retrouver l'utilisateur</button>
</form>

<section>
	<?php if (isset($_POST["id_user"])) : ?>
		<?php if ($user): ?>
			<table>
				<thead>
					<tr>
						<?php foreach ($describes as $describe): ?>
							<th><?= $describe->Field ?></th>
						<?php endforeach ?>
					</tr>
				</thead>

				<tbody>
					<tr>
						<?php foreach ($user as $field => $val): ?>
							<td headers="<?= $field ?>"><?= $val ?></td>
						<?php endforeach ?>
					</tr>
				</tbody>
			</table>
		<?php else: ?>
			<div>Erreur, l'utilisateur demandé <?= (int)$_POST["id_user"] ?> n'existe pas.</div>
		<?php endif ?>
	<?php endif ?>
</section>
