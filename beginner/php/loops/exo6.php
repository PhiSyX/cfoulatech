<?php

$numbers = [11, 18, 99, 17, 65220, 6485, 78, 97, 48, 2, 112];
$numbers_len = count($numbers);

for ($i = 0; $i < $numbers_len; $i++) {
    $number = $numbers[$i];

    if ($number % 2 === 0) {
        echo "$number est pair\n";
    }
}
