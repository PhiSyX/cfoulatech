<footer class="navigation-per-page">
	<div class="navbar--left-icon">
		<label for="toggle-navigation-global"></label>
	</div>

	<?php if (isset($navigations) && is_array($navigations)): ?>
		<nav class="navbar navbar--horizontal">
			<?php foreach ($navigations as $link): ?>
				<a
					href="<?php echo $link["href"]; ?>"
					title="<?php echo isset($link["title"]) ? $link["title"] : "Naviguer vers " . $link["href"] ?>"
					class="<?php echo $nav === $link["id"] ? 'active' : '' ?>">
					<?php
					if (isset($link["svg"])):
						include $link["svg"];
					endif;

					if (isset($link["text"])):
						echo '<span>' . $link["text"] . '</span>';
					endif;
					?>
				</a>
			<?php endforeach; ?>
		</nav>
	<?php endif; ?>

	<p class="date">
		Nous sommes le <time datetime="<?= date(DATE_W3C) ?>">
			<?= date("l, d F Y") ?>, il est <?= date("H\hi") ?>.
		</time>
	</p>

	<nav class="navbar navbar--horizontal">
		<a href="session-debug.php">
			Session Actuelle
		</a>

		<a href="session-reset.php">
			Effacer Session
		</a>
	</nav>
</footer>
