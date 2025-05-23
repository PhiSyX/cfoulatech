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
	 * Magasin de données liés au pokedex.
	 * @type {PokedexStore}
	 */
	#pokedexStore;
	/**
	 * Magasin de données liés aux attaques.
	 * @type {AttackStore}
	 */
	#attackStore;
	/**
	 * Ordre des combattants : le premier `p1` est celui qui doit attaquer,
	 * le second `p2` est celui qui se défend face à l'attaquant `p1`.
	 * @type {[p1: string, p2: string]|null}
	 */
	#orderFighters = null;
	/**
	 * Historique de combat.
	 */
	#history = [];

	// ----------- //
	// Constructor //
	// ----------- //

	/**
	 * Construit la classe de jeu de combat.
	 * @param {PokedexStore} pokedexStore
	 * @param {AttackStore} attackStore
	 */
	constructor(pokedexStore, attackStore) {
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
	 * @returns {{ defender: Pokemon; }} Pokemon Défenseur
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

		return { defender };
	}

	/**
	 * Le nombre de coups qu'un pokemon a donné durant la partie.
	 * @param {Pokemon} pokemon
	 * @returns {number}
	 */
	countHits(pokemon) {
		return this.#history.filter((h) => h.from.getName() === pokemon.getName()).length;
	}

	/**
	 * Attaque un défenseur + contre-attaque du défenseur après [ATTACK_AFTER_SECONDS] secondes.
	 * @param {PokemonAttack} attacker - Pokemon Attaquant
	 * @param {Pokemon} defender - Pokemon Défenseur
	 * @param {{alive(f1: PokemonAttack, f2: Pokemon): void; death(w: Pokemon, l: Pokemon): void;}} state
	 * @recursive @param {boolean} [next=true] - Doit-on continuer le processus d'attaque.
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
 * @typedef {import("./entities/Attack.js").Attack}Attack
 *
 * @typedef {{find(id: number): Pokemon;}} PokedexStore
 * @typedef {{fromPokemon(pokemon: Pokemon): Array<Attack>;}} AttackStore
 */
