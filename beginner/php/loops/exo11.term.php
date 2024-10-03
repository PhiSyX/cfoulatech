<?php

require __DIR__ . "/../utils/instruction.php";

/**
 * Pour cet exercice j'utilise deux boucles:
 *
 *  1. Une pour ajouter des mots dans un tableau de mots.
 *  2. Une pour afficher le tableau des mots.
 * 
 * Les étapes:
 *
 * La première boucle que j'ai utilisé est une boucle "TANT QUE" (while). 
 *
 *  1. Je crée une variable dollar $mots au pluriel qui va nous servir à ajouter
 *     les futurs mots, à laquelle je lui attribue comme valeur un tableau vide.
 *
 *  2. Je crée une variable dollar $encours à laquelle je lui attribue la valeur
 *     booléenne VRAIE (true).
 *
 *      Cette variable va nous permettre de quitter la boucle TANT QUE
 *      lorsqu'elle sera assignée à la valeur booléenne FAUSSE (false).
 *
 *  3. Je crée la boucle TANT QUE (while) avec comme condition dollar $encours.
 *
 *  4. À l'intérieur de cette boucle:
 *
 *      4.1. Je crée une variable dollar $mot au singulier, à laquelle j'appelle
 *           la fonction readline avec le texte donné.
 *
 *      4.2. Je modifie la variable dollar $encours, pour mettre la condition
 *           dollar $mot n'est pas égal à la chaîne de caractères "stop".
 *
 *      4.3. Je vérifie avec une condition SI (if) que la dollar $encours est
 *           VRAIE (true).
 *
 *          4.3.1. J'ajoute dollar $mot au singulier au tableau des mots, 
 *                 dollar $mots au pluriel.
 *
 * La seconde boucle que j'ai utilisé est une boucle "POUR CHAQUE" (foreach)
 *
 *  1. "POUR CHAQUE" dollar $mots au pluriel AS dollar $mot au singulier
 *
 *  2. J'appelle la fonction "echo" dollar $mot au singulier suivi d'une
 *     concaténation d'une chaîne de caractères composant d'une virgule et d'un
 *     espace pour séparer le tout.
 */

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
