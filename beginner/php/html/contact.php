<?php require_once "./header.php"; ?>

<main>
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
</main>

<?php require_once "./footer.php"; ?>
