<?php
session_start();

require_once "./functions/authentification.php";

$title = "Connexion";
$nav = "login";

$erreur = null;

if (! empty($_POST["pseudo"]) || ! empty($_POST["password"])) {
	if ($_POST["pseudo"] === "Mike" && $_POST["password"] === "12345") {
		$_SESSION["connected"] = true;
		$_SESSION["user"] = [
			"firstname" => "Mike",
			"lastname" => "S.",
			"avatar" => "./assets/img/edsheeran.jpg",
			"login" => $_POST["pseudo"],
			"password" => $_POST["password"],
		];
	} else {
		$erreur = "Identifiants incorrects !";
	}
}

if (is_connected()) {
	header("Location: dashboard.php");
	exit;
}

require_once "./header.php";
?>
<link rel="stylesheet" href="./assets/css/pages/login.css">

<section id="login-page" class="full:center">
	<div id="js-alert-message">
		<?php if (isset($erreur)): ?>
			<div class="alert alert--error">
				<p><?php echo $erreur ?></p>
			</div>
		<?php endif ?>
	</div>

	<form action="login.php" method="POST" id="js-login-form">
		<label for="pseudo">Nom d'utilisateur</label>
		<input type="text" name="pseudo" id="pseudo" placeholder="Mike">

		<label for="password">Mot de passe</label>
		<input type="password" name="password" id="password" placeholder="Secret123">

		<button type="submit">Se connecter</button>
	</form>

</section>

<?php require_once "./footer.php"; ?>
