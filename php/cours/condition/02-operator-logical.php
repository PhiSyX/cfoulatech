<?php

$x = 18; // number: 18
$y = 20; // number: 20

// AND (and, &&)
// Les deux conditions doivent être vraies pour être vraie
$boolExpr = $x == 18 and $y == 20; // boolean: true
//            true   and  true     = true
$boolExpr = $x == $y && $y == $x; // boolean: false
//            false  and  false   = false
$boolExpr = $x == $y && $y == 20; // boolean: false
//            false  and  true    = false


// OR (or, ||)
// L'une des deux conditions est vraie pour être vraie
$boolExpr = $x == 18 or $y == 20; // boolean: true
//            true   or  true     = true
$boolExpr = $x == $y || $y == $x; // boolean: false
//            false  or  false    = false
$boolExpr = $x == $y || $y == 20; // boolean: true
//            false  or   true    = true
