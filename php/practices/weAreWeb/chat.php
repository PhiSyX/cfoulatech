<?php
require './includes/header.php';

if (!is_connected()) {
	header('Location: login.php');
	die();
}

if (isset($_POST["message"])) {
	$message = new Message($pdo);
	try {
		$message->SaveMessage($_SESSION["user"]->id_user, $_POST['message']);
	} catch (PDOException $e) {
		die("Erreur d'insertion (SaveMessage): " . $e->getMessage());
	}
}
?>


<div class="chat__container">
	<h2 class="chat__header">Chat...</h2>
	<div id="list" class="chat__messages">

	</div>


	<form action="chat.php" method="POST" class="chat__form">
		<input type="text" name="message" class="form__input" required placeholder="Type here, ...">
		<button type="submit" class="button form__sendBtn" name="send">Envoyer</button>
	</form>
</div>

<script src="./js/chat.js"></script>

<?php
require './includes/footer.php';
?>
