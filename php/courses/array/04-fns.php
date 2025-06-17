<?php

$notes = [13, 17, 12, 20, 3];
echo "Le nombre total de notes est de " . count($notes);
echo "<hr>";

$nouvellesNotes = array_map(fn ($note) => $note * 2, $notes);
var_dump($notes);
var_dump($nouvellesNotes);
echo "<hr>";

$nouvellesNotes = array_filter($notes, fn ($note) => $note % 2 === 0);
var_dump($notes);
var_dump($nouvellesNotes);
echo "<hr>";

$moyenne = array_reduce($notes, fn ($acc, $note) => $acc + $note, 0) / count($notes);
echo "La moyenne des notes est de " . $moyenne;
echo "<hr>";
