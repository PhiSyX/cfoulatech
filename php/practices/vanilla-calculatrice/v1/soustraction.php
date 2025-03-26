<?php

/* TP1:

g. Une page Soustraction avec comme titre Soustraction qui aura un formulaire
   qui fera une soustraction entre 2 nombre introduis au clavier et qui
   affichera la réponse. Attention on ne pourra introduire que des numéros. Je
   veux que le résultat de la soustraction soit sauvegardé.

 */

$title = "Soustraction";
$nav = "soustraction";

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
