<?php

require dirname(__DIR__) . "/fonctions_require.php";

const ADD = 1;
const SUB = 2;
const MUL = 3;
const DIV = 4;
const DIV_BY_ZERO = 0;

function calc(int $op, float $l, float $r): float
{
    switch ($op) {
        case ADD: return add($l, $r);
        case SUB: return sub($l, $r);
        case MUL: return mul($l, $r);
        case DIV: return div($l, $r);
    }
}

if (yes_or_no("Voulez-vous faire un calcul?")) {
    $op = readline(
        "Veuillez introduire une opération entre 1 et 4 (" .
            ADD . " = Addition, " .
            SUB . " = Soustraction, " .
            MUL . " = Multiplication, " .
            DIV . " = Division" .
        ") : "
    );

    if ( ! ($op >= ADD && $op <= DIV)) {
        echo "Vous avez introduit autre chose qu'un chiffre entre 1 et 4\n";
        return;
    }

    $nb1 = readline("Votre premier nombre : ");
    $nb2 = null;
    do {
        $nb2 = readline("Votre second nombre : ");
        if ($op == DIV && $nb2 == DIV_BY_ZERO) {
            echo "Vous avez tenté une division par 0, recommencez...\n";
        }
    } while ($op == DIV && $nb2 == DIV_BY_ZERO);

    if ( ! (is_numeric($nb1) && is_numeric($nb2))) {
        echo "Veuillez introduire 2 nombres\n";
    } else {
        $result = calc($op, $nb1, $nb2);
        echo "La réponse du calcul est $result\n";
    }
} else {
    echo "Vous avez décidé de ne pas faire de calcul.\n";
    echo "Au revoir !\n";
}
