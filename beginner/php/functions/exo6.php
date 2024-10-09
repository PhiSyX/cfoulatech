<?php

$notes = [18, 13, 5, 10, 9];
$reverse_notes = array_reverse($notes);

echo "Voici votre tableau est: ";
echo "[ ";
foreach ($notes as $note) {
    echo "$note ";
}
echo "]";
echo "\n";


echo "Voici votre tableau inversé est: ";
echo "[ ";
foreach ($reverse_notes as $note) {
    echo "$note ";
}
echo "]";
echo "\n";
