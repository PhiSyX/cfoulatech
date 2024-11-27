<?php

/* TP1:

e. Une page Multiplication avec comme titre Multiplication qui aura un
   formulaire qui fera une multiplication entre 2 nombre introduis au clavier et
   qui affichera la réponse. Attention on ne pourra introduire que des numéros.
   Je veux que le résultat de la multiplication soit sauvegardé.

*/
/* TP2:

g. (Difficile) Je veux que quand vous n’êtes pas connecté, même si vous tapez
               dans votre navigateur le chemin vers une page de calcule, exemple
               /addition.php, il vous renvoi vers la page de login.

*/

require_once "./functions/auth.php";
require_once "./functions/redirect.php";

if (! is_connected()) {
	redirect_to("login.php");
}

$title = "Multiplication";
$nav = "multiplication";
?>
<?php require_once "./includes/header.php" ?>

<main>
	<section>
		<h1><?= $title; ?></h1>
		<?php require_once "./includes/calc_form.php"; ?>
	</section>
</main>

<?php require_once "./includes/footer.php" ?>
