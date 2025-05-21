// @ts-nocheck

import { FighterNotAliveError } from "../errors/FighterNotAliveError.js";

export class ToAttackPokemon
{
	#pokedexStore;
	#attackStore;

	constructor(pokedexStore, attackStore)
	{
		this.#pokedexStore = pokedexStore;
		this.#attackStore = attackStore;
	}

	execute({ attackerName, defenderName, attackName })
	{
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
		this.#pokedexStore.updateHitPoints(
			defender.getId(),
			defender.getHitPoints() - power,
		);
		return { attack, attacker, defender };
	}
}

