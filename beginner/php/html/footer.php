	<section class="debug">
		<details open>
			<summary>DEBUG</summary>

			<?php if (isset($_SESSION) && ! empty($_SESSION)): ?>
				<h1>Les données de <small>$_SESSION</small></h1>
				<?= var_dump($_SESSION); ?>
			<?php endif; ?>

			<?php if (! empty($_GET)): ?>
				<h1>Les paramètres d'URL <small>$_GET</small></h1>
				<?= var_dump($_GET); ?>
			<?php endif; ?>

			<?php if (! empty($_POST)): ?>
				<h1>Les données du formulaire <small>$_POST</small></h1>
				<?= var_dump($_POST); ?>
			<?php endif; ?>
		</details>
	</section>

	<footer>
		<nav>
			<a href="index.php">Accueil</a>
			<a href="contact.php">Contact</a>
			<a href="about.php">À propos</a>
		</nav>

		<p class="text-center text-muted">
			© 2022 CFITECH, Inc
		</p>
	</footer>

</body>

</html>
