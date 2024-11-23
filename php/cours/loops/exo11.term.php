<?php

require __DIR__ . "/../utils/instruction.php";

$user_words = [];
$stop_word = "stop";
$is_running = true;

echo instruction("
    Créer une application qui invite l'utilisateur à entrer des mots dans le programme.
    Afficher les mots de l'utilisateur séparés par des virgules.
", input: true);

while ($is_running) {
	$user_word = readline("Entrez un nouveau mot ou tapez 'stop' pour arrêter: ");
	$is_running = $user_word !== $stop_word;
	if ($is_running) {
		$user_words[] = $user_word;
	}
}

echo display_output();

foreach ($user_words as $user_word) {
	echo "$user_word ";
}
