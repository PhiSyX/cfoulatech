<?php

$notes = [18, 13, 5, 9, 10];
$score = 20;
$half_score = $score / 2;

foreach ($notes as $note) {
    if ($note === $half_score) {
        echo "Tu as eu tout pile $note/$score !\n";
    } else if ($note > $half_score) {
        echo "Tu as réussi avec la note de $note/$score !\n";
    } else {
        echo "Tu as raté avec la note de $note/$score !\n";
    }
}
