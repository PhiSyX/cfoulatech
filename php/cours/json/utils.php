<?php

/**
 * Retourne un JSON avec les en-têtes adéquats.
 */
function json(mixed $data): string | false
{
	header("Content-Type: application/json");
	return json_encode($data) . PHP_EOL;
}

/**
 * Retourne un JSON avec les en-têtes adéquats de manière élégante.
 */
function json_pretty(mixed $data): string | false
{
	header("Content-Type: application/json");
	return json_encode($data, JSON_PRETTY_PRINT) . PHP_EOL;
}
