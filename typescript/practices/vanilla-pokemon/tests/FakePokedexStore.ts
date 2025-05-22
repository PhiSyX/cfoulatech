import { Pokemon, PokemonTypeEnum } from "../src/domain/entities/Pokemon.js";
import { PokemonNotFoundError } from "../src/domain/errors/PokemonNotFoundError.js";
import type { PokedexStore } from "../src/domain/stores/PokedexStore.js";

export class FakePokedexStore implements PokedexStore {
	#dataset: Array<Pokemon> = [
		new Pokemon(6)
			.setName("Dracaufeu")
			.setTypes([PokemonTypeEnum.Feu, PokemonTypeEnum.Vol])
			.setLevel(10)
			.setMinHp(40)
			.setHitPoints(45)
			.setMaxHp(50)
			.setAttacks([2]),
		new Pokemon(9)
			.setName("Tortank")
			.setTypes([PokemonTypeEnum.Eau])
			.setLevel(10)
			.setMinHp(40)
			.setHitPoints(45)
			.setMaxHp(50)
			.setAttacks([1]),
	];

	all(): Array<Pokemon> {
		return this.#dataset;
	}

	find(id: number): Pokemon {
		let record = this.#dataset.find((item) => item.getId() === id);
		if (typeof record === "undefined") {
			throw new PokemonNotFoundError(id);
		}
		return record;
	}

	findByName(name: string): Pokemon {
		let record = this.#dataset.find((item) => item.getName() === name);
		if (typeof record === "undefined") {
			throw new PokemonNotFoundError(name);
		}
		return record;
	}

	updateHitPoints(id: number, hp: number): void {
		let record = this.find(id);
		record.setHitPoints(hp);
	}
}
