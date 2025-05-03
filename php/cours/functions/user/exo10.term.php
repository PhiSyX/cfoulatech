<?php

$add = fn(int $l, int $r): int => $l + $r;
$sub = fn(int $l, int $r): int => $l - $r;
$mul = fn(int $l, int $r): int => $l * $r;
$div = function (int $l, int $r): int|string {
	if ($r === 0) {
		return "Division par 0 impossible";
	}
	return $l / $r;
};

function prompt_operands(string $term)
{
	$left_operand = (int) readline(
		"[$term]:  Veuillez introduire un premier nombre : "
	);
	$right_operand = (int) readline(
		"[$term]: Veuillez introduire un deuxième nombre : "
	);
	return [$left_operand, $right_operand];
}

function display_result_operation(int $a, string $word, int $b, callable $calc)
{
	$result = $calc($a, $b);
	if (is_numeric($result)) {
		return "$a $word à $b donne $result";
	}
	return "Erreur: $result";
}

$ops = [
	[
		"name" => "Addition",
		"term" => "additionné",
		"calc" => $add,
	],
	[
		"name" => "Soustraction",
		"term" => "soustrait",
		"calc" => $sub,
	],
	[
		"name" => "Multiplication",
		"term" => "multiplié",
		"calc" => $mul,
	],
];

foreach ($ops as $op) {
	[$a, $b] = prompt_operands($op["name"]);
	echo display_result_operation($a, $op["term"], $b, $op["calc"]) . "\n";
}

$continue = true;
do {
	[$a, $b] = prompt_operands("Division");
	$div_output = display_result_operation($a, "divisé à", $b, $div);
	$continue = str_starts_with($div_output, "Erreur:");
	echo $div_output . "\n";
} while ($continue);
