import { PokemonAttack } from "../entities/PokemonAttack.js";
import { FighterNotAliveError } from "../errors/FighterNotAliveError.js";

/**
 * Action d'attaque d'un pokemon
 */
export class ToAttackPokemon {
	// --------- //
	// Propriété //
	// --------- //

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
	 * @param {PokedexStoreContract} pokedexStore
	 * @param {AttackStoreContract} attackStore
	 */
	constructor(pokedexStore, attackStore) {
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
		return { attacker: new PokemonAttack(attacker, attack), defender };
	}
}


/**
 * @typedef {import("../entities/Pokemon.js").Pokemon} Pokemon
 * @typedef {import("../entities/Attack.js").Attack} Attack
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
