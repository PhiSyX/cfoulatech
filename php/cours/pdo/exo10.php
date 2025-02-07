<?php

try {
	$pdo = new PDO('mysql:dbname=coursmysql;host=localhost', "root", "");
	$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
	die("Erreur de connexion : " . $e->getMessage());
}

try {
	$describes = $pdo
		->query("DESCRIBE users")
		->fetchAll(PDO::FETCH_OBJ);

	$users = $pdo
		->query("SELECT * FROM users")
		->fetchAll(PDO::FETCH_OBJ);
?>
	<?php if (count($users) > 0): ?>
		<section>
			<h1>Tous les utilisateurs</h1>

			<table>
				<thead>
					<tr>
						<?php foreach ($describes as $describe): ?>
							<th><?= $describe->Field ?></th>
						<?php endforeach ?>
					</tr>
				</thead>

				<tbody>
					<?php foreach ($users as $user): ?>
						<tr>
							<?php foreach ($user as $field => $val): ?>
								<td headers="<?= $field ?>"><?= $val ?></td>
							<?php endforeach ?>
						</tr>
					<?php endforeach ?>
				</tbody>
			</table>
		</section>
	<?php endif ?>

<?php
} catch (PDOException $e) {
	die("Erreur de sélection : " . $e->getMessage());
}
