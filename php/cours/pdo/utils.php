<?php

/**
 * Coupe les caractères "_" du paramètre $text, ce qui nous donnera un tableau
 *
 * EXEMPLE :
 * 		$text = "id_user";
 * Ca nous donnera :
 * 		["id", "user"]
 *
 * Ensuite ce que je fais, c'est que je parcours le tableau et j'ajoute dans une
 * variable string, la première lettre de chaque élément en majuscule.
 *
 * Ce qui nous donnera pour l'exemple plus haut :
 *
 * 		$w = "Id User"
 *
 * Et ensuite je retourne $w.
 */
function capitalize(string $text): string
{
	$w = "";
	foreach (explode("_", $text) as $value) {
		$w .= " ";
		$w .= ucfirst($value);
	}
	return $w;
}

/**
 * Raccourci de la fonction `htmlspecialchars`.
 *
 * C'est pour éviter d'afficher les caractères < et > dans le PHP à partir d'une
 * variable, sinon ça va injecter de l'HTML dynamiquement, et c'est pas bon.
 */
function h(string $p): string
{
	return htmlspecialchars($p);
}

/**
 * Construit un élément input en fonction des paramètres.
 */
function input(string $name, string $label = null, $attrs = []): string
{
	$element = "";

	// Début de la construction de la balise <label>
	if ($label != null) {
		$element .= '<label for="' . h($name) . '">';
		$element .= h($label);
		$element .= "</label>";
	}
	// Fin de la construction de la balise </label>

	// Début de la construction de la balise <input>
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
	// Fin de la construction de la balise <input/>

	// Début de la construction de la balise <datalist>
	if (isset($attrs["datalist"], $attrs["list"])) {
		$element .= '<datalist id="' . h($attrs["list"]) . '">';

		foreach ($attrs["datalist"] as $x => $y):
			// Début de la construction de la balise <option> à l'intérieur de la balise <datalist>
			if (is_array($y)) {
				$element .= '<option value="' . h($y[0]) . '">';
				// Ajout d'un texte à l'intérieur de la balise option
				$element .= h($y[1]);
			} else {
				$element .= '<option value="' . h($x) . '">';
				// Ajout d'un texte à l'intérieur de la balise option
				$element .= h($y);
			}
			$element .= "</option>";
			// Fin de la construction de la balise </option>
		endforeach;

		$element .= "</datalist>";
	}
	// Fin de la construction de la balise </datalist>

	return $element;
}

function select(string $name, string $label = null, $options = [], $attrs = []): string
{
	$element = "";

	// Début de la construction de la balise <label>
	if ($label != null) {
		$element .= '<label for="' . h($name) . '">';
		// Ajoute du texte à l'intérieur de la balise label
		$element .= h($label);
		$element .= "</label>";
	}
	// Fin de la construction de la balise </label>

	// Début de la construction de la balise <select>
	$element .= '<select name="' . h($name) . '"';

	if ($label != null) {
		$element .= ' id="' . h($name) . '"';
	}

	$element .= '>';

	foreach ($options as $key => $value) {
		// Début de la construction de la balise <option> à l'intérieur de la balise <select>
		$element .= '<option value="' . h($key) . '"';

		if (isset($attrs["value"]) && $key === $attrs["value"]) {
			$element .= ' selected';
		}

		$element .= '>';
		// Ajoute du texte à l'intérieur de la balise option
		$element .= h($value);
		$element .= '</option>';
		// Fin de la construction de la balise </option>
	}

	$element .= "</select>";
	// Fin de la construction de la balise </select>

	return $element;
}

/**
 * Récupère la description, la structure d'une table donnée.
 *
 * Cette fonction va effectuer une requête `DESCRIBE users` par exemple,
 * et nous retourner toutes les lignes.
 */
function describe(string $table): mixed
{
	return fetchAll("DESCRIBE $table");
}

/**
 * Récupère tous les enregistrements d'une requête.
 */
function fetchAll(string $req, array $bindings = []): mixed
{
	global $pdo; // NEVER USE THIS, THIS IS FOR EXEMPLE

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

/**
 * Récupère un seul enregistrement d'une requête.
 */
function fetchOne(string $req, array $bindings = []): mixed
{
	global $pdo; // NEVER USE THIS, THIS IS FOR EXEMPLE

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

/**
 * Execute une requête
 */
function executeQuery(string $req, array $bindings = []): bool
{
	global $pdo; // NEVER USE THIS, THIS IS FOR EXEMPLE

	try {
		$res = $pdo->prepare($req);
		return $res->execute($bindings);
	} catch (PDOException $e) {
		var_dump($e);
		return false;
	}
}

/**
 * Insère des données dans une table.
 *
 * Cette fonction va effectuer une requête SQL: INSERT INTO ...
 */
function insertQuery(string $table, array $data): bool
{
	// Tous les champs à ajouter, ex: "firstname, lastname"
	$fields = join(",", array_keys($data));

	// Toutes les variables à mettre dans la requête, ex: ":firstname, :lastname"
	$bindings = join(",", array_map(fn($k) => ":$k", array_keys($data)));

	return executeQuery("INSERT INTO $table ($fields) VALUES ($bindings)", $data);
}

/**
 * Retourne le driver de connexion SQL
 */
function sqlDriver()
{
	$v = fetchOne("SELECT VERSION() AS version");

	if (strpos(strtolower($v->version), "mariadb")) {
		return "mariadb";
	} else {
		return "mysql";
	}
}
