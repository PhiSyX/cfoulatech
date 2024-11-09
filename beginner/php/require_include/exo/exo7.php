<?php

require dirname(__DIR__) . "/fonctions_require.php";

if (yes_or_no("Voulez-vous faire un calcul?")) {
    $op = readline(
        "Veuillez introduire une opération entre 1 et 4 (" .
            "1 = Addition, " .
            "2 = Soustraction, " .
            "3 = Multiplication, " .
            "4 = Division" .
        ") : "
    );

    if (!($op >= 1 && $op <= 4)) {
        echo "Vous avez introduit autre chose qu'un chiffre entre 1 et 4\n";
        return;
    }

    $nb1 = readline("Votre premier nombre : ");
    $nb2 = null;
    do {
        $nb2 = readline("Votre second nombre : ");
        if ($op == 4 && $nb2 == 0) {
            echo "Vous avez tenté une division par 0, recommencez\n";
        }
    } while ($op == 4 && $nb2 == 0);

    if (!(is_numeric($nb1) || is_numeric($nb2))) {
        echo "Veuillez introduire 2 nombres\n";
    } else {
        $result = calc($nb1, $nb2, $op);
        echo "La réponse du calcul est $result\n";
    }
} else {
    echo "Vous avez décidé de ne pas faire de calcul.\n";
    echo "Au revoir !\n";
}
