<?php

/*
$date1 = new DateTime();
//$date1 = new DateTime(timezone: new DateTimeZone("Europe/Brussels"));
var_dump($date1);

$date2 = new DateTime("07-12-1991 15:20:53");
var_dump($date2);
*/

require "./Voiture.php";

$maVoiture = new Voiture("blanche", 1500.0, 7800);

// $maVoiture->demarrer();

var_dump($maVoiture);
