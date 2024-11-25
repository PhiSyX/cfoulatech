<?php
session_start();

$title = "Connexion";
$nav = "login";

require_once "./header.php";

$erreur = null;

if ( ! empty($_POST["pseudo"]) || ! empty($_POST["password"])) {
	if ($_POST["pseudo"] === "Mike" && $_POST["password"] === "12345") {
		$_SESSION["connected"] = true;
		$_SESSION["user"] = [
			'firstname' => 'Mike',
			'lastname' => 'S.',
			'login' => $_POST["pseudo"],
			'password' => $_POST["password"],
		];
	} else {
		$erreur = "Identifiants incorrects !";
	}
}

if (is_connected()) {
	header("Location: dashboard.php");
	exit;
}
?>
<main>
	<section>
		<h1><?= $title; ?></h1>

		<?php if ($erreur): ?>
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

<?php require_once "./footer.php"; ?>
