import { PokemonAttack } from "../entities/PokemonAttack.js";
import { BadFighterAttackError } from "../errors/BadFighterAttackError.js";
import { FighterNotAliveError } from "../errors/FighterNotAliveError.js";

/**
 * Action d'attaque d'un pokemon
 */
export class ToAttackPokemon {
	// --------- //
	// Propriété //
	// --------- //
	/**
	 * Magasin de données lié à un combat.
	 * @type {GameStoreContract}
	 */
	#gameStore;
	/**
	 * Magasin de données lié au Pokedex.
	 * @type {PokedexStoreContract}
	 */
	#pokedexStore;
	/**
	 * Magasin de données lié aux attaques.
	 * @type {AttackStoreContract}
	 */
	#attackStore;

	// ----------- //
	// Constructor //
	// ----------- //

	/**
	 * Construit l'action ToAttackPokemon
	 * @param {GameStoreContract} gameStore
	 * @param {PokedexStoreContract} pokedexStore
	 * @param {AttackStoreContract} attackStore
	 */
	constructor(gameStore, pokedexStore, attackStore) {
		this.#gameStore = gameStore;
		this.#pokedexStore = pokedexStore;
		this.#attackStore = attackStore;
	}

	// ------- //
	// Méthode // → Publique
	// ------- //

	/**
	 * Execute l'action.
	 * @param {Input} input
	 * @throws {FighterNotAliveError}
	 * @returns {Output}
	 */
	execute({ attackerName, defenderName, attackName }) {
		if ( ! this.#gameStore.check(attackerName, defenderName)) {
			throw new BadFighterAttackError(attackerName);
		}

		let attacker = this.#pokedexStore.findByName(attackerName);
		if (!attacker.isAlive()) {
			throw new FighterNotAliveError(attackerName);
		}
		let attack = this.#attackStore.findByName(attackName, attacker.getAttacks());
		let defender = this.#pokedexStore.findByName(defenderName);
		if (!defender.isAlive()) {
			throw new FighterNotAliveError(defenderName);
		}
		let power = attack.calcPower(attacker, defender);
		this.#pokedexStore.updateHitPoints(defender.getId(), defender.getHitPoints() - power);

		let pokemonAttack = new PokemonAttack(attacker, attack);
		this.#gameStore.addHistory(pokemonAttack, defender);

		return { attacker: pokemonAttack, defender };
	}
}


/**
 * @typedef {import("../entities/Pokemon.js").Pokemon} Pokemon
 * @typedef {import("../entities/Attack.js").Attack} Attack
 *
 * @typedef {{
 * 		addHistory(attacker:PokemonAttack, defender:Pokemon): void;
 * 		check(attackerName: string, defenderName: string): boolean;
 * }} GameStoreContract
 *
 * @typedef {{
 * 		findByName(name: string): Pokemon;
 * 		updateHitPoints(id: number, hp: number): void;
 * }} PokedexStoreContract
 *
 * @typedef {{
 * 		findByName(name: string, attacks_ids?: Array<number>): Attack;
 * }} AttackStoreContract
 *
 * @typedef {{attackerName: string; defenderName: string; attackName: string;}} Input
 * @typedef {{attacker: PokemonAttack; defender: Pokemon;}} Output
 */
