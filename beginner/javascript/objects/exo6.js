function random_id() {
	return `${Math.floor(Math.random() * 1_000_000)}`;
}

const MESSAGES_ATM = {
	/**
	 * @param {string} banque_nom
	 */
	banque_non_prise_en_charge: function (banque_nom) {
		return `[ATM]: La banque ${banque_nom} n'est pas prise en charge.`;
	},

	/**
	 * @param {string} banque_nom
	 */
	banque_non_reconnu: function (banque_nom) {
		return `[ATM]: Désolé, vous n'utilisez pas cette banque ${banque_nom}.`;
	},

	/**
	 * @param {Array<string>} banques_noms
	 */
	choisir_banque: function (banques_noms) {
		return `[ATM]: Quel est votre banque ? Choix possible: ${banques_noms}`;
	},

	demande_déposer_argent: function () {
		return "[ATM]: Combien d'argent voulez-vous ajouter à votre compte en banque?";
	},

	demande_retirer_argent: function () {
		return "[ATM]: Combien d'argent voulez-vous retirer de votre compte en banque?";
	},

	opération_annulée: function () {
		return `[ATM]: Opération annulée.`;
	},

	/**
	 * @param {string} individu_nom
	 * @param {string} banque_nom
	 */
	saisir_pin: function (individu_nom, banque_nom) {
		return `[ATM]: Bonjour ${individu_nom}, entrez le code pin de votre carte ${banque_nom}`;
	},
};

const MESSAGES_INDIVIDU = {
	/**
	 * @param {ReturnType<Individu["carte_identity"]["récupérer_nom_complet"]>} individu_nom
	 * @param {Banque["nom"]} banque_nom
	 * @param {Banque["adresse"]} banque_adresse
	 */
	aller_banque: function (individu_nom, banque_nom, banque_adresse) {
		return `[${individu_nom}]: direction la banque « ${banque_nom} » à l'adresse « ${banque_adresse} » !`;
	},

	/**
	 * @param {ReturnType<Individu["carte_identity"]["récupérer_nom_complet"]>} individu_nom
	 * @param {ATM["adresse"]} atm_adresse
	 */
	aller_atm: function (individu_nom, atm_adresse) {
		return `[${individu_nom}]: direction l'ATM à l'adresse « ${atm_adresse} » !`;
	},

	/**
	 * @param {ReturnType<Individu["carte_identity"]["récupérer_nom_complet"]>} individu_nom
	 * @param {Banque["nom"]} banque_nom
	 */
	carte_bancaire_introuvable: function (individu_nom, banque_nom) {
		return `[${individu_nom}]: Je ne possède pas de carte bancaire de la banque ${banque_nom}.`;
	},
};

const MESSAGES_BANQUES = {
	/**
	 * @param {Banque["nom"]} banque_nom
	 * @param {ReturnType<Individu["carte_identity"]["récupérer_nom_complet"]>} individu_nom
	 */
	identification_échouée: function (banque_nom, individu_nom) {
		return `[Banque ${banque_nom}]: Désolé « ${individu_nom} », mauvais code PIN.`;
	},

	/**
	 * @param {Banque["nom"]} banque_nom
	 * @param {ReturnType<Individu["carte_identity"]["récupérer_nom_complet"]>} individu_nom
	 */
	compte_introuvable: function (banque_nom, individu_nom) {
		return `[Banque ${banque_nom}]: Désolé « ${individu_nom} », vous n'êtes pas inscrit chez nous.`;
	},

	/**
	 * @param {Banque["nom"]} banque_nom
	 * @param {ReturnType<Individu["carte_identity"]["récupérer_nom_complet"]>} individu_nom
	 */
	inscription_échouée: function (banque_nom, individu_nom) {
		return `[Banque ${banque_nom}]: Hey « ${individu_nom} », vous êtes déjà inscrit chez nous.`;
	},

	/**
	 * @param {Banque["nom"]} banque_nom
	 * @param {ReturnType<Individu["carte_identity"]["récupérer_nom_complet"]>} individu_nom
	 */
	inscription_succès: function (banque_nom, individu_nom) {
		return `[Banque ${banque_nom}]: Bienvenue « ${individu_nom} », vous êtes maintenant inscrit chez nous.`;
	},

	/**
	 * @param {Banque["nom"]} banque_nom
	 * @param {ReturnType<Individu["carte_identity"]["récupérer_nom_complet"]>} individu_nom
	 * @param {number} montant
	 */
	paiement_déposé_succès: function (banque_nom, individu_nom, montant) {
		return `[Banque ${banque_nom}]: Hey « ${individu_nom} », vous avez ajouté ${montant}€ à votre compte.`;
	},

	/**
	 * @param {Banque["nom"]} banque_nom
	 * @param {ReturnType<Individu["carte_identity"]["récupérer_nom_complet"]>} individu_nom
	 * @param {number} montant
	 */
	retrait_argent_succès: function (banque_nom, individu_nom, montant) {
		return `[Banque ${banque_nom}]: Hey « ${individu_nom} », vous avez retiré ${montant}€ de votre compte.`;
	},

	/**
	 * @param {Banque["nom"]} banque_nom
	 */
	saisir_pin: function (banque_nom) {
		return `[${banque_nom}]: Inscription en cours: \n Choisissez un code PIN de carte bancaire (4 chiffres)`;
	},
};

