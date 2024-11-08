<?php

require dirname(__DIR__) . "/fonctions_require.php";

$term1 = "additionné";
$term2 = "addition";

if (yes_or_no("Voulez-vous $term1?")) {
    $nb1 = readline("Votre premier nombre : ");
    $nb2 = readline("Votre second nombre : ");

    if (!(is_numeric($nb1) || is_numeric($nb2))) {
        echo "Veuillez introduire 2 nombres\n";
    } else {
        $result = add(7, 2); // 9
        echo "La réponse de la $term2 est $result\n";
    }
} else {
    echo "Vous avez décidé de ne pas utiliser l'$term2.\n";
}
