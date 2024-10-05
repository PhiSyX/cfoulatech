<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Créer un article | Blog</title>
    <link rel="stylesheet" href="<?= ROOT_URL ?>/public/css/style.css">
</head>

<body>
    <a href="<?= ROOT_URL; ?>/admin/blog/article">Retour à la liste des articles</a>

    <form action="<?= ROOT_URL; ?>/admin/blog/article" method="POST">
        <fieldset>
            <legend>Créer un article</legend>

            <label for="title">Titre</label>
            <input type="text" name="title" id="title">

            <label for="content">Contenu</label>
            <textarea name="content" id="content"></textarea>

            <label for="publish_now">Publier maintenant</label>
            <input type="checkbox" name="publish_now" id="publish_now">

            <button type="submit">Envoyer</button>
        </fieldset>
    </form>
</body>

</html>