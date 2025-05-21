// @ts-nocheck

import { ToAttackPokemon } from "./actions/ToAttackPokemon.js";
import { BadFighterAttackError } from "./errors/BadFighterError.js";
import { PokemonAttack } from "./entities/PokemonAttack.js";
import { randomArray } from "../shared/helpers.js";

const ATTACK_AFTER = 5_000;

export class GameBattle
{
	#pokedexStore;
	#attackStore;

	#orderFighters = null;
	#history = [];

	constructor(pokedexStore, attackStore)
	{
		this.#pokedexStore = pokedexStore;
		this.#attackStore = attackStore;
	}

	attack(attackerName, defenderName, attackName)
	{
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
		})
	}

	countHits(pokemon)
	{
		return this.#history.filter(
			(h) => h.from.getName() === pokemon.getName(),
		).length;
	}

	getHistory()
	{
		return this.#history;
	}

	flow(attacker, defender, state, next = true)
	{
		try {
			this.attack(attacker.getPokemonName(), defender.getName(), attacker.getAttackName());

			let def = this.#pokedexStore.find(defender.getId());

			state.alive(attacker, def);

			if (!def.isAlive()) {
				state.death(attacker.getPokemon(), def)
				return;
			}

			if (next) {
				setTimeout(() => {
					this.flow(
						new PokemonAttack(
							def,
							randomArray(this.#attackStore.fromPokemon(def.getAttacks())),
						),
						attacker.getPokemon(),
						state,
						false,
					)
				}, ATTACK_AFTER);
			}
		} catch (e) {
			console.error(e);
		}
	}
}
