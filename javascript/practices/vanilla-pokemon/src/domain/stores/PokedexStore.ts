import { Pokemon } from "../entities/Pokemon.ts";

export interface PokedexStore {
	all(): Array<Pokemon>;

	find(id: number): Pokemon;

	findByName(name: string): Pokemon;

	updateHitPoints(id: number, hp: number): void;
}
