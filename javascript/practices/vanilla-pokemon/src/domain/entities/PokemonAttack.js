export class PokemonAttack {
	/**
	 * @type {Pokemon}
	 */
	#pokemon;
	/**
	 * @type {Attack}
	 */
	#attack;

	// ----------- //
	// Constructor //
	// ----------- //

	/**
	 * @param {Pokemon} pokemon
	 * @param {Attack} attack
	 */
	constructor(pokemon, attack) {
		this.#pokemon = pokemon;
		this.#attack = attack;
	}

	// --------------- //
	// Getter | Setter //
	// --------------- //

	getAttack() {
		return this.#attack;
	}

	getPokemon() {
		return this.#pokemon;
	}

	getPokemonName() {
		return this.#pokemon.getName();
	}

	getAttackName() {
		return this.#attack.getName();
	}
}

/**
 * @typedef {import("./Pokemon.js").Pokemon} Pokemon
 * @typedef {import("./Attack.js").Attack}Attack
 */
