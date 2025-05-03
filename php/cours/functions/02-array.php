<?php

echo array_sum([1, 2, 3, 4, 5]);
echo "<hr>";

echo sizeof([1, 2, 3, 4, 5]);
echo "<hr>";

var_dump(array_reverse([1, 2, 3, 4, 5]));

$tabs =[2,1,4,0,3];
var_dump($tabs);

sort($tabs);
var_dump($tabs);

rsort($tabs);
var_dump($tabs);

$a = "b";
$b = "c";
var_dump(compact("a", "b"));
