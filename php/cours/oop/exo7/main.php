<?php

require "./Humain.php";
require "./Femme.php";
require "./Homme.php";

$femme = new Femme("Bleus", 2, "Épaté", "90D");
$homme = new Homme("Brun", 2, "Droit", "Bouc");

var_dump($femme);
var_dump($homme);
