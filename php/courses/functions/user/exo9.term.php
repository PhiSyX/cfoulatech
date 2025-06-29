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

function div(int $l, int $r): int|string
{
	if ($r === 0) {
		return "La division par zéro est interdite";
	}
	return $l / $r;
}

function prompt_operands(string $term)
{
	$left_operand = (int)readline(
		"[$term]: Veuillez introduire un premier nombre : "
	);
	$right_operand = (int)readline(
		"[$term]: Veuillez introduire un deuxième nombre : "
	);
	return [$left_operand, $right_operand];
}

function display_result_operation(
	int        $a,
	string     $word,
	int        $b,
	string|int $result
)
{
	if (is_numeric($result)) {
		return "$a $word $b donne $result";
	}
	return "Erreur: $result, recommencez...";
}

$operands = prompt_operands("Addition");
$lft = $operands[0];
$rgt = $operands[1];
echo display_result_operation($lft, "additionné à", $rgt, add($lft, $rgt)) . "\n";

$operands = prompt_operands("Soustraction");
$lft = $operands[0];
$rgt = $operands[1];
echo display_result_operation($lft, "soustrait à", $rgt, sub($lft, $rgt)) . "\n";

$operands = prompt_operands("Multiplication");
$lft = $operands[0];
$rgt = $operands[1];
echo display_result_operation($lft, "multiplié à", $rgt, mul($lft, $rgt)) . "\n";

$is_error = true;
$max = 10;
$i = 0;
do {
	$operands = prompt_operands("Division");
	$lft = $operands[0];
	$rgt = $operands[1];
	$div_output = display_result_operation($lft, "divisé à", $rgt, div($lft, $rgt));
	$is_error = str_starts_with($div_output, "Erreur:");
	echo $div_output . "\n";
	$i++;
} while ($i <= $max && $is_error);
