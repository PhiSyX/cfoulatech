<?php
$title = "Contact";
$nav = "contact";
require_once "./header.php";
?>

<link rel="stylesheet" href="./assets/css/pages/contact.css">

<section id="contact-page" class="center:i">
	<h1>Formulaire de contact</h1>

	<form action="contact.php" method="POST">
		<div>
			<label for="nom">Nom</label>
			<input type="text" name="nom" id="nom">
		</div>

		<div>
			<label for="object">Object</label>
			<input type="text" name="object" id="object">
		</div>

		<div>
			<label for="message">Message</label>
			<textarea name="message" id="message"></textarea>
		</div>

		<button type="submit">Envoyer</button>
	</form>
</section>

<?php require_once "./footer.php"; ?>
