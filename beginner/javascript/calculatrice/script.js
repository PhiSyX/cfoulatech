// @ts-nocheck

/**
 * Exercice faire une calculatrice simple. Sur la base de connaissances que nous
 * avons vu en cours.
 *
 * /!\ NE PAS UTILISER CE QU'ON N'A PAS ENCORE VU /!\
 */

/**
 * Invite l'utilisateur à entrer une valeur depuis le navigateur, si aucune
 * valeur n'est entrée l'invitation recommence.
 *
 * NOTE: Le résultat `null` est envoyé lorsque l'utilisateur ANNULE la demande
 * depuis l'interface.
 *
 * Le paramètre `instruction` prend en argument une valeur de type String. La
 * fonction retourne une valeur de type String ou de type null.
 */
function prompt_en_boucle(instruction) {
	let valeur;

	do {
		// 1. On demande à l'utilisateur d'entrer une valeur depuis l'interface.
		let saisie_utilisateur = prompt(instruction);

		// 2. On entre dans cette condition si l'utilisateur n'envoie pas du
		//    vide.
		if (saisie_utilisateur !== "") {
			// 2.1. On applique la valeur de la saisie utilisateur comme valeur
			//      de retour dans résultat. Étant donné qu'on a un résultat, on
			//      sort de cette boucle, grâce à la condition en 3.
			valeur = saisie_utilisateur;
		}
	} while (
		// 3. On vérifie que la condition est correcte. On sort de cette boucle
		//    lorsque la valeur est une chaîne de caractères, ou lorsque
		//    l'utilisateur à appuyer sur le bouton ANNULER (= null). Sinon on
		//    revient au point 1. plus-haut...
		typeof valeur !== "string" &&
		valeur !== null
	);

	return valeur;
}

/**
 * Invite l'utilisateur à entrer un nombre entier ou décimal (nombre à virgule).
 *
 * La fonction retourne une valeur de type entier (entier ou entier décimale) ou
 * la valeur booléenne fausse (false).
 */
function prompt_nombre(instruction) {
	// 1. On demande à l'utilisateur d'entrer une valeur. La valeur de retour de
	//    la fonction `prompt_en_boucle` est sauvegardé dans `nombre_en_chaine`.
	let nombre_en_chaine = prompt_en_boucle(instruction);

	// 2. On entre dans cette condition si l'utilisateur à appuyer sur annuler.
	//    Sinon c'est que l'utilisateur à appuyer sur Ok et on passe au point 3.
	if (nombre_en_chaine === null) {
		// 2.1. On retourne une valeur booléenne fausse pour indiquer que nous
		// 		ne voulons plus continuer le script, on va gérer ça plus tard...
		return false;
	}

	// 3: On converti la chaîne entrée par l'utilisateur en nombre entier ou
	//    décimal via la fonction native `Number()` ou `parseFloat()`.
	let nombre = Number.parseFloat(nombre_en_chaine);

	/**
	 * Vérifie si le nombre est valide.
	 *
	 * = `Number.isNaN(nombre)`
	 */
	const verifie_nombre_invalide = (nombre) => {
		return !nombre && nombre !== 0;
	};

	// 4. On vérifie que le nombre converti n'est pas valide via `isNaN()`, qui
	//    veut dire "NaN = Not a Number", si ça n'est pas le cas, on entre dans
	//    cette condition.
	if (verifie_nombre_invalide(nombre)) {
		// 4.1. On notifie l'utilisateur de son erreur.
		erreur("Il ne s'agit pas d'un nombre valide, recommencez...");

		// 4.2. On retourne une valeur booléenne fausse pour indiquer que nous
		// 		ne voulons plus continuer le script, on va gérer ça plus tard...
		return false;
	}

	// 5. On retourne ce nombre valide à nos variables indépendantes.
	return nombre;
}

/**
 * Invite l'utilisateur à entrer un des opérateurs arithmétiques supportés:
 *
 * Les opérateurs supportés:
 *
 * - '*'
 * - '/'
 * - '+'
 * - '-'
 *
 * La fonction retourne l'opérateur valide ou false.
 */
