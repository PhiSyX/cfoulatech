<?php

require_once "./functions/authentification.php";

if (!is_connected()) {
	header("Location: login.php");
	exit;
}

$navigations = [
	[
		"id" => "db_articles",
		"href" => "database_articles.php",
		"title" => "Tous les articles",
		"text" => "Articles"
	],
	[
		"id" => "db_users",
		"href" => "database_users.php",
		"title" => "Tous les utilisateurs",
		"text" => "Utilisateurs"
	]
];

$nav = "db_articles";
$title = "Tous les articles de la base de données";

try {
	$pdo = new PDO('mysql:dbname=coursmysql;host=localhost', "root", "");
	$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
	die('Erreur : ' . $e->getMessage());
}

$articles_req = $pdo->query("
	SELECT
		a.*,
		UPPER(CONCAT(u.firstname, ' ', u.lastname)) AS author
	FROM articles a
	INNER JOIN users u
	ON a.id_user_article = u.id_user
	ORDER BY a.id_article DESC
");
$articles = $articles_req->fetchAll(PDO::FETCH_OBJ);

$authors_req = $pdo->query("SELECT id_user,lastname,firstname FROM users");
$authors = $authors_req->fetchAll(PDO::FETCH_OBJ);

if (isset($_POST["author"], $_POST["description"], $_POST["title"])) {
	$req = $pdo->prepare("
	INSERT INTO articles (
 		article_name,
 		description,
 		id_user_article
	) VALUES (
 		:article_name,
 		:description,
 		:id_user_article
	)
	");
	$req->execute([
		"article_name" => $_POST["title"],
		"description" => $_POST["description"],
		"id_user_article" => $_POST["author"],
	]);
}

require_once "./header.php";
?>

<link rel="stylesheet" href="assets/css/pages/database.css">

<section id="database-page" class="center:i">

	<form action="" method="post">
		<div class="form-group">
			<label for="title">Titre de l'article</label>
			<input type="text" name="title" id="title">
		</div>

		<div class="form-group">
			<label for="author">Nom de l'auteur</label>
			<select name="author">
				<?php foreach ($authors as $author): ?>
					<option value="<?= $author->id_user ?>">
						<?= $author->firstname ?> <?= $author->lastname ?>
					</option>
				<?php endforeach ?>
			</select>
		</div>

		<div class="form-group">
			<label for="description">Description</label>
			<textarea name="description" id="description"></textarea>
		</div>

		<button type="submit">Envoyer</button>
	</form>

	<?php if (count($articles) > 0): ?>
		<section>
			<h1>Tous les articles</h1>

			<table>
				<thead>
					<tr>
						<th>#</th>
						<th>Nom d'article</th>
						<th>Nom de l'auteur</th>
					</tr>
				</thead>

				<tbody>
					<?php foreach ($articles as $article): ?>
						<tr>
							<th><?= $article->id_article ?></th>
							<td><?= htmlspecialchars($article->article_name) ?></td>
							<td><?= $article->author ?></td>
						</tr>
					<?php endforeach ?>
				</tbody>
			</table>
		</section>
	<?php endif ?>

</section>

<?php require_once "./footer.php"; ?>
