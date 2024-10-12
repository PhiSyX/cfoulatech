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
 * Dans cette partie que voyons-nous :
 *
 *  - Appel de fonction. Récupération de son retour.
 *  - Fonction de callback.
 * 	- Initialisation d'une variable à undefined
 *  - Déclaration variable via let
 *  - Boucle do while
 *  - Condition if
 *  - Opérateur de comparaison ===, !==
 *  - Opérateur logique &&, ||
 *  - typeof
 *
 * @param {String} instruction - Instruction à donner au prompt.
 * @param {Function} validation_fonction - Fonction Callback qui sert de validation.
 * @returns {String|Number|null} La saisie utilisateur.
 */
function prompt_en_boucle(instruction, validation_fonction) {
	let valeur;

	do {
		// 1. On demande à l'utilisateur d'entrer une valeur depuis l'interface.
		let saisie_utilisateur = prompt(instruction);

		// 2. On entre dans cette condition si l'utilisateur n'envoie pas du
		//    vide.
		if (saisie_utilisateur !== "") {
			// 2.1. On applique la valeur de la saisie utilisateur comme valeur
			//      de retour dans résultat. Étant donné qu'on a un résultat, on
			//      sort de cette boucle, grâce à la condition en point 4.
			valeur = saisie_utilisateur;
		}

		// 3. Applique une condition de validation si existe.
		if (valeur && validation_fonction) {
			valeur = validation_fonction(valeur);
		}
	} while (
		// 4. On vérifie que la condition est correcte. On sort de cette boucle
		//    lorsque la valeur est une chaîne de caractères ou un nombre, ou
		//    lorsque l'utilisateur à appuyer sur le bouton ANNULER (= null).
		//    Sinon on revient au point 1. plus-haut...
		!(typeof valeur === "string" || typeof valeur === "number") &&
		!(valeur === null)
	);

	return valeur;
}

/**
 * Invite l'utilisateur à entrer un nombre entier ou décimal (nombre à virgule).
 *
 * Dans cette fonction que voyons-nous :
 *
 *  - Déclaration variable via let, const
 *  - Fonction anonyme/fléchée
 *  - Appel de fonction. Récupération de son retour.
 *  - Une conversion d'une chaine vers un nombre décimal
 *  - Condition if
 *  - Opérateur de comparaison <=, >=
 *  - Opérateur logique ||
 *
 * @param {String} instruction - Instruction à donner au prompt.
 * @returns {Number|null} Nombre converti choisi par l'utilisateur.
 */
function prompt_nombre(instruction) {
	/**
	 * Fonction de pré-validation de la saisie utilisateur.
	 */
	const valider_la_saisie = (chaine) => {
		// 1.1. on converti la chaîne entrée par l'utilisateur en nombre entier
		//    	ou décimal via la fonction native `Number()` ou `parseFloat()`.
		let n = Number.parseFloat(chaine);

		// 1.2. On vérifie que le nombre converti est valide, parce que la
		// 		conversion peut échouer. Par exemple lorsque la valeur de
		// 		l'utilisateur `nombre` vaut "abcd".
		//
		//if (Number.isNaN(nombre)) { // <- Pas encore vu.
		if (n <= 0 || n >= 0) {
			// 1.2.1. On retourne cette valeur à notre variable `nombre`
			// 		  plus-bas.
			return n;
		}

		// 1.3. On notifie l'utilisateur de son erreur.
		erreur("Il ne s'agit pas d'un nombre valide, recommencez...");
	};

	// 1. On demande à l'utilisateur d'entrer un nombre et on retourne ce
	//    nombre, validé depuis la fonction de validation ci-haut, à nos
	//    variables.
	return prompt_en_boucle(instruction, valider_la_saisie);
}

/**
 * Invite l'utilisateur à entrer un des opérateurs arithmétiques supportés.
 *
 * Les opérateurs supportés sont:
 *
 * - '*'
 * - '/'
 * - '+'
 * - '-'
 *
 * Dans cette fonction que voyons-nous :
 *
 *  - Déclaration variable via const
 *  - Fonction anonyme/fléchée
 *  - Appel de fonction. Récupération de son retour.
 *  - Condition if
 *  - Opérateur de comparaison ===
 *  - Opérateur logique ||
 *
 * @param {String} instruction - Instruction à donner au prompt.
 * @returns {String|null} L'opérateur arithmétique choisie par l'utilisateur.
 */
