<header role="banner" class="l-header">
	<div class="container">

		<nav class="navbar" role="navigation">
			<div class="navbar-logo">
				<a href="./">FormationVie</a>
			</div>

			<ul role="list" class="navbar-list">
				<li class="navbar-item">
					<a href="./" class="navbar-link"
						<?= $pageHelper->getCurrentAttribute("home") ?>
					>
						Accueil
					</a>
				</li>

				<li class="navbar-item">
					<a href="contact.php" class="navbar-link"
						<?= $pageHelper->getCurrentAttribute("contact") ?>
					>
						Nous contacter
					</a>
				</li>

				<?php if (!$authHelper->isConnected()): ?>
					<li class="navbar-item">
						<a href="login.php" class="navbar-link"
							<?= $pageHelper->getCurrentAttribute("login") ?>
						>
							Se connecter
						</a>
					</li>
				<?php else: ?>
					<li class="navbar-item">
						<?php
						$authHelper->useLogoutComponent(
							$authHelper->currentUser()->getUsername(),
							[
								"button" => "Se déconnecter",
								"class" => "navbar-link"
							]
						);
						?>
					</li>
				<?php endif; ?>
			</ul>

			<ul class="navbar-list">
				<?php if ($authHelper->isConnected()): ?>
					<li class="navbar-item">
						<a href="#" class="navbar-link navbar-link-cta">
							<?= $authHelper->currentUser()->getUsername() ?>
						</a>
					</li>
				<?php endif ?>
			</ul>
		</nav>
	</div>
</header>
