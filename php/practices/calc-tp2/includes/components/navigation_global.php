<aside class="navigation-global">
	<nav role="navigation" class="navbar navbar--vertical">
		<a href="index.php" class="<?= $nav === "home" ? "active" : "" ?>">
			<?php include "./assets/svg/icon-home.svg"; ?>
			<span>Home</span>
		</a>

		<?php if (is_connected()): ?>
			<a href="calculatrice.php"
				class="<?= $nav === "calculatrice" ? "active" : "" ?>">
				<?php include "./assets/svg/icon-calc.svg"; ?>
				<span>Calculatrice</span>
			</a>
		<?php endif; ?>
	</nav>

	<nav role="navigation" class="navbar navbar--vertical mt:a">
		<?php if (!is_connected()): ?>
			<a href="login.php" class="<?= $nav === "login" ? "active" : "" ?>">
				<?php include "./assets/svg/icon-login.svg"; ?>
				<span>Connexion</span>
			</a>
		<?php else: ?>
			<a href="profile.php" class="<?= $nav === "profile" ? "active" : "" ?>">
				<?php include "./assets/svg/icon-login.svg"; ?>
				<span>Mon profil</span>
			</a>

			<form action="logout.php" method="POST">
				<button type="submit" name="send" class="avatar">
					<img
						src="<?= $_SESSION["user"]["avatar"] ?>"
						alt="Photo de profil de <?= $_SESSION["user"]["login"] ?>"
						width="24" height="24">
					<span>Déconnexion</span>
				</button>
			</form>
		<?php endif; ?>
	</nav>
</aside>
