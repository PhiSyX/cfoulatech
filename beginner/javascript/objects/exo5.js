class Personne {
	/**
	 * Nom de la personne.
	 * @type {string}
	 */
	nom;

	/**
	 * Âge de la personne.
	 * @type {number|undefined}
	 */
	age;

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

	/**
	 * Retourne les informations de la personne à partir des propriétés sous
	 * forme d'objet
	 */
	info() {
		if (this.age !== undefined) {
			return {
				nom: this.nom,
				age: this.age,
			};
		}

		return {
			nom: this.nom,
		};
	}
}

/**
 * Classe Professeur qui étend de Personne.
 *
 * Elle représente un professeur.
 */
class Professeur extends Personne {
	/**
	 * Les cours donnés par le professeur.
	 *
	 * Cette propriété est modifiée lorsque le constructeur est appelé, elle
	 * n'aura plus la valeur d'un tableau vide.
	 *
	 * @type {Array<string>}
	 */
	cours = [];

	/**
	 * Construit un Professeur.
	 *
	 * @param {string} nom - Nom du professeur
	 * @param {string|Array<string>} cours - Un ou plusieurs cours du professeur
	 */
	constructor(nom, cours) {
		super(nom);

		if (typeof cours === "string") {
			this.cours = [cours];
		} else {
			this.cours = cours;
		}
	}

	/**
	 * Retourne les informations de la personne sous forme d'objet
	 * @returns {*}
	 */
	info() {
		return {
			info: super.info(),
			cours: this.cours,
		};
	}
}

/**
 * Classe Stagiaire qui étend de Personne.
 *
 * Elle représente un stagiaire.
 */
class Stagiaire extends Personne {
	/**
	 * Les professeurs que le stagiaires au cours de sa formation.
	 * @type {Array<Professeur>}
	 */
	professeurs = [];

	/**
	 * Les cours que le stagiaire va avoir tout au long de sa formation.
	 * @type {Array<string>}
	 */
	cours = [];

	/**
     * Définis un ou plusieurs cours pour le stagiaire
	 * @param {Array<string>|string} cours - Un ou plusieurs cours
	 */
	définis_cours(cours) {
		if (typeof cours === "string") {
			this.cours = [cours];
		} else {
			this.cours = cours;
		}
	}

	/**
	 * Définis les professeurs du stagiaire.
	 * @param {Array<Professeur>} professeurs
	 */
	définis_professeurs(professeurs) {
		this.professeurs = professeurs;
	}

	/**
	 * @returns {any}
	 */
	info() {
		return {
			info: super.info(),
			formations: this.cours,
			professeurs: this.professeurs.map((p) => p.nom),
		};
	}
}

class Materiel {
	/**
	 * Nom du matériel.
	 * @type {string}
	 */
	nom;

	/**
	 * Quantité du matériel.
	 * @type {number}
	 */
	quantité;

	/**
	 * Construit la classe Materiel.
	 * @param {string} nom - Nom du matériel
	 * @param {number} quantité - Quantité du matériel
	 */
	constructor(nom, quantité) {
		this.nom = nom;
		this.quantité = quantité;
	}

	info() {
		return {
			nom: this.nom,
			quantité: this.quantité,
		};
	}
}

/**
 * Entité CFITECH
 */
class CFITECH {
	/**
	 * Le matériel du CFITECH
	 * @type {Array<Materiel>}
	 */
	materiels = [];

	/**
	 * Les professeurs du CFITECH
	 * @type {Array<Professeur>}
	 */
	professeurs = [];

	/**
	 * Les stagiaires du CFITECH
	 * @type {Array<Stagiaire>}
	 */
	stagiaires = [];

	/**
	 * Ajoute un professeur du CFITECH
	 * @param {Professeur} prof
	 */
	ajoute_professeur(prof) {
		this.professeurs.push(prof);
	}

	/**
	 * Ajoute un stagiaire du CFITECH
	 * @param {Stagiaire} stagiaire
	 */
	ajoute_stagiaire(stagiaire) {
		this.stagiaires.push(stagiaire);
	}

	/**
	 * Ajoute un matériel du CFITECH
	 * @param {Materiel} materiel
	 */
	ajoute_materiel(materiel) {
		this.materiels.push(materiel);
	}

