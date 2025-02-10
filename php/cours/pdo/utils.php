<?php

function capitalize(string $text): string
{
	$w = "";
	foreach (explode("_", $text) as $key => $value) {
		$w .= " ";
		$w .= ucfirst($value);
	}
	return $w;
}

function h(string $p): string
{
	return htmlspecialchars($p);
}

function input(string $name, string $label = null, $attrs = []): string
{
	$element = "";

	if ($label != null) {
		$element .= '<label for="' . h($name) . '">';
		$element .= h($label);
		$element .= "</label>";
	}

	$element .= "<input ";

	if ($label != null) {
		$element .= ' id="' . h($name) . '"';
	}

	$element .= ' name="' . h($name) . '"';

	foreach ($attrs as $attrName => $attrValue) {
		switch ($attrName) {
			case "datalist":
			case "name":
				continue 2;
		}

		$element .= ' ' . h($attrName) . '="' . h($attrValue) . '"';
	}

	$element .= ">";

	if (isset($attrs["datalist"], $attrs["list"])) {
		$element .= '<datalist id="' . h($attrs["list"]) . '">';

		foreach ($attrs["datalist"] as $x => $y):
			if (is_array($y)) {
				$element .= '<option value="' . h($y[0]) . '">';
				$element .= h($y[1]);
			} else {
				$element .= '<option value="' . h($x) . '">';
				$element .= h($y);
			}
			$element .= "</option>";
		endforeach;

		$element .= "</datalist>";
	}

	return $element;
}

function select(string $name, string $label = null, $options = [], $attrs = []): string
{
	$element = "";

	if ($label != null) {
		$element .= '<label for="' . h($name) . '">';
		$element .= h($label);
		$element .= "</label>";
	}

	$element .= '<select name="' . h($name) . '"';

	if ($label != null) {
		$element .= ' id="' . h($name) . '"';
	}

	$element .= '>';

	foreach ($options as $key => $value) {
		$element .= '<option value="' . h($key) . '"';

		if (isset($attrs["value"]) && $key === $attrs["value"]) {
			$element .= ' selected';
		}

		$element .= '>';
		$element .= h($value);
		$element .= '</option>';
	}

	$element .= "</select>";

	return $element;
}

function fetchAll(string $req, array $bindings = []): mixed
{
	global $pdo;

	try {
		$res = $pdo->prepare($req);

		if (count($bindings) > 0) {
			foreach ($bindings as $varname => $value) {
				if (is_array($value)) {
					$res->bindParam(":$varname", $value[0], $value[1]);
				} else {
					$res->bindParam(":$varname", $value);
				}
			}
		}

		if (!$res->execute()) {
			return [];
		}

		return $res->fetchAll() ?? [];
	} catch (PDOException $_) {
		return [];
	}
}


function fetchOne(string $req, array $bindings = []): mixed
{
	global $pdo;

	$res = $pdo->prepare($req);

	if (count($bindings) > 0) {
		foreach ($bindings as $varname => $value) {
			if (is_array($value)) {
				$res->bindParam(":$varname", $value[0], $value[1]);
			} else {
				$res->bindParam(":$varname", $value);
			}
		}
	}

	if (!$res->execute()) {
		return null;
	}

	return $res->fetch() ?? null;
}

function executeQuery(string $req, array $bindings = []): bool
{
	global $pdo;

	try {
		$res = $pdo->prepare($req);
		return $res->execute($bindings);
	} catch (PDOException $_) {
		return false;
	}
}
