<!DOCTYPE html>
<html lang="fr">

<head>
	<meta charset="UTF-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
	<title>Java Aide-mémoire</title>
	<link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />
	<link rel="stylesheet" href="https://necolas.github.io/normalize.css/8.0.1/normalize.css" />
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.11.1/styles/tokyo-night-dark.min.css" />
	<link rel="stylesheet" href="assets/css/style.css?t=<?= filemtime('./assets/css/style.css') ?>">
</head>

<body class="container">
	<?php include "assets/svg/logo.svg" ?>

	<h1>
		<small>Aide-mémoire</small>
	</h1>

	<?php include "includes/toc.php" ?>

	<hr>

	<main>
		<?php include "includes/mem/mem.php"; ?>

		<?php include "includes/types/types.php"; ?>

		<?php include "includes/ide/ide.php"; ?>
	</main>

	<script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.11.1/highlight.min.js"></script>
	<script type="module" src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.11.1/es/core.min.js"></script>
	<script type="module" src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.11.1/languages/java.min.js"></script>
	<script>
		hljs.highlightAll();
	</script>
</body>

</html>