// ---- //
// Plan //
// ---- //

class Banque {
	/**
	 * ID de la banque.
	 * @private
	 * @type {string}
	 */
	id;
	/**
	 * Nom de la banque.
	 * @private
	 * @type {string} nom
	 */
	nom;
	/**
	 * Adresse de la banque.
	 * @private
	 * @type {string} adresse
	 */
	adresse;

	/**
	 * Les comptes en banque de tous les clients.
	 * @private
	 * @type {Record<CarteBancaire["id"],{ carte: CarteBancaire, compte: CompteBancaire }>}
	 */
	comptes = {};

	/**
	 * @param {Banque["nom"]} nom
	 * @param {Banque["adresse"]} adresse
	 * @param {Banque["id"]} [banque_id=random_id()]
	 */
	constructor(nom, adresse, banque_id = random_id()) {
		this.nom = nom;
		this.adresse = adresse;
		this.id = banque_id;
	}

	/**
	 * @param {CarteID} carte_identité
	 */
	crée_carte_bancaire(carte_identité) {
		let code_pin;
		do {
			code_pin = prompt(MESSAGES_BANQUES.saisir_pin(this.nom));
		} while (code_pin == null || code_pin.length !== 4);

		let carte_bancaire = new CarteBancaire(carte_identité, this.id, code_pin);
		let compte_bancaire = new CompteBancaire(
			carte_bancaire.récupérer_banque_liée(),
			carte_bancaire.récupérer_id()
		);
		this.comptes[carte_bancaire.récupérer_id()] = {
			carte: carte_bancaire,
			compte: compte_bancaire,
		};
		return carte_bancaire;
	}

	/**
	 * @param {'+'|'-'} état
	 * @param {CompteBancaire} compte
	 * @param {CarteBancaire} de
	 * @param {number} montant
	 */
	effectuer_paiement(état, compte, de, montant) {
		if (état === "+") {
			if (compte.ajouter_argent(de.récupérer_id(), montant)) {
				alert(
					MESSAGES_BANQUES.paiement_déposé_succès(
						this.nom,
						de.récupérer_nom_complet(),
						montant
					)
				);
			}
		} else {
			if (compte.retirer_argent(de.récupérer_id(), montant)) {
				alert(
					MESSAGES_BANQUES.retrait_argent_succès(
						this.nom,
						de.récupérer_nom_complet(),
						montant
					)
				);
			}
		}
	}

	/**
	 * @param {CarteBancaire} carte_bancaire
	 * @param {string} code_pin
	 */
	identification(carte_bancaire, code_pin) {
		if (!carte_bancaire.comparer_pin(code_pin)) {
			alert(
				MESSAGES_BANQUES.identification_échouée(
					this.nom,
					carte_bancaire.récupérer_nom_complet()
				)
			);

			return;
		}

		let compte = this.récupérer_compte(carte_bancaire);
		if (!compte) {
			alert(
				MESSAGES_BANQUES.compte_introuvable(
					this.nom,
					carte_bancaire.récupérer_nom_complet()
				)
			);
			return null;
		}
		return compte;
	}

	/**
	 * @param {Individu} individu
	 */
	inscription(individu) {
		let carte_bancaire = individu.récupère_carte_bancaire(this.id);

		if (!carte_bancaire) {
			individu.ajouter_carte_bancaire(
				this.crée_carte_bancaire(individu.carte_identité())
			);

			alert(
				MESSAGES_BANQUES.inscription_succès(
					this.récupérer_nom(),
					individu.carte_identité().récupérer_nom_complet()
				)
			);

			return;
		}

		alert(
			MESSAGES_BANQUES.inscription_échouée(
				this.récupérer_nom(),
				individu.carte_identité().récupérer_nom_complet()
			)
		);
	}

