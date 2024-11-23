<?php

$notes = [18, 13, 5, 10, 9];

$sum = array_sum($notes);
$avg = $sum / sizeof($notes);

echo "La somme des notes est $sum\n";
echo "La moyenne des notes est de $avg\n";
