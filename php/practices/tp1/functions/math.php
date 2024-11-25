<?php

function calc(float $left_operand, string $operator, float $right_operand): float
{
	switch ($operator) {
		case "addition":
			return $left_operand + $right_operand;
		case "soustraction":
			return $left_operand - $right_operand;
		case "multiplication":
			return $left_operand * $right_operand;
		case "division":
			return $left_operand / $right_operand;
	}
	return 0;
}
