<?php

require_once __DIR__ . "/../utils/instruction.php";

// 6. Vérifiez que le montant entré par l'utilisateur depuis la console est entre 100€ et 200€
echo instruction(
    "Vérifiez que le montant entré par l'utilisateur depuis la console est entre 100 et 200 euros",
    input: true,
);

$maybe_user_amount = readline("Quel est votre montant: ");
$amount_min = 100;
$amount_max = 200;

if ($maybe_user_amount === false || !is_numeric($maybe_user_amount)) {
    exit("Tu DOIS entrer un montant valide (une valeur entière ou décimale).");
}

$user_amount = (float)$maybe_user_amount;

echo display_output();

if ($user_amount < $amount_min) {
    echo "Vous n'avez pas assez d'argent";
} else if ($user_amount >= $amount_min && $user_amount <= $amount_max) {
    echo "Vous avez bien introduis un montant ($user_amount) se situant entre $amount_min et $amount_max euros";
} else {
    echo "Vous avez dépassé la limite";
}
