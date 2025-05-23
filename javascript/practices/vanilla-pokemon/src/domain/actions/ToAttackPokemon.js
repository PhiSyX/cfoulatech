import { FighterNotAliveError } from "../errors/FighterNotAliveError.js";

/**
 * Action d'attaque d'un pokemon
 */
export class ToAttackPokemon {
	// --------- //
	// Propriété //
	// --------- //

	/**
	 * Magasin de données liés au Pokedex.
	 * @type {PokedexStore}
	 */
	#pokedexStore;
	/**
	 * Magasin de données liés aux attaques.
	 * @type {AttackStore}
	 */
	#attackStore;

	// ------- //
	// Méthode // -> Publique
	// ------- //

	/**
	 * @param {PokedexStore} pokedexStore
	 * @param {AttackStore} attackStore
	 */
	constructor(pokedexStore, attackStore) {
		this.#pokedexStore = pokedexStore;
		this.#attackStore = attackStore;
	}

	// ------- //
	// Méthode // -> Publique
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
		return { attack, attacker, defender };
	}
}


/**
 * @typedef {import("../entities/Pokemon.js").Pokemon} Pokemon
 * @typedef {import("../entities/Attack.js").Attack}Attack
 *
 * @typedef {{findByName(name: string): Pokemon; updateHitPoints(id: number, hp: number): void;}} PokedexStore
 * @typedef {{findByName(name: string, attacks_ids: Array<number>): Attack;}} AttackStore
 *
 * @typedef {{attackerName: string; defenderName: string; attackName: string;}} Input
 * @typedef {{attack: Attack; attacker: Pokemon; defender: Pokemon;}} Output
 */
