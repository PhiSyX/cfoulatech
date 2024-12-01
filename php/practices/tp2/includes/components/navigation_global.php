<aside class="navigation-global">
	<nav role="navigation" class="navbar navbar--vertical">
		<a href="index.php" class="<?php echo $nav === "home" ? "active" : ""; ?>">
			<?php include "./assets/svg/icon-home.svg" ?>
			<span>Home</span>
		</a>

		<?php if (is_connected()) : ?>
			<a href="calculatrice.php" class="<?php echo $nav === "calculatrice" ? "active" : ""; ?>">
				<?php include "./assets/svg/icon-calc.svg" ?>
				<span>Calculatrice</span>
			</a>
		<?php endif ?>
	</nav>

	<nav role="navigation" class="navbar navbar--vertical mt:a">
		<?php if (!is_connected()) : ?>
			<a href="login.php" class="<?php echo $nav === "login" ? "active" : ""; ?>">
				<?php include "./assets/svg/icon-login.svg" ?>
				<span>Connexion</span>
			</a>
		<?php else: ?>
			<form action="logout.php" method="POST">
				<button type="submit" name="send" class="avatar">
					<img src="<?php echo $_SESSION["user"]["avatar"]; ?>" alt="Photo de profil de <?php echo $_SESSION["user"]["login"]; ?>" width="24" height="24">
					<span>Déconnexion</span>
				</button>
			</form>
		<?php endif ?>
	</nav>
</aside>
