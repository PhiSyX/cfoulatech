<?php

/* TP2:

 d. (Difficile) Je veux que vous créez un fichier « functionsMath.php » qui
                contiendra plusieurs fonctions dont : addition, soustraction,
                division et multiplication. Ce fichier se trouvera dans le
                dossier « functions ». Bien entendu il faudra que vous utilisez
                ce fichier pour faire vos opérations mathématique.

 */

function operator_sign(string $operator): string
{
	$operators = [
		"addition"       => '+',
		"soustraction"   => "-",
		"multiplication" => "*",
		"division"       => "/",
	];

	if (isset($operators[$operator])) {
		return $operators[$operator];
	}

	return "";
}

function calc(float $left_operand, string $operator, float $right_operand): float
{
	switch ($operator) {
		case "+":
			return add($left_operand, $right_operand);
		case "-":
			return sub($left_operand, $right_operand);
		case "*":
			return mul($left_operand, $right_operand);
		case "/":
			return div($left_operand, $right_operand);
	}
	return 0;
}

/** LIRE d. */
function add(float $left_operand, float $right_operand): float
{
	return $left_operand + $right_operand;
}

/** LIRE d. */
function sub(float $left_operand, float $right_operand): float
{
	return $left_operand - $right_operand;
}

/** LIRE d. */
function mul(float $left_operand, float $right_operand): float
{
	return $left_operand * $right_operand;
}

/** LIRE d. */
function div(float $left_operand, float $right_operand): float
{
	return $left_operand / $right_operand;
}

// ------- //
// Session //
// ------- //

function set_session_math(
	string $nav,
	float $left_operand,
	string $operator,
	float $right_operand,
	float $result
): void {
	if (session_status() === PHP_SESSION_NONE) {
		session_start();
	}

	/* TP2:

	h. (Difficile) Je veux que dans la page de Mon profile, on voit le nombre
	               d'opérations mathématique que vous avez réussi à faire.
	               C'est-à-dire que si vous faites 4 additions, 2
	               multiplications, 1 division et 3 soustractions. Il devra
	               afficher un message en disant vous avez fait 10 opérations
	               mathématique. Attention même si on se déconnecte, quand vous
	               vous reconnecterez et que vous refaites 3 divisions et 2
	               multiplications, on verra que vous avez fait 15 opérations
	               mathématique. Ce sera donc gardez en mémoire


	n. (Très difficile) Je veux pour finir que vous sauvegardez en mémoire
						TOUTES les opérations mathématique que vous avez fait.
						Et qu'on les voit tous dans Mon Profile sous forme d'un
						tableau de 4 colonnes avec comme titres : opérations,
						nombre 1, nombre 2 et résultat. Dans opérations vous
						mettrez le nom de l'opération. Donc pensez à retenir
						pour chaque opération le nom de l'opération que vous
						avez fait. Ensuite pour le nombre de ligne de votre
						table ça dépendra bien entendu du nombre d'opération que
						vous aurez fait.

	 */

	if (!isset($_SESSION["operations"][$nav])) {
		$_SESSION["operations"][$nav] = [];
	}

	if (!isset($_SESSION["operations"]["total"])) {
		$_SESSION["operations"]["total"] = 0;
	}

	$_SESSION["operations"][$nav][] = [
		"left_operand" => $left_operand,
		"operator" => $operator,
		"right_operand" => $right_operand,
		"result" => $result,
	];

	$_SESSION["operations"]["total"] += 1;
}

function unset_all_math_session()
{
	if (session_status() === PHP_SESSION_NONE) {
		session_start();
	}

	$sessions = [
		"addition",
		"soustraction",
		"multiplication",
		"division",
	];

	/* TP2:

	c. Quand vous vous déconnectez il faut supprimer uniquement les opérations
	   faites.

	*/
	foreach ($sessions as $session) {
		unset($_SESSION["operations"][$session]);
	}
}
