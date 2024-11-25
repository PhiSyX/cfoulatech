<?php

/*

f. Une page Division avec comme titre Division qui aura un formulaire qui fera
   une division entre 2 nombre introduis au clavier et qui affichera la réponse.
   Attention on ne pourra introduire que des numéros. ATTENTION si vous
   introduisez 0 en tant que diviseur, il doit vous afficher un message comme
   quoi vous ne pouvez pas faire une division par 0. Je veux que le résultat de
   la division soit sauvegardé.

*/

$title = "Division";
$nav = "division";
?>
<?php require_once "./includes/header.php" ?>

<main>
	<section>
		<h1><?= $title; ?></h1>
		<?php require_once "./includes/calcule_form.php"; ?>
	</section>
</main>

<?php require_once "./includes/footer.php" ?>
