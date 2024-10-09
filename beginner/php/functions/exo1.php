<?php

$notes = [18, 13, 5, 10, 9];
$max_score = max($notes);

echo "Votre tableau est: ";
echo "[ ";
foreach ($notes as $note) {
    echo "$note ";
}
echo "]";

echo "\n";

echo "Voici la valeur max : $max_score\n";
