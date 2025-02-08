<?php

/* TP1:

i. Une page Login avec comme titre Login, qui permettra de vous loguez avec
   comme login : votre prénom et votre mot de passe caché : cfitech. Si vous
   êtes déjà connecté et que vous cliqué sur login il vous redirigera vers votre
   page de profile.

*/

session_start();

require_once "./functions/auth.php";
require_once "./functions/redirect.php";

$title = "Connexion";
$nav = "login";
$styles = ["./assets/css/pages/login.css"];
$scripts = ["./assets/js/login.js"];

$expected_login = "Mike";
$expected_pass = "cfitech";

if (!empty($_POST["pseudo"]) || !empty($_POST["password"])) {
	if (
		$_POST["pseudo"] === $expected_login &&
		$_POST["password"] === $expected_pass
	) {
		$_SESSION["user"] = [
			"firstname" => "Mike",
			"lastname" => "S.",
			/* TP2

			j. (Facile) Rajoutez une petite image de profile, visible dans Mon
			            profile.

			*/
			"avatar" => "./assets/img/edsheeran.jpg",
			"login" => $expected_login,
			"password" => $expected_pass,
		];
	} else {
		$erreur = "Identifiants incorrects !";
	}
}

if (is_connected()) {
	redirect_to("profile.php");
}

include "./includes/layouts/header.php";
?>

<section id="login-page" class="full:center">
	<div id="js-alert-message">
		<?php if (isset($erreur)): ?>
			<div class="alert alert--error">
				<p><?= $erreur ?></p>
			</div>
		<?php endif; ?>
	</div>

	<form action="login.php" method="POST" id="js-login-form">
		<label for="pseudo">Nom d'utilisateur</label>
		<input type="text" name="pseudo" id="pseudo" placeholder="Mike">

		<label for="password">Mot de passe</label>
		<input type="password" name="password" id="password" placeholder="Secret123">

		<button type="submit">Se connecter</button>
	</form>

</section>

<?php include "./includes/layouts/footer.php"; ?>
