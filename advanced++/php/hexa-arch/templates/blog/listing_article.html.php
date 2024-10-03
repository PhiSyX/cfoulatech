<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Liste des articles | Blog</title>
    <link rel="stylesheet" href="/cfoulatech/public/css/style.css">
</head>

<body>
    <h1>Liste des articles</h1>

    <ol>
        <?php foreach ($payload["articles"] as $article): ?>
        <li><a href="/cfoulatech/blog/<?= $article->id ?>-<?= $article->slug(); ?>"><?= $article->title; ?></a></li>
        <?php endforeach ?>
    </ol>
</body>

</html>