	récupérer_adresse() {
		return this.adresse;
	}

	/**
	 * @param {CarteBancaire["id"]} carte_bancaire_id
	 */
	récupérer_carte_bancaire(carte_bancaire_id) {
		let cb_id = Object.keys(this.comptes).find(
			(cb_id) => cb_id === carte_bancaire_id
		);
		if (!cb_id) {
			return null;
		}
		return this.comptes[cb_id].carte;
	}

	/**
	 * @private
	 * @param {CarteBancaire} carte_bancaire
	 * @returns {{carte: CarteBancaire, compte: CompteBancaire}|null}
	 */
	récupérer_compte(carte_bancaire) {
		return this.comptes[carte_bancaire.récupérer_id()];
	}

	récupérer_id() {
		return this.id;
	}

	récupérer_nom() {
		return this.nom;
	}

	/**
	 * @param {CompteBancaire} compte
	 */
	récupérer_historique_transactions(compte) {
		let historique = [];

		for (let transaction of compte.récupérer_historique_transaction()) {
			let carte_bancaire = this.récupérer_carte_bancaire(transaction.de);

			historique.push({
				date: transaction.date,
				de: carte_bancaire?.récupérer_nom_complet(),
				montant: transaction.montant,
			});
		}

		return historique;
	}
}

class CarteBancaire {
	/**
	 * Numéro de la carte bancaire.
	 * @private
	 * @type {string}
	 */
	id;

	/**
	 * Banque liée à la carte bancaire
	 * @private
	 * @type {Banque["id"]}
	 */
	banque_link;

	/**
	 * Informations personnelles du détenteur de la carte bancaire
	 * @private
	 * @type {CarteID}
	 */
	info_personnelle;

	/**
	 * @private
	 * @type {string|null}
	 */
	pin;

	/**
	 * @param {CarteID} carte_identité
	 * @param {Banque["id"]} banque_id
	 * @param {CarteBancaire["pin"]} code_pin
	 * @param {CarteBancaire["id"]} [carte_bancaire_numéro=random_id()]
	 */
	constructor(
		carte_identité,
		banque_id,
		code_pin,
		carte_bancaire_numéro = random_id()
	) {
		this.info_personnelle = carte_identité;
		this.banque_link = banque_id;
		this.id = carte_bancaire_numéro;
		this.pin = code_pin;
	}

	/**
	 * @param {string} code_pin
	 */
	comparer_pin(code_pin) {
		return this.pin === code_pin;
	}

	récupérer_banque_liée() {
		return this.banque_link;
	}

	récupérer_id() {
		return this.id;
	}

	récupérer_nom_complet() {
		return this.info_personnelle.récupérer_nom_complet();
	}
}

class CompteBancaire {
	/**
	 * Argent total du compte bancaire
	 * @private
	 * @type {number}
	 */
	argent_total = 0;

	/**
	 * @private
	 * @type {Array<{ de: string; montant: string, date: Date }>}
	 */
	historique_transaction = [];

	/**
	 * Banque liée
	 * @private
	 * @type {Banque["id"]}
	 */
	banque_link;

	/**
	 * Carte Bancaire liée
	 * @private
	 * @type {CarteBancaire["id"]}
	 */
	carte_bancaire_link;

	/**
	 * @param {Banque["id"]} banque_id
	 * @param {CarteBancaire["id"]} carte_bancaire_id
	 */
	constructor(banque_id, carte_bancaire_id) {
		this.banque_link = banque_id;
		this.carte_bancaire_link = carte_bancaire_id;
	}

	/**
	 * @param {CarteBancaire["id"]} de
	 * @param {number} montant
	 */
	ajouter_argent(de, montant) {
		if (montant <= 0) {
			return false;
		}

		this.historique_transaction.push({
			de,
			montant: `+ ${montant}€`,
			date: new Date(),
		});
		this.argent_total += montant;
		return true;
	}

	/**
	 * @param {CarteBancaire["id"]} de
	 * @param {number} montant
	 */
	retirer_argent(de, montant) {
		if (montant <= 0) {
			return false;
		}

		if (montant < this.argent_total) {
			this.historique_transaction.push({
				de,
				montant: `- ${montant}€`,
				date: new Date(),
			});
			this.argent_total -= montant;
			return montant;
		}
		return false;
	}

