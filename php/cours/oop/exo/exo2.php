<?php

require "../Voiture.php";

$maVoiture = new Voiture();
$maVoiture->couleur = "Blanche";
$maVoiture->poids = 79.9;
$maVoiture->prix = 500;

showVoiture($maVoiture);

$maVoiture->couleur = "Noire";
echo "Ma nouvelle couleur est : <strong>" . $maVoiture->couleur    . "</strong> <br>";
