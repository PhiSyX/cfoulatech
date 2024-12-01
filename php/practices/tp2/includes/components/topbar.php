<?php require_once "./functions/auth.php"; ?>

<header class="l-topbar topbar">
	<div class="logo">
		<?php if (is_connected()): ?>
			<div class="avatar avatar--anim">
				<a href="profile.php" title="Accéder au profil de <?php echo $_SESSION["user"]["login"]; ?>">
					<img
						src="<?php echo $_SESSION["user"]["avatar"] ?>"
						alt="Photo de profil de <?php echo $_SESSION["user"]["login"]; ?>"
						width="48" height="48">
				</a>
			</div>
		<?php else: ?>
			<img src="./assets/img/logo.png" alt="Logo du site" width="48" height="48">
		<?php endif ?>
	</div>

	<p class="title">
		<?php echo isset($title) ? $title : "TP" ?>
	</p>
</header>