	récupérer_historique_transaction() {
		return this.historique_transaction;
	}
}

class CarteID {
	/**
	 * Numéro de la carte d'identité.
	 * @private
	 * @type {string} id
	 */
	id;
	/**
	 * Nom de la carte d'identité.
	 * @private
	 * @type {string} nom
	 */
	nom;
	/**
	 * Prénom de la carte d'identité.
	 * @private
	 * @type {string} prenom
	 */
	prenom;
	/**
	 * Date de naissance inscrit de la carte identité.
	 * @private
	 * @type {Date}
	 */
	date_de_naissance;

	/**
	 * @param {CarteID["nom"]} nom
	 * @param {CarteID["prenom"]} prenom
	 * @param {CarteID["date_de_naissance"]} date_de_naissance
	 * @param {CarteID["id"]} [carte_id_numéro=random_id()]
	 */
	constructor(nom, prenom, date_de_naissance, carte_id_numéro = random_id()) {
		this.nom = nom;
		this.prenom = prenom;
		this.date_de_naissance = date_de_naissance;
		this.id = carte_id_numéro;
	}

	récupérer_nom_complet() {
		return `${this.nom} ${this.prenom}`;
	}
}

class Individu {
	/**
	 * @private
	 * @type {CarteID}
	 */
	carte_identity;

	/**
	 * @private
	 * @type {Record<Banque["id"],CarteBancaire>}
	 */
	cartes_bancaires = {};

	/**
	 * @param {CarteID["nom"]} nom
	 * @param {CarteID["prenom"]} prenom
	 * @param {CarteID["date_de_naissance"]} date_de_naissance
	 */
	constructor(nom, prenom, date_de_naissance) {
		this.carte_identity = new CarteID(nom, prenom, date_de_naissance);
		this.cartes_bancaires = {};
	}

	/**
	 * @param {ATM} atm
	 */
	aller_atm(atm) {
		let individu_nom = this.carte_identity.récupérer_nom_complet();
		let atm_adresse = atm.récupérer_adresse();
		alert(MESSAGES_INDIVIDU.aller_atm(individu_nom, atm_adresse));
		atm.initialisation(this);
		return atm;
	}

	/**
	 * @param {Banque} banque
	 */
	aller_banque(banque) {
		let individu_nom = this.carte_identity.récupérer_nom_complet();
		let banque_nom = banque.récupérer_nom();
		let banque_adresse = banque.récupérer_adresse();
		alert(
			MESSAGES_INDIVIDU.aller_banque(individu_nom, banque_nom, banque_adresse)
		);
	}

	/**
	 * @param {CarteBancaire} carte_bancaire
	 */
	ajouter_carte_bancaire(carte_bancaire) {
		this.cartes_bancaires[carte_bancaire.récupérer_banque_liée()] =
			carte_bancaire;
	}

	carte_identité() {
		return this.carte_identity;
	}

	/**
	 * @param {Banque} banque
	 */
	inscrire_banque(banque) {
		banque.inscription(this);
	}

	/**
	 * @param {Banque["id"]} banque_id
	 * @returns {CarteBancaire|null}
	 */
	récupère_carte_bancaire(banque_id) {
		return this.cartes_bancaires[banque_id];
	}
}

class ATM {
	/**
	 * @private
	 * @type {string}
	 */
	adresse;

	/**
	 * @private
	 * @type {Array<Banque>}
	 */
	banques_disponible = [];

	/**
	 * @private
	 * @type {Banque|undefined}
	 */
	banque_utilisée;

	/**
	 * @private
	 * @type {CarteBancaire|null}
	 */
	carte_bancaire_en_cours = null;

	/**
	 * @private
	 * @type {CompteBancaire|null}
	 */
	compte_bancaire_en_cours = null;

	/**
	 * @private
	 * @type {Individu|null}
	 */
	individu_en_cours = null;

	/**
	 * @param {ATM["adresse"]} adresse
	 * @param {ATM["banques_disponible"]} banques
	 */
	constructor(adresse, banques) {
		this.adresse = adresse;
		this.banques_disponible = banques;
	}

	afficher_historique_transactions() {
		if (
			!this.banque_utilisée ||
			!this.compte_bancaire_en_cours ||
			!this.carte_bancaire_en_cours ||
			!this.individu_en_cours
		) {
			return this;
		}

		console.table(
			this.banque_utilisée.récupérer_historique_transactions(
				this.compte_bancaire_en_cours
			)
		);

		return this;
	}

