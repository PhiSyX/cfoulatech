<?php

function operator_sign(string $operator): string
{
	$operators = [
		"addition"       => '+',
		"soustraction"   => '-',
		"multiplication" => '*',
		"division"       => '/',
	];

	if (isset($operators[$operator])) {
		return $operators[$operator];
	}

	return "";
}

function calc(
	float $left_operand,
	string $operator,
	float $right_operand
): float {
	switch ($operator) {
		case '+':
			return $left_operand + $right_operand;
		case '-':
			return $left_operand - $right_operand;
		case '*':
			return $left_operand * $right_operand;
		case '/':
			return $left_operand / $right_operand;
	}
	return 0;
}

function set_session_math(string $nav, float $result): void
{
	if (session_status() === PHP_SESSION_NONE) {
		session_start();
	}

	if (!isset($_SESSION["operations"][$nav])) {
		$_SESSION["operations"][$nav] = [];
	}

	$_SESSION["operations"][$nav][] = ["result" => $result];
}
