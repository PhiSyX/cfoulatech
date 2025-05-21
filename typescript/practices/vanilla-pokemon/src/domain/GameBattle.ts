import type { PokedexStore } from "./stores/PokedexStore.ts";
import type { AttackStore } from "./stores/AttackStore.ts";
import type { Pokemon } from "./entities/Pokemon.ts";
import type { Attack } from "./entities/Attack.ts";

import { ToAttackPokemon } from "./actions/ToAttackPokemon.ts";
import { BadFighterAttackError } from "./errors/BadFighterError.ts";
import { PokemonAttack } from "./entities/PokemonAttack.ts";
import { randomArray } from "../shared/helpers.ts";

interface HistoryAttack {
	from: Pokemon;
	to: Pokemon;
	attack: Attack;
	applied_at: Date;
}

const ATTACK_AFTER: number = 5_000;

export class GameBattle {
	#pokedexStore: PokedexStore;
	#attackStore: AttackStore;

	#orderFighters: [f1: string, f2: string] | null = null;
	#history: Array<HistoryAttack> = [];

	constructor(pokedexStore: PokedexStore, attackStore: AttackStore) {
		this.#pokedexStore = pokedexStore;
		this.#attackStore = attackStore;
	}

	attack(attackerName: string, defenderName: string, attackName: string): void {
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

	countHits(pokemon: Pokemon): number {
		return this.#history.filter(
			(h) => h.from.getName() === pokemon.getName(),
		).length;
	}

	getHistory(): Array<HistoryAttack> {
		return this.#history;
	}

	flow(
		attacker: PokemonAttack,
		defender: Pokemon,
		state: {
			alive: (f1: PokemonAttack, f2: Pokemon) => void,
			death: (w: Pokemon, d: Pokemon) => void,
		},
		next: boolean = true,
	): void {
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
