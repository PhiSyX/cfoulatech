class Personne {
	nom;
	email;

	constructor(nom, email) {
		this.nom = nom;
		this.email = email;
	}
}

class Formateur extends Personne {
	expertise;

	constructor(nom, email, expertise) {
		super(nom, email);
		this.expertise = expertise;
	}
}

class Stagiaire extends Personne {
	formation;

	constructor(nom, email, formation) {
		super(nom, email);
		this.formation = formation;
	}
}

class Materiel {
	nom;
	quantité;

	constructor(nom, quantité) {
		this.nom = nom;
		this.quantité = quantité;
	}
}

class FormationApp {
	#formateurs = [];
	#stagiaires = [];
	#matériels = [];
	#expertises = [
		"JavaScript",
		"PHP/MySQL",
		"HTML/CSS",
		"Réseau",
		"PC",
		"HelpDesk",
	];
	#formations = [
		"Web Développeur.se",
		"Helpdesk",
		"Technicien.ne Support PC/Réseaux",
	];
	#app;

	constructor(element) {
		this.#app = element;
		this.#mise_à_jour_du_rendu_html();
	}

	ajout_formateur(nom, email, expertise) {
		let formateur = new Formateur(nom, email, expertise);
		this.#formateurs.push(formateur);
		this.#mise_à_jour_du_rendu_html();
	}

	supprimer_formateur(email) {
		this.#formateurs = this.#formateurs.filter(
			(formateur) => formateur.email !== email
		);
		this.#mise_à_jour_du_rendu_html();
	}

	ajout_stagiaire(nom, email, formation) {
		let stagiaire = new Stagiaire(nom, email, formation);
		this.#stagiaires.push(stagiaire);
		this.#mise_à_jour_du_rendu_html();
	}

	supprimer_stagiaire(email) {
		this.#stagiaires = this.#stagiaires.filter(
			(stagiaire) => stagiaire.email !== email
		);
		this.#mise_à_jour_du_rendu_html();
	}

	ajout_matériel(nom, quantité) {
		let materiel_existant = this.#matériels.find(
			(materiel) => materiel.nom === nom
		);

		if (materiel_existant) {
			materiel_existant.quantité += quantité;
		} else {
			let materiel = new Materiel(nom, quantité);
			this.#matériels.push(materiel);
		}

		this.#mise_à_jour_du_rendu_html();
	}

	supprimer_materiel(nom, quantité) {
		if (quantité) {
			let materiel_existant = this.#matériels.find(
				(materiel) => materiel.nom === nom
			);

			materiel_existant.quantité -= Math.min(
				Math.max(0, quantité),
				materiel_existant.quantité
			);

			if (materiel_existant.quantité === 0) {
				this.#matériels = this.#matériels.filter(
					(materiel) => materiel.nom !== nom
				);
			}
		} else {
			this.#matériels = this.#matériels.filter(
				(materiel) => materiel.nom !== nom
			);
		}

		this.#mise_à_jour_du_rendu_html();
	}

	#créer_html_header() {
		return `
		<header role="heading">
			<div class="center">
				<h1 class="title">Formation</h1>
				<img src="../../../html-css/assets/me.jpg" alt="Admin Avatar" />
			</div>
		</header>
		`;
	}

	#créer_html_nav() {
		return `
		<nav role="navigation,tablist">
			<a id="formateurs-tab" href="#formateurs">Les formateurs</a>
			<a id="stagiaires-tab" href="#stagiaires">Les stagiaires</a>
			<a id="materiels-tab" href="#materiels">Le matériel</a>
		</nav>
		`;
	}

	#créer_html_section_formateurs() {
		let formateurs = this.#formateurs
			.map((formateur) => this.#créer_html_formateur(formateur))
			.join("");

		let expertises = `<select name="formateur-expertise">`;
		expertises += this.#expertises
			.map((expertise) => {
				return `<option value="${expertise}">${expertise}</option>`;
			})
			.join("");
		expertises += `</select>`;

		return `
		<section id="formateurs" aria-labelledby="formateurs-tab" role="tabpanel">
			<h1>Les formateurs</h1>

			<table>
				<thead>
					<tr>
						<td>Nom</td>
						<td>E-mail</td>
						<td>Expertise</td>
						<td>Actions</td>
					</tr>
				</thead>

				<tbody>
					<tr>
						<th><input name="formateur-nom" type="text" placeholder="Nom du formateur"></th>
						<th><input name="formateur-email" type="email" placeholder="Adresse mail"></th>
						<th>
							${expertises}
						</th>
						<th><button type="button" onclick="evenement_ajouter_formateur()">Ajouter</button></th>
					</tr>

					${formateurs}
				</tbody>
			</table>
		</section>
		`;
	}

	#créer_html_formateur(formateur) {
		return `
		<tr>
			<td class="formateur-nom">${formateur.nom}</td>
			<td class="formateur-email">${formateur.email}</td>
			<td class="formateur-expertise">${formateur.expertise}</td>
			<td>
				<button type="button" onclick="evenement_retirer_formateur('${formateur.email}')">
					Supprimer
				</button>
			</td>
		</tr>
		`;
	}

	#créer_html_section_stagiaires() {
		let stagiaires = this.#stagiaires
			.map((stagiaire) => this.#créer_html_stagiaire(stagiaire))
			.join("");

		let formations = `<select name="stagiaire-formation">`;
		formations += this.#formations
			.map((formation) => {
				return `<option value="${formation}">${formation}</option>`;
			})
			.join("");
		formations += `</select>`;

		return `
		<section id="stagiaires" aria-labelledby="stagiaires-tab" role="tabpanel">
			<h1>Les stagiaires</h1>

			<table>
				<thead>
					<tr>
						<td>Nom</td>
						<td>Email</td>
						<td>Formation</td>
						<td>Actions</td>
					</tr>
				</thead>

				<tbody>
					<tr>
						<th><input type="text" name="stagiaire-nom" placeholder="Nom du stagiaire"></th>
						<th><input type="text" name="stagiaire-email" placeholder="Adresse mail"></th>
						<th>${formations}</th>
						<th>
							<button type="button" onclick="evenement_ajouter_stagiaire()">
								Ajouter
							</button>
						</th>
					</tr>

					${stagiaires}
				</tbody>
			</table>
		</section>
		`;
	}

	#créer_html_stagiaire(stagiaire) {
		return `
		<tr>
			<td class="stagiaire-nom">${stagiaire.nom}</td>
			<td class="stagiaire-email">${stagiaire.email}</td>
			<td class="stagiaire-formation">${stagiaire.formation}</td>
			<td>
				<button type="button" onclick="evenement_retirer_stagiaire('${stagiaire.email}')">
					Supprimer
				</button>
			</td>
		</tr>
		`;
	}

	#créer_html_section_materiels() {
		let materiels = this.#matériels
			.map((materiel) => this.#créer_html_materiel(materiel))
			.join("");

		return `
		<section id="materiels" aria-labelledby="materiels-tab" role="tabpanel">
			<h1>Le matériel</h1>

			<table>
				<thead>
					<tr>
						<td>Nom</td>
						<td>Quantité</td>
						<td>Actions</td>
					</tr>
				</thead>

				<tbody>
					<tr>
						<th><input type="text" name="materiel-nom" placeholder="Nom du matériel"></th>
						<th><input type="number" name="materiel-quantité" step="5" placeholder="Quantité"></th>
						<th><button type="button" onclick="evenement_ajouter_materiel()">Ajouter</button></th>
					</tr>

					${materiels}
				</tbody>
			</table>
		</section>
		`;
	}

	#créer_html_materiel(materiel) {
		return `
		<tr>
			<td class="materiel-nom">${materiel.nom}</td>
			<td class="materiel-quantité">${materiel.quantité}</td>
			<td class="materiel-actions">
				<button type="button" onclick="evenement_retirer_materiel('${materiel.nom}')">
					Supprimer tout
				</button>

				<button type="button" onclick="evenement_retirer_materiel_quantité('${materiel.nom}')">
					Supprimer en quantité
				</button>
			</td>
		</tr>
		`;
	}

	#mise_à_jour_du_rendu_html() {
		let header = this.#créer_html_header();
		let nav = this.#créer_html_nav();

		let section_formateurs = this.#créer_html_section_formateurs();
		let section_stagiaires = this.#créer_html_section_stagiaires();
		let section_materiels = this.#créer_html_section_materiels();

		let html = `
		${header}
		${nav}

		<main>
			${section_formateurs}
			${section_stagiaires}
			${section_materiels}
		</main>
		`;

		this.#app.innerHTML = html;
	}
}

