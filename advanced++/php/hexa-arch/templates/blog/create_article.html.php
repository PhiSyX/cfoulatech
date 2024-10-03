<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Créer un article | Blog</title>
    <link rel="stylesheet" href="/cfoulatech/public/css/style.css">
</head>

<body>
    <h1>Créer un article</h1>

    <form action="" method="POST">
        <div>
            <label for="title">Titre</label>
            <input type="text" name="title" id="title">
        </div>
        
        <div>
            <label for="content">Contenu</label>
            <textarea name="content" id="content"></textarea>
        </div>
        
        <div>
            <label for="publish_now">Publier maintenant</label>
            <input type="checkbox" name="publish_now" id="publish_now">
        </div>

        <button type="submit">Envoyer</button>
    </form>
</body>

</html>