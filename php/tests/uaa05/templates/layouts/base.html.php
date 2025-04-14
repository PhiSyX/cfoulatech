<!DOCTYPE html>
<html lang="fr">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width,initial-scale=1">
	<title>Mon super site</title>
	<link rel="stylesheet" href="public/css/main.css">
	<script src="public/js/script.js" type="module"></script>
</head>
<body>

<?php include "templates/layouts/partials/_navbar.html.php"; ?>

<main role="main" class="container">
	<?php include "templates/layouts/partials/_alert-messages.html.php"; ?>

	<?php
	/*
	 * La variable $file est injectée automatiquement dans la vue, elle provient
	 * du paramètre de la méthode render du controller BaseController.
	 */
	include "templates/$file";
	?>
</main>

<?php include "templates/layouts/partials/_footer.html.php"; ?>

</body>
</html>
