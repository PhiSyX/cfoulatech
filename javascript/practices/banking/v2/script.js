// 1) Initialise mon argent à 100€. Il s'agit de la valeur par défaut.
//    Cette valeur se mettra à jour au fur et à mesure des actions
//    effectuées de l'utilisateur.
let mon_argent = 100;

/**
 * 2) Création d'une fonction de mise à jour du solde de l'élément HTML
 *    `<output name="solde">`.
 */

/**
 * @param {number} nouveau_solde
 */
function modifier_solde_dans_html(nouveau_solde) {
	// 2.1) Récupération de l'élément OUTPUT via l'attribut `name` avec
	//      comme nom "solde".
	let elements_outputs = document.getElementsByName("solde");
	let element_solde = elements_outputs[0];

	// 2.2) Met à jour le solde actuel par un nouveau solde.
	element_solde.value = `${nouveau_solde}€`;
}

// 3) La valeur qui DOIT être affiché lors de l'initialisation du script
//    est la valeur de `mon_argent`.
modifier_solde_dans_html(mon_argent);

/**
 * 4) Fonction pour l'événement CLICK qui est appelé par le bouton
 *    "Déposer".
 */
export function evenement_deposer_argent() {
	// 4.1) Récupération de l'élément INPUT via l'attribut `name` avec
	//      comme nom "montant".
	let element_inputs = document.getElementsByName("montant");
	let premier_element_input = element_inputs[0];

	// 4.2) Récupération de la valeur de l'input.
	// 4.3) Conversion de la valeur de l'input en nombre float, parce
	//      que de base, la valeur s'agit d'une chaîne de caractères.
	//let montant_utilisateur = Number.parseFloat(premier_element_input.value);
	// ^^^ vvv = SAME SAME
	let montant_utilisateur = premier_element_input.valueAsNumber;

	// NOTE: La conversion du point `4.3` PEUT échouer.
	//
	// 4.4) Vérification du montant entré par l'utilisateur qu'il
	//      s'agisse bien d'un nombre valide.
	if (Number.isNaN(montant_utilisateur)) {
		notifier("erreur", "Il ne s'agit pas d'un nombre, recommencez...");
		return;
	}

	// 4.5) Vérification du montant de l'utilisateur qui soit bien
	//      supérieur à 0.
	if (montant_utilisateur <= 0) {
		notifier("erreur", "Veuillez entrer un montant d'au moins 0.5€");
		return;
	}

	// Et si tout s'est bien passé...

	// 4.6) Modification de la valeur de ma variable `mon_argent` pour
	//      ajouter le montant entré par l'utilisateur. Via l'opérateur
	//      d'affection d'addition `+=`.
	mon_argent += montant_utilisateur;

	// 4.7) Modification de l'HTML pour réactualiser le solde.
	modifier_solde_dans_html(mon_argent);

	// 4.8) Notifie l'utilisateur que le montant a bien été ajouté au solde.
	notifier(
		"succès",
		`Le montant de <strong>${montant_utilisateur}€</strong>` +
			` a bien été déposé à votre compte avec succès.`,
	);
}

/**
 * 5. Fonction pour l'événement CLICK qui est appelé par le bouton
 *    "Retirer".
 */
export function evenement_retirer_argent() {
	// 5.1) Récupération de l'élément INPUT via l'attribut `name` avec
	//      comme nom "montant".
	let element_inputs = document.getElementsByName("montant");
	let premier_element_input = element_inputs[0];

	// 5.2) Récupération de la valeur de l'input.
	// 5.3) Conversion de la valeur de l'input en nombre float, parce
	//      que de base, la valeur s'agit d'une chaîne de caractères.
	//let montant_utilisateur = Number.parseFloat(premier_element_input.value);
	// ^^^ vvv = SAME SAME
	let montant_utilisateur = premier_element_input.valueAsNumber;

	// NOTE: La conversion du point 5.3 PEUT échouer.
	//
	// 5.4) Vérification du montant entré par l'utilisateur qu'il
	//      s'agisse bien d'un nombre valide.
	if (Number.isNaN(montant_utilisateur)) {
		notifier("erreur", "Il ne s'agit pas d'un nombre, recommencez...");
		return;
	}

	// 5.5) Vérification du montant de l'utilisateur qui soit bien
	//      supérieur à 0.
	if (montant_utilisateur <= 0) {
		notifier("erreur", "Veuillez entrer un montant d'au moins 0.5€");
		return;
	}

	// 5.6) Effectue une opération arithmétique de soustraction.
	let solde_temporaire = mon_argent - montant_utilisateur;

	// 5.7) Vérification du solde.
	if (solde_temporaire < 0) {
		// NOTE: Valeur absolue, ex: -200 => 200
		let difference = Math.abs(solde_temporaire);

		notifier(
			"erreur",
			`Le solde actuel du compte est de ${mon_argent}€. <br>` +
				`Il vous manque ${difference}€ pour retirer ${montant_utilisateur}€. <br>` +
				`Veuillez ajouter de l'argent à votre compte !`,
		);
		return;
	}

	// Et si tout s'est bien passé...

	// 5.8) Modification de la valeur de ma variable `mon_argent` pour
	//      lui affecter le solde temporaire.
	mon_argent = solde_temporaire;
	// 5.9) Modification de l'HTML pour réactualiser le solde.
	modifier_solde_dans_html(mon_argent);

	// 5.10) Notifie l'utilisateur que le montant a bien été retiré du
	//       solde.
	notifier(
		"succès",
		`Le montant de <strong>${montant_utilisateur}€</strong>` +
			` a bien été retiré avec succès de votre compte.`,
	);
}

/**
 * 6. Fonction de mise à jour de la section message d'erreur ou de succès.
 */
function notifier(type, message) {
	// 6.1) Récupération de l'élément SECTION via son ID.
	let element_message = document.querySelector("#js-message");

	// 6.2) Récupération de l'élément INPUT via son nom.
	let element_montants = document.getElementsByName("montant");
	let element_montant = element_montants[0];

	// 6.3) Mise à jour du message d'erreur, grâce à la modification de
	//      la propriété `innerHTML`.
	element_message.innerHTML = `<p class="${type}">${message}</p>`;

	// 6.4) J'efface la valeur de l'input pour qu'il n'y ait plus le
	//       montant de l'utilisateur dans le champ, grâce à la
	//       modification de la propriété `value`.
	element_montant.value = "";
}
