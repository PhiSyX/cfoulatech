<?php

/*

g. Une page Soustraction avec comme titre Soustraction qui aura un formulaire
   qui fera une soustraction entre 2 nombre introduis au clavier et qui
   affichera la réponse. Attention on ne pourra introduire que des numéros. Je
   veux que le résultat de la soustraction soit sauvegardé.

 */

$title = "Soustraction";
$nav = "soustraction";
?>
<?php require_once "./includes/header.php" ?>

<main>
	<section>
		<h1><?= $title; ?></h1>
		<?php require_once "./includes/calcule_form.php"; ?>
	</section>
</main>

<?php require_once "./includes/footer.php" ?>
