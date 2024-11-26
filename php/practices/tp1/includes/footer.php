<footer class="l-footer">
	<header>
		Nous somme le <time datetime="<?= date(DATE_W3C); ?>">
			<?= date("l, d F Y"); ?>,
			il est <?= date("H\hi"); ?>.
		</time>
	</header>

	<nav>
		<a href="index.php">
			Accueil
		</a>

		<a href="session-debug.php">
			Session actuelle
		</a>

		<a href="session-reset.php">
			Effacer la session
		</a>
	</nav>
</footer>
</body>

</html>
