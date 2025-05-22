import { randomArray } from "../shared/helpers.js";
import { ToAttackPokemon } from "./actions/ToAttackPokemon.js";
import { PokemonAttack } from "./entities/PokemonAttack.js";
import { BadFighterAttackError } from "./errors/BadFighterAttackError.js";

const ATTACK_AFTER = 4_500;

export class GameBattle {
	// --------- //
	// Propriété //
	// --------- //

	/**
	 * @type {PokedexStore}
	 */
	#pokedexStore;
	/**
	 * @type {AttackStore}
	 */
	#attackStore;
	/**
	 * @type {[p1: string, p2: string]|null}
	 */
	#orderFighters = null;
	#history = [];

	// ----------- //
	// Constructor //
	// ----------- //

	constructor(pokedexStore, attackStore) {
		this.#pokedexStore = pokedexStore;
		this.#attackStore = attackStore;
	}

	// --------------- //
	// Getter | Setter //
	// --------------- //

	getHistory() {
		return this.#history;
	}

	// ------- //
	// Méthode // -> Publique
	// ------- //

	/**
	 * Attaque un défenseur.
	 * @param {string} attackerName
	 * @param {string} defenderName
	 * @param {string} attackName
	 */
	attack(attackerName, defenderName, attackName) {
		if (this.#orderFighters === null) {
			this.#orderFighters = [attackerName, defenderName];
		}
		if (this.#orderFighters[1] === attackerName) {
			throw new BadFighterAttackError(attackerName);
		}
		let toAttackPokemon = new ToAttackPokemon(this.#pokedexStore, this.#attackStore);
		const { attack, attacker, defender } = toAttackPokemon.execute({
			attackerName,
			defenderName,
			attackName,
		});
		this.#orderFighters = [defenderName, attackerName];
		this.#history.push({
			applied_at: new Date(),
			attack: attack,
			to: defender,
			from: attacker,
		});
	}

	/**
	 * Nombre de coups qu'un pokemon a donné durant la partie.
	 * @param {Pokemon} pokemon
	 * @returns {number}
	 */
	countHits(pokemon) {
		return this.#history.filter((h) => h.from.getName() === pokemon.getName()).length;
	}

	/**
	 * Attaque un défenseur, + contre-attaque.
	 * @param {PokemonAttack} attacker
	 * @param {Pokemon} defender
	 * @param {{alive(f1: PokemonAttack, f2: Pokemon): void;death(w: Pokemon, l: Pokemon): void;}} state
	 * @param {boolean} [next=true]
	 */
	flow(attacker, defender, state, next = true) {
		try {
			this.attack(attacker.getPokemonName(), defender.getName(), attacker.getAttackName());
			let def = this.#pokedexStore.find(defender.getId());
			state.alive(attacker, def);
			if (!def.isAlive()) {
				state.death(attacker.getPokemon(), def);
				return;
			}
			if (next) {
				setTimeout(() => {
					this.flow(
						new PokemonAttack(def, randomArray(this.#attackStore.fromPokemon(def))),
						attacker.getPokemon(),
						state,
						false,
					);
				}, ATTACK_AFTER);
			}
		} catch (e) {
			console.error(e);
		}
	}
}

/**
 * @typedef {import("./entities/Pokemon.js").Pokemon} Pokemon
 * @typedef {import("./entities/Attack.js").Attack}Attack
 *
 * @typedef {{find(id: number): Pokemon;}} PokedexStore
 * @typedef {{fromPokemon(pokemon: Pokemon): Array<Attack>;}} AttackStore
 */
