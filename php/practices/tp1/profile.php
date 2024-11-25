<?php

/*

h. Une page Mon profile qui aura comme titre Mon Profile, qui si vous êtes
   connecté il vous dira bienvenu votre prénom dans votre page de profile. Si
   vous n'êtes pas connecté il vous renverra vers la page de login.

*/

require_once "./functions/auth.php";
require_once "./functions/header.php";

if ( ! is_connected()) {
	redirect_to("login.php");
}

$title = "Mon profile";
$nav = "profile";

?>
<?php require_once "./includes/header.php" ?>

<main>
	<section>
		<h1><?= $title; ?></h1>

		<h2>Bienvenue <small><?= $_SESSION["user"]["login"]; ?></small></h2>
	</section>
</main>

<?php require_once "./includes/footer.php" ?>
