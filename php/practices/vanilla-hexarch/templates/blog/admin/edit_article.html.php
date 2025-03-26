<?php

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
	<h1>Éditer l'article « <?= h($payload['article']->title); ?> »</h1>

	<a href="<?= ROOT_URL; ?>/admin/blog/article">Retour à la liste des articles</a>

	<form action="<?= ROOT_URL; ?>/admin/blog/article/<?= $payload['article']->id; ?>" method="post">
		<input type="hidden" name="_method" value="PUT">

		<fieldset>
			<legend>Édition de l'article</legend>


			<label for="title">Titre</label>
			<input type="text" name="title" id="title" value="<?= h($payload['article']->title); ?>">

			<label for="content">Contenu</label>
			<textarea name="content" id="content"><?= h($payload['article']->content); ?></textarea>

			<label for="publish_now">Publier maintenant</label>
			<input type="checkbox" name="publish_now" id="publish_now" <?= $payload['article']->published_at ? 'checked' : ''; ?>>

			<button type="submit">Envoyer</button>
		</fieldset>
	</form>
</body>

</html>
