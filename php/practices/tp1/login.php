<?php

/*

i. Une page Login avec comme titre Login, qui permettra de vous loguez avec
   comme login : votre prénom et votre mot de passe caché : cfitech. Si vous
   êtes déjà connecté et que vous cliqué sur login il vous redirigera vers votre
   page de profile.

*/

session_start();

require_once "./functions/auth.php";
require_once "./functions/header.php";

$title = "Se connecter";
$nav = "login";

$expected_login = "Mike";
$expected_pass = "cfitech";

if ( ! empty($_POST["pseudo"]) || ! empty($_POST["password"])) {
	if ($_POST["pseudo"] === $expected_login && $_POST["password"] === $expected_pass) {
		$_SESSION["user"] = [
			'firstname' => 'Mike',
			'lastname' => 'S.',
			'login' => $expected_login,
			'password' => $expected_pass,
		];
	} else {
		$erreur = "Identifiants incorrects !";
	}
}

if (is_connected()) {
	redirect_to("profile.php");
}

?>
<?php require_once "./includes/header.php" ?>

<main>
	<section>
		<h1><?= $title; ?></h1>

		<?php if (isset($erreur)): ?>
			<div class="alert">
				<p class="error"><?= $erreur; ?></p>
			</div>
		<?php endif; ?>

		<form action="login.php" method="POST">
			<div>
				<label for="pseudo">Nom d'utilisateur</label>
				<input type="text" name="pseudo" id="pseudo" placeholder="Mike">
			</div>

			<div>
				<label for="password">Mot de passe</label>
				<input type="password" name="password" id="password" placeholder="Secret123">
			</div>

			<button type="submit">Se connecter</button>
		</form>
	</section>
</main>

<?php require_once "./includes/footer.php" ?>
