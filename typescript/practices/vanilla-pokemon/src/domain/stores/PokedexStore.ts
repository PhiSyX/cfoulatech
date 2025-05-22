import type { Pokemon } from "../entities/Pokemon.js";

export interface PokedexStore {
	all(): Array<Pokemon>;

	find(id: number): Pokemon;

	findByName(name: string): Pokemon;

	updateHitPoints(id: number, hp: number): void;
}
