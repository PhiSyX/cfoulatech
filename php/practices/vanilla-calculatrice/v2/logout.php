<?php

/* TP1:

j. Une page Logout pour vous déconnecter.

*/

session_start();

require_once "./functions/auth.php";
require_once "./functions/redirect.php";

if (!is_connected()) {
	redirect_to("login.php");
}

require_once "./functions/math.php";

if (isset($_POST["send"])) {
	unset_user_session();
	/* TP2:

	 c. Quand vous vous déconnectez il faut supprimer uniquement les opérations
	    faites

	 */
	unset_all_session_math();
	redirect_to("login.php");
}

$title = "Déconnexion";
$nav = "logout";

include "./includes/layouts/header.php";
?>

<section class="full:center">
	<p>
		Bonjour
		<strong>
			<?= $_SESSION["user"]["firstname"] ?>
			<?= $_SESSION["user"]["lastname"] ?>
		</strong>,
		vous êtes sur le point de vous déconnecter du compte
		<strong><?= $_SESSION["user"]["login"] ?></strong>
	</p>

	<form action="logout.php" method="POST">
		<button type="submit" name="send">
			Se déconnecter maintenant
		</button>
	</form>
</section>

<?php include "./includes/layouts/footer.php"; ?>
