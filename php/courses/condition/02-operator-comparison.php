<?php

$x = 18; // number: 18
$y = 20; // number: 20

// Égalité (==, !=, ===, !==)
$bool_expr = 12 == 12; // boolean: true
$bool_expr = 12 != 12; // boolean: false

$bool_expr = $x == 18; // boolean: true
$bool_expr = 20 == $y; // boolean: true
$bool_expr = $x == $y; // boolean: false

// Inférieur à (<, <=), Supérieur à (>, >=)
$bool_expr = 1 < 2; // boolean: true
$bool_expr = 2 < 2; // boolean: false
$bool_expr = 2 <= 2; // boolean: true

$bool_expr = 3 > 2; // boolean: true
$bool_expr = 2 > 2; // boolean: false
$bool_expr = 2 >= 2; // boolean: false

$bool_expr = $x < $y; // boolean: true
$bool_expr = $x > $y; // boolean: false
$bool_expr = $y < $x; // boolean: false
$bool_expr = $y > $x; // boolean: true

$x = 20; // number: 18
$y = 20; // number: 20

if ($x >= $y) {
	echo "$x est plus ou égal à $y, je passe ici";
} else {
	echo "$x n'est pas plus ou égal à $y, je passe ici";
}
