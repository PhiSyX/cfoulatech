<?php

/*

d. Une page Addition avec comme titre Addition qui aura un formulaire qui fera
   une addition entre 2 nombre introduis au clavier et qui affichera la réponse.
   Attention on ne pourra introduire que des numéros. Je veux que le résultat de
   l'addition soit sauvegardé.

*/

$title = "Addition";
$nav = "addition";

?>
<?php require_once "./includes/header.php" ?>

<main>
	<section>
		<h1><?= $title; ?></h1>
		<?php require_once "./includes/calcule_form.php"; ?>
	</section>
</main>

<?php require_once "./includes/footer.php" ?>
