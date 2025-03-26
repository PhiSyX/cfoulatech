<?php
require './includes/header.php';

if (is_connected()) {
	header('Location: profil.php');
	die();
}

$user = new User($pdo);

if (isset($_POST['login'])) {
	$email = $_POST['email'];
	$password = $_POST['password'];

	if ($user->Connexion(
		$email,
		$password,
	)) {
		header("Location: profil.php");
		exit;
	}
}

if (isset($_POST['inscription'])) {
	$prenom = $_POST['prenom'];
	$nom = $_POST['nom'];
	$emailInscription = $_POST['emailInscription'];
	$passwordInscription = $_POST['passwordInscription'];

	$user->Incription(
		$prenom,
		$nom,
		$emailInscription,
		password_hash($passwordInscription, PASSWORD_DEFAULT),
	);
}
?>


<div class="container">

	<!-- formulaire de login -->
	<form action="login.php" method="POST" class="loginForm connection">
		<h1>Login</h1>
		<input type="email" name="email" class="connectionForm" placeholder="Email"><br><br>

		<input type="password" name="password" class="connectionForm" placeholder="Mot de passe" required><br><br>

		<button class="myButton login" type="submit" name="login">Se connecter</button>
	</form>

	<!-- formulaire d'inscription -->
	<form action="login.php" method="POST" class="loginForm inscription">
		<h1>Inscription</h1>
		<input type="text" name="prenom" class="connectionForm" placeholder="Prenom" required><br><br>

		<input type="text" name="nom" class="connectionForm" placeholder="Nom" required><br><br>

		<input type="email" name="emailInscription" class="connectionForm" placeholder="Email" required><br><br>

		<input type="password" name="passwordInscription" class="connectionForm" placeholder="Mot de passe" required><br><br>

		<button class="myButton inscription" type="submit" name="inscription">S'enregistrer</button>
	</form><br>

	<div class="formInscription">
		<p>Vous n'avez pas de compte ?</p>
		<button type="button" class="btnFormInscri">Inscrivez-vous</button>
	</div>



</div>



<?php
require './includes/footer.php';
?>
