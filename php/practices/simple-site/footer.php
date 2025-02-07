</main>
</div>

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
		<time>
			© <?= date("Y"); ?> CFITECH, Inc.
		</time>
	</p>

	<nav class="navbar navbar--horizontal">
		<a href="session.php?op=read">
			Session
		</a>

		<a href="session.php?op=unset">
			Effacer Session
		</a>
	</nav>
</footer>


<!-- <section class="debug">
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
	</section> -->

</body>

</html>
