const PRENOMS = [
	"Adam","Alba","Alice","Alma","Ambre","Anna","Arthur","Asmae",
	"Benoit",
	"Carina","Clovis","Corina",
	"Emma","Erica",
	"Franck",
	"Désiré","Didier",
	"Gabriel",
	"Hélène",
	"Isaac",
	"Jade","James","Jean-Aimable","Jean-Marie","Jérémy","Josué","Jules","Julien",
	"Léo","Louis","Louise",
	"Maël","Malak","Maxime","Mike","Mohamed-Ali","Mona","Myriam",
	"Noah",
	"Olga",
	"Raphaël","Romy","Rose",
	"Say",
	"Timothy",
	"Zakaria",
];

const NOMS = [
	"A","B","C",
	"D","E","F",
	"G","H","I",
	"J","K","L",
	"M","N","O",
	"P","Q","R",
	"S","T","U",
	"V","W","X",
	"Y","Z"
];

const COURS = [
	"Administrateur système","Android Developper",
	"CSS",
	"DevOps",
	"Graphisme",
	"HelpDesk",
	"HTML",
	"Intelligence Artificielle","iOS Developper",
	"JavaScript",
	"Linux",
	"MacOs","Mobile Developer",
	"MySQL",
	"PHP",
	"Python",
	"Réseau",
	"Sécurité informatique","Système d'exploitation","Système embarqué",
	"Télécommunication",
	"Webdesigner","Webdeveloper","Windows",
];

/**
 * @param {number} val
 * @param {number} min
 * @param {number} max
 */
function minmax(val, min, max) {
	return Math.min(Math.max(min, val), max);
}

/**
 * @param {Array<unknown>} tableau
 */
function valeur_aléatoire(tableau) {
	let indice_aléatoire = Math.floor(Math.random() * tableau.length);
	let valeur = tableau[indice_aléatoire];
	return valeur;
}

function nom_prenom_aléatoire() {
	let prénom = valeur_aléatoire(PRENOMS);
	let nom = valeur_aléatoire(NOMS);
	return `${prénom} ${nom}.`;
}

function age_aléatoire() {
	return minmax(Math.floor(Math.random() * 50), 18, 50);
}

/**
 * @returns {Array<string>}
 */
function cours_aléatoire() {
	let nombre_aléatoire = minmax(Math.floor(Math.random() * 3), 1, 3);

	let cours = [];

	for (let i = 0; i < nombre_aléatoire; i++) {
		cours.push(valeur_aléatoire(COURS));
	}

	// @ts-expect-error
	return cours;
}

/**
 * @param {Array<Professeur>} professeurs
 * @returns {Array<Professeur>}
 */
function professeurs_aléatoire(professeurs) {
	let profs = [];

	for (let i = 0; i < 3; i++) {
		profs.push(valeur_aléatoire(professeurs));
	}

	// @ts-expect-error
	return profs;
}

class Personne {
	/**
	 * @param {string} nom - Nom de la personne
	 * @param {number} [age] - Âge de la personne
	 */
	constructor(nom, age) {
		this.nom = nom;
		if (age) {
			this.age = age;
		}
	}

	info() {
		if (this.age != null) {
			return { nom: this.nom, age: this.age };
		}

		return {
			nom: this.nom,
		};
	}
}

class Professeur extends Personne {
	/**
	 * @param {string} nom - Nom du professeur
	 * @param {string|Array<string>} postes - Un ou plusieurs postes du professeur
	 * @param {number} [age] - Âge du professeur (non requis)
	 */
	constructor(nom, postes, age) {
		super(nom, age);

		if (typeof postes === "string") {
			this.postes = [postes];
		} else {
			this.postes = postes;
		}
	}

	/**
	 * @returns {any}
	 */
	info() {
		return {
			info: super.info(),
			postes: this.postes,
		};
	}
}

class Stagiere extends Personne {
	/**
	 * @type {Array<Professeur>}
	 */

	professeurs = [];

	/**
	 * @param {string} nom
	 * @param {number} age
	 * @param {Array<string>|string} formation
	 */
	constructor(nom, age, formation) {
		super(nom, age);

		if (typeof formation === "string") {
			this.formations = [formation];
		} else {
			this.formations = formation;
		}
	}

	/**
	 * @param {Array<Professeur>} professeurs
	 */
	ajoute_professeurs(professeurs) {
		this.professeurs = professeurs;
	}

	/**
	 * @returns {any}
	 */
	info() {
		return {
			info: super.info(),
			formations: this.formations,
			professeurs: this.professeurs.map((p) => p.nom),
		};
	}
}

class Materiel {
	/**
	 * @param {string} nom
	 * @param {number} quantité
	 */
	constructor(nom, quantité) {
		this.name = nom;
		this.quantité = quantité;
	}

	info() {
		return { name: this.name, quantité: this.quantité };
	}
}

class CFITECH {
	/**
	 * @type {Array<Materiel>}
	 */
	materiels = [];

	/**
	 * @type {Array<Professeur>}
	 */
	professeurs = [];

	/**
	 * @type {Array<Stagiere>}
	 */
	stagieres = [];

	/**
	 * @param {Professeur} prof
	 */
	ajoute_professeur(prof) {
		this.professeurs.push(prof);
	}

	/**
	 * @param {Stagiere} stagiere
	 */
	ajoute_stagiere(stagiere) {
		this.stagieres.push(stagiere);
	}

	/**
	 * @param {Materiel} materiel
	 */
	ajoute_materiel(materiel) {
		this.materiels.push(materiel);
	}

	affiche_info() {
		console.table(this.materiels.map((m) => m.info()));
		console.table(this.professeurs.map((p) => p.info()));
		console.table(this.stagieres.map((s) => s.info()));
	}
}

let cfitech = new CFITECH();

// Matériel

let ordinateurs = new Materiel("Ordinateurs", 100);
let serveurs = new Materiel("Seveurs", 42);

cfitech.ajoute_materiel(ordinateurs);
cfitech.ajoute_materiel(serveurs);

// Professeurs

for (let i = 0; i < 10; i++) {
	let prof = new Professeur(nom_prenom_aléatoire(), cours_aléatoire());
	cfitech.ajoute_professeur(prof);
}

// Stagiaires

for (let i = 0; i < 30; i++) {
	let stagiere = new Stagiere(
		nom_prenom_aléatoire(),
		age_aléatoire(),
		cours_aléatoire()
	);
	stagiere.ajoute_professeurs(professeurs_aléatoire(cfitech.professeurs));
	cfitech.ajoute_stagiere(stagiere);
}

cfitech.affiche_info();
