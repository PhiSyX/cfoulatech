import { minmax } from "../../shared/helpers.js";


/**
 * Les types de Pokemon's
 */
export const PokemonTypeEnum = {
	Acier: "acier",
	Eau: "eau",
	Combat: "combat",
	Dragon: "dragon",
	Electrik: "électrik",
	Fee: "fée",
	Feu: "feu",
	Glace: "glace",
	Insecte: "insecte",
	Normal: "normal",
	Plante: "plante",
	Poison: "poison",
	Psy: "psy",
	Roche: "roche",
	Sol: "sol",
	Spectre: "spectre",
	Tenebres: "ténèbres",
	Vol: "vol",
};

/**
 * Classe représentant un Pokemon.
 */
export class Pokemon {
	// --------- //
	// Propriété //
	// --------- //

	/**
	 * Identifiant du pokemon.
	 * @type {number}
	 */
	#id;
	/**
	 * Nom français du pokemon.
	 * @type {string}
	 */
	#nameFR;
	/**
	 * Nom anglais du pokemon.
	 * @type {string}
	 */
	#nameEN;
	/**
	 * Liste d'attaques (ID) du pokemon.
	 * @type {Array<number>}
	 */
	#attacks = [];
	/**
	 * Le minimum de points de vie d'un pokemon.
	 * @type {number}
	 */
	#minHp = 0;
	/**
	 * Les points de vie d'un pokemon.
	 * @type {number}
	 */
	#hp = 0;
	/**
	 * Le maximum de points de vie d'un pokemon.
	 * @type {number}
	 */
	#maxHp = 0;
	/**
	 * Le niveau d'un pokemon.
	 * @type {number}
	 */
	#level = 5;
	/**
	 * Les types d'un pokemon.
	 * @type {Array<string>}
	 */
	#types = [];

	// ----------- //
	// Constructor //
	// ----------- //

	/**
	 * Construit l'entité Pokemon
	 * @param {number} id
	 */
	constructor(id) {
		this.#id = id;
	}

	// --------------- //
	// Getter | Setter //
	// --------------- //

	/**
	 * ID du Pokemon.
	 * @returns {number}
	 */
	getId() {
		return this.#id;
	}

	/**
	 * Défini le nom du Pokemon.
	 * @param {string} fr
	 * @param {string} [en]
	 * @returns {Pokemon}
	 */
	setName(fr, en) {
		this.#nameFR = fr;
		this.#nameEN = fr;
		if (en) {
			this.#nameEN = en;
		}
		return this;
	}

	/**
	 * Récupère le nom français ou anglais du Pokemon.
	 * @param {{lang:"fr"|"en"}} options
	 * @returns {string}
	 */
	getName(options = { lang: "fr" }) {
		if (options.lang === "en") {
			return this.#nameEN;
		}
		return this.#nameFR;
	}

	/**
	 * Les attaques (IDs) du Pokemon.
	 * @returns {Array<number>}
	 */
	getAttacks() {
		return this.#attacks;
	}

	/**
	 * Défini les attaques (ID) du pokemon.
	 * @param {Array<number>} attacks
	 * @returns {Pokemon}
	 */
	setAttacks(attacks) {
		this.#attacks = attacks;
		return this;
	}

	/**
	 * Les points de vie du Pokemon.
	 * @returns {number}
	 */
	getHitPoints() {
		return this.#hp;
	}

	/**
	 * Défini les points de vie minimale du Pokemon.
	 * @param {number} minHp
	 * @returns {Pokemon}
	 */
	setMinHp(minHp) {
		this.#minHp = minHp;
		return this;
	}

	/**
	 * Défini les points de vie du Pokemon.
	 * @param {number} hp
	 * @returns {Pokemon}
	 */
	setHitPoints(hp) {
		this.#hp = hp;
		return this;
	}

	/**
	 * Défini les points de vie maximale du Pokemon.
	 * @param {number} maxHp
	 * @returns {Pokemon}
	 */
	setMaxHp(maxHp) {
		this.#maxHp = maxHp;
		return this;
	}

	/**
	 * Le niveau du Pokemon.
	 * @returns {number}
	 */
	getLevel() {
		return this.#level;
	}

	/**
	 * Défini le niveau du Pokemon.
	 * @param {number} level
	 * @returns {Pokemon}
	 */
	setLevel(level) {
		this.#level = level;
		this.#hp = this.maxHealth();
		return this;
	}

	/**
	 * Les types du Pokemon.
	 * @returns {Array<string>}
	 */
	getTypes() {
		return this.#types;
	}

	/**
	 * Défini les types du Pokemon.
	 * @param {Array<string>} types
	 * @returns {Pokemon}
	 */
	setTypes(types) {
		this.#types = types;
		return this;
	}

	// ------- //
	// Méthode // → Publique
	// ------- //

	/**
	 * Calcule la santé maximale du Pokemon en fonction du niveau et des points de vie min et max.
	 * @returns {number}
	 */
	maxHealth() {
		const minLevel = 5;
		const maxLevel = 100;
		if (this.#level < minLevel) {
			return this.#minHp;
		}
		if (this.#level > maxLevel) {
			return this.#maxHp;
		}
		const ratio = (this.#level - minLevel) / (maxLevel - minLevel);
		const hp = (this.#minHp + ratio * (this.#maxHp - this.#minHp)) || this.#minHp;
		return minmax(hp, this.#minHp, this.#maxHp);
	}

	/**
	 * Vérifie si le Pokemon est toujours en vie.
	 * @returns {boolean}
	 */
	isAlive() {
		return this.#hp > 0;
	}
}
