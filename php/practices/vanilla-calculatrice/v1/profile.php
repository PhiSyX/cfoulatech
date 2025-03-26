<?php

/* TP1:

h. Une page Mon profile qui aura comme titre Mon Profile, qui si vous êtes
   connecté il vous dira bienvenu votre prénom dans votre page de profile. Si
   vous n'êtes pas connecté il vous renverra vers la page de login.

*/

require_once "./functions/auth.php";
require_once "./functions/redirect.php";

if (!is_connected()) {
	redirect_to("login.php");
}

$title = "Mon profil";
$nav = "profile";
$styles = ["./assets/css/pages/profile.css"];
?>
<?php include "./includes/layouts/header.php"; ?>

<section id="profile-page" class="center:x">

	<header class="welcome avatar avatar--anim">
		<h2>
			Bienvenue
			<small>
				<?= $_SESSION["user"]["login"] ?>
			</small>
		</h2>
	</header>
</section>

<?php include "./includes/layouts/footer.php"; ?>
