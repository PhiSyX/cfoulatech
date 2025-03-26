<?php

/* TP1:

d. Une page Addition avec comme titre Addition qui aura un formulaire qui fera
   une addition entre 2 nombre introduis au clavier et qui affichera la réponse.
   Attention on ne pourra introduire que des numéros. Je veux que le résultat de
   l'addition soit sauvegardé.

*/

$title = "Addition";
$nav = "addition";

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
