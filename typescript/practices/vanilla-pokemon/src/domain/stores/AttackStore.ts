import type { Attack } from "../entities/Attack.js";
import type { Pokemon } from "../entities/Pokemon.js";

export interface AttackStore {
	all(): Array<Attack>;

	fromPokemon(ids: Array<number>): Array<Attack>;

	findByName(name: string, attackIds: ReturnType<Pokemon["getAttacks"]>): Attack;
}
