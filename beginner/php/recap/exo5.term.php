<?php

require_once __DIR__ . "/../utils/instruction.php";

// 5. Comptez le nombre de mots entrés par l'utilisateur depuis la console.
echo instruction(
    "Comptez le nombre de mots entrés par l'utilisateur depuis la console.",
    input: true,
);

$total_user_words = 0;
$quit_word = "fin";
$is_running = true;

while ($is_running) {
    $user_word = readline("Entrez un mot (écrivez '$quit_word' pour arrêter): ");
    if (!$user_word) {
        continue;
    }
    $is_running = $user_word !== $quit_word;
    $total_user_words += 1;
}

$mots = "mot";
if ($total_user_words > 1) {
    $mots .= "s";
}

echo display_output();

echo "Vous avez introduis $total_user_words $mots";
