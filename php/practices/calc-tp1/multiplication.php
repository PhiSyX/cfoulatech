<?php

/* TP1:

e. Une page Multiplication avec comme titre Multiplication qui aura un
   formulaire qui fera une multiplication entre 2 nombre introduis au clavier et
   qui affichera la réponse. Attention on ne pourra introduire que des numéros.
   Je veux que le résultat de la multiplication soit sauvegardé.

*/

$title = "Multiplication";
$nav = "multiplication";

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
