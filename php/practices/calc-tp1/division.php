<?php

/* TP1:

f. Une page Division avec comme titre Division qui aura un formulaire qui fera
   une division entre 2 nombre introduis au clavier et qui affichera la réponse.
   Attention on ne pourra introduire que des numéros. ATTENTION si vous
   introduisez 0 en tant que diviseur, il doit vous afficher un message comme
   quoi vous ne pouvez pas faire une division par 0. Je veux que le résultat de
   la division soit sauvegardé.

*/

$title = "Division";
$nav = "division";

$styles = ["assets/css/pages/calc.css"];
$scripts = ["assets/js/calc.js"];

include "./includes/layouts/header.php";
?>

<section id="calc-page">

	<?php include "./includes/calc_form.php"; ?>

</section>

<?php
require "./includes/calc_nav.php";
include "./includes/layouts/footer.php";
?>
