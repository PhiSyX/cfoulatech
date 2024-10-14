<?php

function add(int $l, int $r): int
{
    return $l + $r;
}

function sub(int $l, int $r): int
{
    return $l - $r;
}

function mul(int $l, int $r): int
{
    return $l * $r;
}
function div(int $l, int $r): int | string
{
    if ($r === 0) {
        return "La division par zéro est interdite";
    }
    return $l / $r;
};

function prompt_operands(string $term)
{
    $left_operand  = (int) readline("[$term]: Veuillez introduire un premier nombre : ");
    $right_operand = (int) readline("[$term]: Veuillez introduire un deuxième nombre : ");
    return [$left_operand, $right_operand];
}

function display_result_operation(
    int $a,
    string $word,
    int $b,
    string | int $result
)
{
    if (is_numeric($result)) {
        return "$a $word $b donne $result";
    }
    return "Erreur: $result, recommencez...";
}

$operands = prompt_operands("Addition");
$a = $operands[0];
$b = $operands[1];
echo display_result_operation($a, "additionné à", $b, add($a, $b)) . "\n";

$operands = prompt_operands("Soustraction");
$a = $operands[0];
$b = $operands[1];
echo display_result_operation($a, "soustrait à", $b, sub($a, $b)) . "\n";

$operands = prompt_operands("Multiplication");
$a = $operands[0];
$b = $operands[1];
echo display_result_operation($a, "multiplié à", $b, mul($a, $b)) . "\n";

$is_error = true;
do {
    $operands = prompt_operands("Division");
    $a = $operands[0];
    $b = $operands[1];
    $div_output = display_result_operation($a, "divisé à", $b, div($a, $b));
    $is_error = str_starts_with($div_output, "Erreur:");
    echo $div_output . "\n";
} while ($is_error);
