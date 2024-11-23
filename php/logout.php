<?php

session_start();

if (isset($_POST["send"])) {
	unset($_SESSION["connected"]);
	header("Location: login.php");
	die();
}

$title = "Déconnexion";
$nav = "logout";

require_once "./header.php";

// TODO: récupérer le pseudo dans la session.
$pseudo = "Mike";
?>
<main>
	<section>
		<p>Vous êtes connecté en tant que <?= $pseudo; ?></p>

		<form action="logout.php" method="POST">
			<button type="submit" name="send">Se déconnecter maintenant</button>
		</form>
	</section>
</main>
<?php
require_once "./footer.php";
?>
