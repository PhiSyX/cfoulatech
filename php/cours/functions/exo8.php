<?php

$notes = [18, 13, 5, 10, 9];

rsort($notes);

echo "Votre tableau est: ";
echo "[ ";
foreach ($notes as $note) {
	echo "$note ";
}
echo "]";
echo "\n";