let app = new FormationApp(document.querySelector("#app"));

function evenement_ajout_formateur() {
	let input_nom = document.getElementsByName("formateur-nom")[0];
	let input_email = document.getElementsByName("formateur-email")[0];
	let input_expertise = document.getElementsByName("formateur-expertise")[0];

	if (!input_nom.value || !input_email.value || !input_expertise.value) {
		input_nom.className = "input-erreur";
		input_email.className = "input-erreur";
		input_expertise.className = "input-erreur";
		return;
	}

	input_nom.className = "";
	input_email.className = "";
	input_expertise.className = "";

	app.ajout_formateur(
		input_nom.value,
		input_email.value,
		input_expertise.value
	);
}

function evenement_retire_formateur(email) {
	app.supprimer_formateur(email);
}

function evenement_ajout_stagiaire() {
	let input_nom = document.getElementsByName("stagiaire-nom")[0];
	let input_email = document.getElementsByName("stagiaire-email")[0];
	let input_formation = document.getElementsByName("stagiaire-formation")[0];

	if (!input_nom.value || !input_email.value || !input_formation.value) {
		input_nom.className = "input-erreur";
		input_email.className = "input-erreur";
		input_formation.className = "input-erreur";
		return;
	}

	input_nom.className = "";
	input_email.className = "";
	input_formation.className = "";

	app.ajout_stagiaire(
		input_nom.value,
		input_email.value,
		input_formation.value
	);
}

function evenement_retire_stagiaire(email) {
	app.supprimer_stagiaire(email);
}

function evenement_ajout_materiel() {
	let input_nom = document.getElementsByName("materiel-nom")[0];
	let input_quantité = document.getElementsByName("materiel-quantité")[0];

	if (!input_nom.value || !input_quantité.valueAsNumber) {
		input_nom.className = "input-erreur";
		input_quantité.className = "input-erreur";
		return;
	}

	input_nom.className = "";
	input_quantité.className = "";

	app.ajout_matériel(input_nom.value, input_quantité.valueAsNumber);
}

function evenement_retire_materiel(nom) {
	app.supprimer_materiel(nom);
}
function evenement_retire_materiel_quantité(nom) {
	let n =
		Number.parseInt(
			prompt(`Combien voulez-vous supprimer ${nom} ?`) || "0",
			10
		) || 0;
	app.supprimer_materiel(nom, n);
}
