<?php

require __DIR__ . "/../utils/instruction.php";
echo instruction("
    Créer une application qui demande d'afficher des mots dans la console.
    Le programme DOIT s'arrêter lorsque le mot 'stop' est envoyé.
", input: true);

$user_word = "";
$stop_word = "stop";

while ($user_word !== $stop_word) {
	$user_word = readline("Entrez un mot au clavier (entrez \"stop\" pour arrêter : ");

	echo "Voici votre mot : $user_word\n";
}

echo "Vous avez quitté le programme !!!";
