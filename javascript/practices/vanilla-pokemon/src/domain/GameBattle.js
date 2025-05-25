import { randomArray } from "../shared/helpers.js";
import { ToAttackPokemon } from "./actions/ToAttackPokemon.js";
import { PokemonAttack } from "./entities/PokemonAttack.js";

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
	 * Magasin de données lié aux attaques.
	 * @type {AttackStoreContract}
	 */
	#attackStore;

	/**
	 * Action d'attaque
	 * @type {ToAttackPokemon}
	 */
	#attackAction;

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
		this.#attackStore = attackStore;
		this.#attackAction = new ToAttackPokemon(gameStore, pokedexStore, attackStore);
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
	 * Le nombre de coups qu'un pokemon a donné durant la partie.
	 * @param {Pokemon} pokemon
	 * @returns {number}
	 */
	countHits(pokemon) {
		return this.getHistory()
			.filter((history) =>
				history.from.getName() === pokemon.getName()
			)
			.length;
	}

	/**
	 * Attaque un défenseur + contre-attaque du défenseur après [ATTACK_AFTER_SECONDS] secondes.
	 * @param {PokemonAttack} attacker - Pokemon Attaquant
	 * @param {Pokemon} defender - Pokemon Défenseur
	 * @param {{alive(f1: PokemonAttack, f2: Pokemon): void; death(w: Pokemon, l: Pokemon): void;}} state
	 * @param {boolean} [shouldContinue=true] - Doit-on continuer le processus d'attaque.
	 * @recursive
	 */
	attack(attacker, defender, state, shouldContinue = true) {
		try {
			let { defender: defenderWithLessHP } = this.#attackAction.execute({
				attackerName: attacker.getPokemonName(),
				defenderName: defender.getName(),
				attackName: attacker.getAttackName(),
			});

			// Le défenseur est toujours vivant, notifions-le à notre interface utilisateur.
			state.alive(attacker, defenderWithLessHP);

			if (!defenderWithLessHP.isAlive()) {
				// Le défenseur est mort, notifions-le à notre interface utilisateur.
				state.death(attacker.getPokemon(), defenderWithLessHP);
				return;
			}

			if (shouldContinue) {
				// Contre-attaque du défenseur avec une attaque aléatoire.
				setTimeout(() => {
					this.attack(
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