function prompt_operateur_arithmetique(instruction) {
	/**
	 * Valide la saisie utilisateur.
	 */
	const valider_la_saisie_utilisateur = (op) => {
		// 1.1. On entre dans cette condition s'il s'agit d'un opérateur
		// 		supporté.
		if (op === "*" || op === "/" || op === "+" || op === "-") {
			// On retourne la valeur à notre variable operateur.
			return op;
		}

		// 1.2. On notifie l'utilisateur de son erreur.
		erreur("L'opérateur est invalide, choisissez entre * / + ou -");
	};

	// 1. On demande à l'utilisateur d'entrer une valeur et on retourne cet
	//    opérateur à notre variable.
	return prompt_en_boucle(instruction, valider_la_saisie_utilisateur);
}

/**
 * Fonction d'événement utilisée lors du CLICK.
 *
 * Dans cette fonction que voyons-nous :
 *
 *  - Déclaration variable via let
 *  - Fonction anonyme/fléchée
 *  - Appel de fonction. Récupération de son retour.
 *  - Condition if
 *  - Opérateur de comparaison ===, !==
 *  - Opérateur logique ||
 *  - typeof
 *
 */
function evenement_lancer_calculatrice() {
	// 1. On demande le premier nombre à l'utilisateur. La valeur de retour de
	//    la fonction `prompt_nombre` est sauvegardée dans la variable
	//    `operande_gauche`.
	let operande_gauche = prompt_nombre(
		"Etape 1/3:\nQuel est le premier nombre",
	);

	// 1.1. On ne veut plus continuer le script si la valeur de l'opérande de
	// 		gauche est nulle.
	if (operande_gauche === null) {
		// 1.1.1. Annule l'opération.
		operation_annuler(1);
		return false;
	}

	// 2. On demande l'opérateur arithmétique à l'utilisateur. La valeur de
	//    retour de la fonction `prompt_operator` est sauvegardée dans la
	//    variable `operateur`.
	let operateur = prompt_operateur_arithmetique(
		"Étape 2/3:\nQuel est l'opérateur (*, /, +, -)",
	);

	// 2.1. On ne veut plus continuer le script si la valeur de l'opérateur est
	// 		fausse.
	if (operateur === null) {
		// 2.1.1. Annule l'opération.
		operation_annuler(2);
		return false;
	}

	// 3. On demande le second nombre à l'utilisateur. La valeur de retour de
	//    la fonction `prompt_nombre` est sauvegardée dans la variable
	//    `operande_droite`.
	let operande_droite = prompt_nombre(
		"Étape 3/3:\nQuel est le second nombre",
	);

	// 3.1. On ne veut plus continuer le script si la valeur de l'opérande de
	// 		droite est nulle.
	if (operande_droite === null) {
		// 3.1.1. Annule l'opération.
		operation_annuler(3);
		return false;
	}

	// 4. On fait le calcule des opérations.
	let resultat = calculer_operation(
		operande_gauche,
		operateur,
		operande_droite,
	);

	// 4.1. On entre dans condition si le resultat est une erreur.
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
 * Calcule l'opération de 2 opérandes données en fonction de l'opérateur donné.
 *
 * Dans cette fonction que voyons-nous :
 *
 *  - Déclaration variable via let
 *  - Switch case
 *  - Appel de fonction. Récupération de son retour.
 *
 * @param {Number} operande_gauche - Nombre de gauche d'une opération arithmétique.
 * @param {String} operateur - Symbole d'une opération arithmétique.
 * @param {Number} operande_droite - Nombre de droite d'une opération arithmétique.
 * @returns {String|Number} L'opération calculée ou une erreur.
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
 * Notifie l'utilisateur avec un message erreur.
 */
function erreur(message_erreur) {
	alert(`Erreur: ${message_erreur}`);
}

/**
 * Notifie l'utilisateur que la calculatrice en cours a été annulée.
 * @param {number} step 
 */
function operation_annuler(step) {
	alert(`L'opération a été annulée à l'étape ${step}.`);
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
