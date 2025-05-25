import { randomArray } from "../shared/helpers.js";
import { ToAttackPokemon } from "./actions/ToAttackPokemon.js";
import { PokemonAttack } from "./entities/PokemonAttack.js";
import { BadFighterAttackError } from "./errors/BadFighterAttackError.js";

/**
 * Constante de contre-attaque après X secondes
 */
const ATTACK_AFTER_SECONDS = 4_500;

export class GameBattle {
	// --------- //
	// Propriété //
	// --------- //
	/**
	 * Magasin de données lié à un combat.
	 * @type {GameStoreContract}
	 */
	#gameStore;

	/**
	 * Magasin de données lié au pokedex.
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
	 * Construit la classe de jeu de combat.
	 * @param {GameStoreContract} gameStore
	 * @param {PokedexStoreContract} pokedexStore
	 * @param {AttackStoreContract} attackStore
	 */
	constructor(gameStore, pokedexStore, attackStore) {
		this.#gameStore = gameStore;
		this.#pokedexStore = pokedexStore;
		this.#attackStore = attackStore;
	}

	// --------------- //
	// Getter | Setter //
	// --------------- //

	/**
	 * Récupère l'historique.
	 */
	getHistory() {
		return this.#gameStore.getHistory();
	}

	// ------- //
	// Méthode // → Publique
	// ------- //

	/**
	 * Attaque un défenseur.
	 * @param {string} attackerName
	 * @param {string} defenderName
	 * @param {string} attackName
	 * @returns {{ defender: Pokemon; }} Pokemon Défenseur
	 */
	attack(attackerName, defenderName, attackName) {
		if ( ! this.#gameStore.check(attackerName, defenderName)) {
			throw new BadFighterAttackError(attackerName);
		}
		let toAttackPokemon = new ToAttackPokemon(this.#pokedexStore, this.#attackStore);
		const { attacker, defender } = toAttackPokemon.execute({ attackerName, defenderName, attackName });
		this.#gameStore.addHistory(attacker, defender);
		return { defender };
	}

	/**
	 * Le nombre de coups qu'un pokemon a donné durant la partie.
	 * @param {Pokemon} pokemon
	 * @returns {number}
	 */
	countHits(pokemon) {
		return this.getHistory().filter((h) => h.from.getName() === pokemon.getName()).length;
	}

	/**
	 * Attaque un défenseur + contre-attaque du défenseur après [ATTACK_AFTER_SECONDS] secondes.
	 * @param {PokemonAttack} attacker - Pokemon Attaquant
	 * @param {Pokemon} defender - Pokemon Défenseur
	 * @param {{alive(f1: PokemonAttack, f2: Pokemon): void; death(w: Pokemon, l: Pokemon): void;}} state
	 * @param {boolean} [next=true] - Doit-on continuer le processus d'attaque.
	 * @recursive
	 */
	flow(attacker, defender, state, next = true) {
		try {
			let {defender: defenderWithLessHP} = this.attack(attacker.getPokemonName(), defender.getName(), attacker.getAttackName());

			// Le défenseur est toujours vivant, notifions-le à notre interface utilisateur.
			state.alive(attacker, defenderWithLessHP);

			if (!defenderWithLessHP.isAlive()) {
				// Le défenseur est mort, notifions-le à notre interface utilisateur.
				state.death(attacker.getPokemon(), defenderWithLessHP);
				return;
			}

			if (next) {
				// Contre-attaque du défenseur avec une attaque aléatoire.
				setTimeout(() => {
					this.flow(
						new PokemonAttack(defenderWithLessHP, randomArray(this.#attackStore.fromPokemon(defenderWithLessHP))),
						attacker.getPokemon(),
						state,
						false,
					);
				}, ATTACK_AFTER_SECONDS);
			}
		} catch (e) {
			console.error(e);
		}
	}
}

/**
 * @typedef {import("./entities/Pokemon.js").Pokemon} Pokemon
 * @typedef {import("./entities/Attack.js").Attack} Attack
 *
 * @typedef {{
 * 		addHistory(attacker:PokemonAttack, defender:Pokemon): void;
 * 		getHistory(): Array<{applied_at: Date; attack: Attack; to: Pokemon; from: Pokemon;}>;
 * 		check(attackerName: string, defenderName: string): boolean;
 * }} GameStoreContract
 *
 * @typedef {{
 * 		all(): Array<Pokemon>;
 * 		find(id: number): Pokemon;
 * 		findByName(name: string): Pokemon;
 * 	    updateHitPoints(id: number, hp: number): void;
 * }} PokedexStoreContract
 *
 * @typedef {{
 * 		all(): Array<Attack>;
 * 		findByName(name: string, attacksIds?: Array<number>): Attack;
 * 		fromPokemon(pokemon: Pokemon): Array<Attack>;
 * }} AttackStoreContract
 */
