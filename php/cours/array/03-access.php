<?php

require "./03-associative.php";

echo $personne1["prenom"] . " " . $personne1["nom"];

echo "<br>";

echo $personne2["prenom"][0] . " " . $personne2["prenom"][1] . " " . $personne2["nom"][0] . " " . $personne2["nom"][1];