	/**
	 * Affiche les informations concernant le matériel, les professeurs et les
	 * stagiaires du CFITECH.
	 */
	affiche_info() {
        // Création d'une fonction anonyme disponible uniquement dans la
        // méthode `affiche_info`.
        const affiche_espacement = () => {
            console.log("      ");
            console.log("      ");
            console.log("------");
            console.log("      ");
            console.log("      ");
        }

        // Récupère le total de chaque tableau des entités Matériels,
        // Professeurs, et Stagiaires.
		let total_du_materiels = this.materiels.length;
		let total_des_professeurs = this.professeurs.length;
		let total_des_stagiaires = this.stagiaires.length;

		affiche_espacement();

        // Affichage sous forme de tableau des toutes les entités.

		console.log(`Le matériel (${total_du_materiels}) du centre CFITECH: `);
		for (const materiel of this.materiels) {
			console.table([materiel.info()]);
		}

		affiche_espacement();

		console.log(
			`Les professeurs (${total_des_professeurs}) du centre CFITECH: `
		);
		for (const professeur of this.professeurs) {
			console.table([professeur.info()]);
		}

		affiche_espacement();

		console.log(
			`Les stagiaires (${total_des_stagiaires}) du centre CFITECH: `
		);
		for (const stagiaire of this.stagiaires) {
			console.table([stagiaire.info()]);
		}
	}
}

// --------------------------------- //
// 1. Construction de classe CFITECH // -> Les étapes:
// --------------------------------- //

// 1.1) la variable `cfitech` contient maintenant une instance de la classe `CFITECH`.
let cfitech = new CFITECH();

// ----------------------------------- //
// 2. Création du matériels du CFITECH // -> Les étapes:
// ----------------------------------- //

    // 2.1) Création des entités Materiel
    let ordinateurs = new Materiel("Ordinateurs", 100);
    let écrans = new Materiel("Ecrans", 150);

    // 2.2) Ajout des entités précédemment crées à la variable `cfitech` qui est
    // une instance de CFITECH.
    cfitech.ajoute_materiel(ordinateurs);
    cfitech.ajoute_materiel(écrans);

// -------------------------------------- //
// 3. Création des professeurs du CFITECH // -> Les étapes:
// -------------------------------------- //

    // 3.1) Création des entités Professeur

    let prof_jean_aimable = new Professeur("Jean Aimable", "JavaScript");
    let prof_julien = new Professeur("Julien", ["PHP", "MySQL"]);
    let prof_benoît = new Professeur("Benoit", ["HTML", "CSS"]);

    // 3.2) Ajout des entités précédemment crées à la variable `cfitech` qui est
    // une instance de CFITECH.

    cfitech.ajoute_professeur(prof_jean_aimable);
    cfitech.ajoute_professeur(prof_julien);
    cfitech.ajoute_professeur(prof_benoît);

// -------------------------- //
// 4. Création des stagiaires // -> Les étapes:
// -------------------------- //

    // 4.1) Je crée une liste d'objet contenant les informations des stagiaires.
    let stagiaires = [
        {
            nom: "Mike S.",
            age: 24,
            cours: ["JavaScript", "PHP/MYSQL", "HTML/CSS"],
            professeurs: [prof_jean_aimable, prof_julien, prof_benoît],
        },

        {
            nom: "Jeremy X.",
            age: 18,
            cours: ["PHP/MYSQL", "HTML/CSS"],
            professeurs: [prof_julien, prof_benoît],
        },

        {
            nom: "John D.",
            age: 36,
            cours: "HTML/CSS",
            professeurs: [prof_benoît],
        },
    ];

    // 4.2) Parcours du tableau des stagiaires. 
    //
    // La boucle `for ... of ...` s'agit d'une boucle "POUR CHAQUE".
    // L'équivalent d'une boucle `foreach` en PHP.
    for (let stagiaire of stagiaires) {
        // 4.2.1) Création de l'entité Stagiaire
        let stagiaire_instance = new Stagiaire(stagiaire.nom, stagiaire.age);
        stagiaire_instance.définis_cours(stagiaire.cours);
        stagiaire_instance.définis_professeurs(stagiaire.professeurs);

        // 4.2.2) Ajout de entité Stagiaire précédement crée à la variable
        // `cfitech` qui est une instance de CFITECH.
        cfitech.ajoute_stagiaire(stagiaire_instance);
    }

// ----------------------------- //
// 5. Affichage des informations // -> Les étapes:
// ----------------------------- //
    
    cfitech.affiche_info();
