<?php

require "./Human.php";
require "./Women.php";
require "./Man.php";

$women1 = new Women("Bleus", 2, "Épaté", "90D");
$man1 = new Man("Brun", 2, "Droit", "Bouc");

var_dump($women1);
var_dump($man1);
