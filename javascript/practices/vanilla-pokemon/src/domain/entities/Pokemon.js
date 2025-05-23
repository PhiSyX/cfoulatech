import { minmax } from "../../shared/helpers.js";

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
	#level;
	/**
	 * Les types d'un pokemon.
	 * @type {Array<string>}
	 */
	#types;

	// ----------- //
	// Constructor //
	// ----------- //

	/**
	 * @param {number} id
	 */
	constructor(id) {
		this.#id = id;
	}

	// --------------- //
	// Getter | Setter //
	// --------------- //

	getId() {
		return this.#id;
	}

	setName(fr, en) {
		this.#nameFR = fr;
		this.#nameEN = fr;
		if (en) {
			this.#nameEN = en;
		}
		return this;
	}

	getName(options = { lang: "fr" }) {
		if (options.lang === "en") {
			return this.#nameEN;
		}
		return this.#nameFR;
	}

	getAttacks() {
		return this.#attacks;
	}

	setAttacks(attacks) {
		this.#attacks = attacks;
		return this;
	}

	getHitPoints() {
		return this.#hp;
	}

	setMinHp(minHp) {
		this.#minHp = minHp;
		return this;
	}

	setHitPoints(hp) {
		this.#hp = hp;
		return this;
	}

	setMaxHp(maxHp) {
		this.#maxHp = maxHp;
		return this;
	}

	getLevel() {
		return this.#level;
	}

	setLevel(level) {
		this.#level = level;
		this.#hp = this.maxHealth();
		return this;
	}

	getTypes() {
		return this.#types;
	}

	setTypes(types) {
		this.#types = types;
		return this;
	}

	// ------- //
	// Méthode // -> Publique
	// ------- //

	maxHealth() {
		const minLevel = 5;
		const maxLevel = 100;
		if (this.#level < minLevel) return this.#minHp;
		if (this.#level > maxLevel) return this.#maxHp;
		const ratio = (this.#level - minLevel) / (maxLevel - minLevel);
		const hp = this.#minHp + ratio * (this.#maxHp - this.#minHp);
		if (Number.isNaN(hp)) return this.#minHp;
		return minmax(hp, this.#minHp, this.#maxHp);
	}

	isAlive() {
		return this.#hp > 0;
	}
}

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
