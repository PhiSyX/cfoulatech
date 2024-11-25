<?php

session_start();

if (isset($_POST["send"])) {
	unset($_SESSION["connected"], $_SESSION["user"]);
	header("Location: login.php");
	exit;
}

$title = "Déconnexion";
$nav = "logout";

require_once "./header.php";
?>
<main style="align-self: center;">
	<section>
		<p>
			Bonjour
			<strong><?= $_SESSION["user"]["firstname"]; ?> <?= $_SESSION["user"]["lastname"]; ?></strong>,
			vous êtes sur le point de vous déconnecter du compte
			<strong><?= $_SESSION["user"]["login"]; ?></strong>
		</p>

		<form action="logout.php" method="POST">
			<button type="submit" name="send">
				Se déconnecter maintenant
			</button>
		</form>
	</section>
</main>
<?php require_once "./footer.php"; ?>
