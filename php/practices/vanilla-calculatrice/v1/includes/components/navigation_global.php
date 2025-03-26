<?php require_once "./functions/auth.php"; ?>

<aside class="navigation-global">
	<nav role="navigation" class="navbar navbar--vertical">
		<a href="index.php" class="<?= $nav === "home" ? "active" : "" ?>">
			<?php include "./assets/svg/icon-home.svg"; ?>
			<span>Home</span>
		</a>
	</nav>

	<nav role="navigation" class="navbar navbar--vertical mt:a">
		<?php if (is_connected()): ?>
			<a href="profile.php" class="<?= $nav === "profile" ? "active" : "" ?>">
				<?php include "./assets/svg/icon-login.svg"; ?>
				<span>Profil</span>
			</a>

			<form action="logout.php" method="POST">
				<button type="submit" name="send" class="avatar">
					<?php include "./assets/svg/icon-logout.svg"; ?>
					<span>Déconnexion</span>
				</button>
			</form>
		<?php else: ?>
			<a href="login.php" class="<?= $nav === "login" ? "active" : "" ?>">
				<?php include "./assets/svg/icon-login.svg"; ?>
				<span>Connexion</span>
			</a>
		<?php endif; ?>
	</nav>
</aside>
