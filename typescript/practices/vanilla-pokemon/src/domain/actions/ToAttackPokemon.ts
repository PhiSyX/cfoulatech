import type { Attack } from "../entities/Attack.js";
import type { Pokemon } from "../entities/Pokemon.js";
import { FighterNotAliveError } from "../errors/FighterNotAliveError.js";
import type { AttackStore } from "../stores/AttackStore.js";
import type { PokedexStore } from "../stores/PokedexStore.js";

type Input = {
	attackerName: string;
	defenderName: string;
	attackName: string;
};

type Output = {
	attack: Attack;
	attacker: Pokemon;
	defender: Pokemon;
};

export class ToAttackPokemon {
	#pokedexStore: PokedexStore;
	#attackStore: AttackStore;

	constructor(pokedexStore: PokedexStore, attackStore: AttackStore) {
		this.#pokedexStore = pokedexStore;
		this.#attackStore = attackStore;
	}

	execute({ attackerName, defenderName, attackName }: Input): Output {
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