	prompt_déposer_argent() {
		if (
			!this.banque_utilisée ||
			!this.compte_bancaire_en_cours ||
			!this.carte_bancaire_en_cours
		) {
			return this;
		}

		let montant = prompt(MESSAGES_ATM.demande_déposer_argent());

		if (!montant) {
			alert(MESSAGES_ATM.opération_annulée());
			return this;
		}

		this.banque_utilisée.effectuer_paiement(
			"+",
			this.compte_bancaire_en_cours,
			this.carte_bancaire_en_cours,
			Number.parseFloat(montant)
		);

		return this;
	}

	prompt_retirer_argent() {
		if (
			!this.banque_utilisée ||
			!this.compte_bancaire_en_cours ||
			!this.carte_bancaire_en_cours
		) {
			return this;
		}

		let montant = prompt(MESSAGES_ATM.demande_retirer_argent());

		if (!montant) {
			alert(MESSAGES_ATM.opération_annulée());
			return this;
		}

		this.banque_utilisée.effectuer_paiement(
			"-",
			this.compte_bancaire_en_cours,
			this.carte_bancaire_en_cours,
			Number.parseFloat(montant)
		);
		return this;
	}

	se_déconnecter() {
		this.individu_en_cours = null;
		this.carte_bancaire_en_cours = null;
		this.compte_bancaire_en_cours = null;
	}

	/**
	 * @param {Individu} individu
	 */
	initialisation(individu) {
		let atm_banques = this.liste_banques_disponible();
		let atm_banques_noms = atm_banques.map((banque) => {
			return banque.récupérer_nom();
		});

		let banque_choisie = prompt(MESSAGES_ATM.choisir_banque(atm_banques_noms));

		if (!banque_choisie) {
			alert(MESSAGES_ATM.opération_annulée());
			return;
		}

		let atm_banque = atm_banques.find(
			(banque) =>
				banque.récupérer_nom().toLowerCase() === banque_choisie?.toLowerCase()
		);

		if (!atm_banque) {
			alert(MESSAGES_ATM.banque_non_prise_en_charge(banque_choisie));
			return;
		}

		let individu_carte_bancaire = individu.récupère_carte_bancaire(
			atm_banque.récupérer_id()
		);

		if (!individu_carte_bancaire) {
			alert(MESSAGES_ATM.banque_non_reconnu(atm_banque.récupérer_nom()));
			return;
		}

		let code_pin = "";
		do {
			let m_code_pin = prompt(
				MESSAGES_ATM.saisir_pin(
					individu.carte_identité().récupérer_nom_complet(),
					atm_banque.récupérer_nom()
				)
			);
			if (m_code_pin === null) {
				alert(MESSAGES_ATM.opération_annulée());
				return;
			}
			code_pin = m_code_pin;
		} while (code_pin.length !== 4);

		let { carte, compte } =
			atm_banque.identification(individu_carte_bancaire, code_pin) || {};

		this.banque_utilisée = atm_banque;
		this.carte_bancaire_en_cours = carte || null;
		this.compte_bancaire_en_cours = compte || null;
		this.individu_en_cours = individu;
	}

	liste_banques_disponible() {
		return this.banques_disponible;
	}

	récupérer_adresse() {
		return this.adresse;
	}
}

// -------------- //
// Implémentation //
// -------------- //

// Création de la banque
let axa_bank = new Banque(
	"Axa Bank",
	"Rue de la banque d'Axa, 222, 1000 Bruxelles"
);
let ing_bank = new Banque(
	"ING Bank",
	"Rue de la banque d'ING, 14, 1000 Bruxelles"
);

// Création d'une nouvelle carte d'identité.
let mike_s = new Individu("S.", "Mike", new Date("12-07-1991"));

// Inscription à la banque d'AXA
mike_s.aller_banque(axa_bank);
mike_s.inscrire_banque(axa_bank); // Succès
mike_s.inscrire_banque(axa_bank); // Erreur

// Création d'une ATM
let atm_koekelberg = new ATM("Rue de l'ATM, 19, 1081, Koekelberg", [
	axa_bank,
	ing_bank,
]);

mike_s
	.aller_atm(atm_koekelberg)
	.prompt_déposer_argent()
	.prompt_retirer_argent()
	.afficher_historique_transactions()
	.se_déconnecter();
