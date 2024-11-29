<?php

require_once "./functions/authentification.php";

if (!is_connected()) {
	header("Location: login.php");
	exit;
}

$nav = "database";
$title = "Base de données";

require_once "./includes/db.php";

$articles_req = $pdo->query("SELECT * FROM articles");
$articles = $articles_req->fetchAll(PDO::FETCH_OBJ);

$users_req = $pdo->query("SELECT *, TIMESTAMPDIFF(YEAR, date_of_birth, CURRENT_DATE) AS age FROM users");
$users = $users_req->fetchAll(PDO::FETCH_OBJ);

require_once "./header.php";
?>
<main>

	<?php if (count($articles) > 0): ?>
		<section>
			<h1>Tous les articles</h1>

			<table>
				<thead>
					<tr>
						<th>#</th>
						<th>Nom d'article</th>
						<th>Description</th>
						<th>Date de création</th>
						<th>Date de mise à jour</th>
					</tr>
				</thead>

				<tbody>
					<?php foreach ($articles as $user): ?>
						<tr>
							<td><?= $user->id_article ?></td>
							<td><?= $user->article_name ?></td>
							<td><?= $user->description ?></td>
							<td><?= $user->created_at ?></td>
							<td><?= $user->updated_at ?></td>
						</tr>
					<?php endforeach ?>
				</tbody>
			</table>
		</section>
	<?php endif ?>

	<?php if (count($users) > 0): ?>
		<section>
			<h1>Tous les utilisateurs</h1>

			<table>
				<thead>
					<tr>
						<th>#</th>
						<th>Nom</th>
						<th>Prénom</th>
						<th>Gender</th>
						<th>Date de naissance (age)</th>
						<th>poids</th>
						<th>Ville</th>
					</tr>
				</thead>

				<tbody>
					<?php foreach ($users as $user): ?>
						<tr>
							<td><?= $user->id_user ?></td>
							<td><?= $user->lastname ?></td>
							<td><?= $user->firstname ?></td>
							<td><?= $user->gender ?></td>
							<td><?= $user->date_of_birth ?> (<?= $user->age ?> ans)</td>
							<td><?= $user->weight_kg ?>kg</td>
							<td><?= $user->city ?></td>
						</tr>
					<?php endforeach ?>
				</tbody>
			</table>

		</section>
	<?php endif ?>

</main>
