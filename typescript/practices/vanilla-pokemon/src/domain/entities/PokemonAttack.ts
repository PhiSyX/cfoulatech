import type { Attack } from "./Attack.js";
import type { Pokemon } from "./Pokemon.js";

export class PokemonAttack {
	#pokemon: Pokemon;
	#attack: Attack;

	constructor(pokemon: Pokemon, attack: Attack) {
		this.#pokemon = pokemon;
		this.#attack = attack;
	}

	getAttack(): Attack {
		return this.#attack;
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