function prompt_operateur_arithmetique(instruction) {
	// 1. On demande à l'utilisateur d'entrer une valeur.
	let op = prompt_en_boucle(instruction);

	// 2. On entre dans cette condition si l'utilisateur à appuyer sur annuler.
	//    Sinon c'est que l'utilisateur à appuyer sur Ok et on passe au point 3.
	if (op === null) {
		// 2.1. On retourne une valeur booléenne fausse pour indiquer que nous
		//      ne voulons plus continuer le script, on va gérer ça plus tard...
		return false;
	}

	// 3. On entre dans cette condition si ce qui a été envoyé par l'utilisateur
	//    n'est pas un des opérateurs arithmétiques supportés.
	//    Sinon c'est que l'utilisateur à entrer un opérateur supporté et on
	//    passe au point 4.
	if (!(op === "*" || op === "/" || op === "+" || op === "-")) {
		// 3.1. On notifie l'utilisateur de son erreur.
		erreur("L'opérateur est invalide, choisissez entre * / + ou -");

		// 3.2. On retourne une valeur booléenne fausse pour indiquer que nous
		// 		ne voulons plus continuer le script, plus tard...
		return false;
	}

	// 4. On retourne cette opérateur à notre variable.
	return op;
}

/**
 * Événement utilisée lors du CLICK.
 */
function evenement_calculer_operation() {
	// 1. On demande le premier nombre à l'utilisateur. La valeur de retour de
	//    la fonction `prompt_nombre` est sauvegardée dans la variable
	//    `operande_gauche`.
	let operande_gauche = prompt_nombre("Quel est le premier nombre");

	// 1.1. On ne veut plus continuer le script si la valeur de l'opérande de
	// 		gauche est fausse.
	if (operande_gauche === false) {
		// Stop la fonction.
		return false;
	}

	// 2. On demande l'opérateur arithmétique à l'utilisateur. La valeur de
	//    retour de la fonction `prompt_operator` est sauvegardée dans la
	//    variable `operateur`.
	let operateur = prompt_operateur_arithmetique(
		"Quel est est l'opérateur (*, /, +, -)",
	);

	// 2.1. On ne veut plus continuer le script si la valeur de l'opérateur est
	// 		fausse.
	if (operateur === false) {
		// Stop la fonction.
		return false;
	}

	// 3. On demande le second nombre à l'utilisateur. La valeur de retour de
	//    la fonction `prompt_nombre` est sauvegardée dans la variable
	//    `operande_droite`.
	let operande_droite = prompt_nombre("Quel est le second nombre");
	if (operande_droite === null) {
		// Stop la fonction.
		return false;
	}

	// 4. On fait le calcule des opérations.
	let resultat = calculer_operation(
		operande_gauche,
		operateur,
		operande_droite,
	);
	// 4.1. On entre dans condition si le resultat est en fait une erreur. Et on
	// 		s'arrête là.
	if (typeof resultat === "string") {
		// 4.1.1. On notifie à l'utilisateur de son erreur.
		erreur(resultat);

		// Stop la fonction.
		return false;
	}

	// 4.2. On entre dans condition si le resultat est réalisée avec succès.
	if (resultat !== null) {
		// 4.2.1. On notifie l'utilisateur de la sortie attendue par l'énoncée.
		let sortie = `Le résultat de ${operande_gauche} ${operateur} ${operande_droite} est ${resultat}`;
		alert(sortie);
	}
}

/**
 * Notifie l'utilisateur avec un message erreur.
 */
function erreur(message_erreur) {
	alert(`Erreur: ${message_erreur}`);
	return false;
}

/**
 * Calcule l'opération.
 *
 * operande_gauche est un entier, qui correspond au chiffre de gauche dans une
 * opération arithmétique.
 *
 * operateur est une chaine, qui correspond au symbole d'une opération
 * arithmétique.
 *
 * operande_droite est un entier, qui correspond au chiffre de droite dans une
 * opération arithmétique.
 *
 * Cette fonction retourne le résultat de l'opérateur (entier) ou
 * une erreur (chaine).
 */
function calculer_operation(operande_gauche, operateur, operande_droite) {
	let resultat = null;

	// 1. On vérifie chaque opérateur supportés dans un switch case et on
	//    assigne le résultat de chaque opération dans la variable `resultat`.

	switch (operateur) {
		case "*":
			resultat = mul(operande_gauche, operande_droite);
			break;

		case "/":
			resultat = div(operande_gauche, operande_droite);
			break;

		case "+":
			resultat = add(operande_gauche, operande_droite);
			break;

		case "-":
			resultat = sub(operande_gauche, operande_droite);
			break;

		default:
			// 1.1. On retourne une erreur logique par rapport au contexte de la
			//      fonction. On est jamais censé arriver ici, mais sait-on
			//      jamais.
			resultat = "Opération invalide";
			break;
	}

	// 2. On retourne le résultat de l'opération à nos variables.
	return resultat;
}

/**
 * Fonctions de calculs arithmétiques
 */

const mul = (a, b) => a * b;

const div = (a, b) => {
	// NOTE: impossible de diviser par zéro.
	if (b === 0) {
		return "Division par zéro impossible";
	}
	return a / b;
};

const add = (a, b) => a + b;

const sub = (a, b) => a - b;
