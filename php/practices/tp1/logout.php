<?php

/*

j. Une page Logout pour vous déconnecter.

*/

require_once "./functions/auth.php";
require_once "./functions/header.php";

if (! is_connected()) {
	redirect_to("login.php");
}

session_start();

if (isset($_POST["send"])) {
	unset($_SESSION["user"]);
	redirect_to("login.php");
}

$title = "Se déconnecter";
$nav = "logout";

?>
<?php require_once "./includes/header.php" ?>

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

<?php require_once "./includes/footer.php" ?>
