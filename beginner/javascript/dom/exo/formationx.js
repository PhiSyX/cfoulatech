function evenement_ajouter_formateur() {
	evenement_ajout_formateur();

	document.querySelector("#formateurs")?.scrollIntoView({
		behavior: "instant",
	});
}

function evenement_ajouter_stagiaire() {
	evenement_ajout_stagiaire();

	document.querySelector("#stagiaires")?.scrollIntoView({
		behavior: "instant",
	});
}

function evenement_ajouter_materiel() {
	evenement_ajout_materiel();

	document.querySelector("#materiels")?.scrollIntoView({
		behavior: "instant",
	});
}

function evenement_retirer_formateur(...args) {
	evenement_retire_formateur(...args);

	document.querySelector("#formateurs")?.scrollIntoView({
		behavior: "instant",
	});
}

function evenement_retirer_stagiaire(...args) {
	evenement_retire_stagiaire(...args);

	document.querySelector("#stagiaires")?.scrollIntoView({
		behavior: "instant",
	});
}

function evenement_retirer_materiel(...args) {
	evenement_retire_materiel(...args);

	document.querySelector("#materiels")?.scrollIntoView({
		behavior: "instant",
	});
}

function evenement_retirer_materiel_quantité(...args) {
	evenement_retire_materiel_quantité(...args);

	document.querySelector("#materiels")?.scrollIntoView({
		behavior: "instant",
	});
}
