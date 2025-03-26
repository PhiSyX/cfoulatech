<?php

$article = $payload["article"];

function h(string $text)
{
	return htmlspecialchars($text);
}

?>
<!DOCTYPE html>
<html lang="en">

<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Afficher l'article | Blog</title>
	<link rel="stylesheet" href="<?= ROOT_URL ?>/public/css/style.css">
</head>

<body>
	<h1>Afficher l'article « <?= h($payload['article']->title); ?> »</h1>

	<a href="<?= ROOT_URL; ?>/admin/blog/article">Retour à la liste des articles</a>

	<hr>

	<table>
		<thead>
			<tr>
				<th>#ID</th>
				<th>Titre</th>
				<th>Slug</th>
				<th>Date de création</th>
				<th>Date de modification</th>
				<th>Date de publication</th>
				<th>Actions</th>
			</tr>
		</thead>

		<tbody>
			<tr>
				<td>#<?= $article->id; ?></td>
				<td><?= h($article->title); ?></td>
				<td><?= h($article->slug()); ?></td>
				<td><?= $article->created_at->format("Y/m/h H:i:s"); ?></td>
				<td><?= $article->updated_at->format("Y/m/h H:i:s"); ?></td>
				<td><?= $article->published_at?->format("Y/m/h H:i:s"); ?></td>
				<td>
					<a href="<?= ROOT_URL; ?>/admin/blog/article/edit/<?= $article->id; ?>">Éditer</a>,

					<form
						id="del<?= $article->id; ?>"
						action="<?= ROOT_URL; ?>/admin/blog/article/<?= $article->id; ?>"
						method="post">
						<input type="hidden" name="_method" value="DELETE">
					</form>

					<button form="del<?= $article->id; ?>" type="submit">
						Supprimer
					</button>
				</td>
			</tr>
		</tbody>
	</table>

	<hr>

	<h2>Contenu de l'article</h2>
	<pre><?= h($article->content); ?></pre>
</body>

</html>
