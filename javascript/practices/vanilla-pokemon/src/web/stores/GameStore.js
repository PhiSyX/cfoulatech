export const POKEMON_FIGHTER_POSTER = "https://www.shinyhunters.com/images/regular/{id}.gif";

/**
 * Magasin de données concernant une partie en cours.
 */
export class GameStore {
	/**
	 * Ordre des combattants : le premier `p1` est celui qui doit attaquer,
	 * le second `p2` est celui qui se défend face à l'attaquant `p1`.
	 * @type {[ p1: string, p2: string ]|null}
	 */
	#orderFighters = null;

	/**
	 * Historique de combat.
	 * @type {Array<HistoryItem>}
	 */
	#history = [];

	/**
	 * Vérifie que l'attaquant a le droit d'attaquer le défenseur.
	 * @param {string} attackerName
	 * @param {string} defenderName
	 * @return {boolean}
	 */
	check(attackerName, defenderName) {
		if (this.#orderFighters === null) {
			this.#orderFighters = [attackerName, defenderName];
		}

		return attackerName !== this.#orderFighters[1];
	}

	/**
	 * Ajoute l'attaque d'un pokemon dans l'historique.
	 * @param {PokemonAttack} attacker
	 * @param {Pokemon} defender
	 */
	addHistory(attacker, defender) {
		this.#history.push({
			applied_at: new Date(),
			attack: attacker.getAttack(),
			to: defender,
			from: attacker.getPokemon(),
		});

		this.#orderFighters = [defender.getName(), attacker.getPokemonName()];
	}

	/**
	 * Historique du jeu.
	 * @returns {Array<HistoryItem>}
	 */
	getHistory() {
		return this.#history;
	}
}

/**
 * @typedef {import("../../domain/entities/Pokemon.js").Pokemon} Pokemon
 * @typedef {import("../../domain/entities/Attack.js").Attack} Attack
 * @typedef {import("../../domain/entities/PokemonAttack.js").PokemonAttack} PokemonAttack
 *
 * @typedef {{applied_at: Date; attack: Attack; to: Pokemon; from: Pokemon;}} HistoryItem
 */
