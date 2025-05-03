<?php

$x = 18; // number: 18
$y = 20; // number: 20

// Égalité (==, !=, ===, !==)
$boolExpr = 12 == 12; // boolean: true
$boolExpr = 12 != 12; // boolean: false

$boolExpr = $x == 18; // boolean: true
$boolExpr = 20 == $y; // boolean: true
$boolExpr = $x == $y; // boolean: false

// Inférieur à (<, <=), Supérieur à (>, >=)
$boolExpr  = 1 < 2; // boolean: true
$boolExpr  = 2 < 2; // boolean: false
$boolExpr  = 2 <= 2; // boolean: true

$boolExpr  = 3 > 2; // boolean: true
$boolExpr  = 2 > 2; // boolean: false
$boolExpr  = 2 >= 2; // boolean: false

$boolExpr = $x < $y; // boolean: true
$boolExpr = $x > $y; // boolean: false
$boolExpr = $y < $x; // boolean: false
$boolExpr = $y > $x; // boolean: true

$x = 20; // number: 18
$y = 20; // number: 20

if ($x >= $y) {
	echo "$x est plus ou égal à $y, je passe ici";
} else {
	echo "$x n'est pas plus ou égal à $y, je passe ici";
}
