<?php

require_once __DIR__ . "/../utils/instruction.php";

// 4. Afficher les mots entrés par l'utilisateur depuis la console.
echo instruction(
	"Afficher les mots entrés par l'utilisateur depuis la console.",
	input: true,
);

$user_words = [];
$quit_word = "quitter";
$is_running = true;

while ($is_running) {
	$user_word = readline("Entrez un nouveau mot (écrivez '$quit_word' pour arrêter): ");
	if (!$user_word) {
		continue;
	}

	$is_running = $user_word !== $quit_word;
	// NOTE: si le mot "quitter" DOIT être compris dedans, cette condition DOIT
	//       être retirée.
	if ($is_running) {
		$user_words[] = $user_word;
	}
}

echo display_output();

foreach ($user_words as $user_word) {
	echo "$user_word ";
}
