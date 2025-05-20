import type { Attack } from "./Attack.ts";
import type { Pokemon } from "./Pokemon.ts";

export class PokemonAttack {
	#pokemon: Pokemon;
	#attack: Attack

	constructor(pokemon: Pokemon, attack: Attack) {
		this.#pokemon = pokemon;
		this.#attack = attack;
	}

	getPokemon(): Pokemon {
		return this.#pokemon;
	}

	getPokemonName(): string {
		return this.#pokemon.getName();
	}

	getAttackName(): string {
		return this.#attack.getName();
	}
}
