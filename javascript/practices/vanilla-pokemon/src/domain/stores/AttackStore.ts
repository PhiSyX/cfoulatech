import type { Attack } from "../entities/Attack.ts";
import type { Pokemon } from "../entities/Pokemon.ts";

export interface AttackStore {
	all(): Array<Attack>;

	fromPokemon(ids: Array<number>): Array<Attack>;

	findByName(name: string, attackIds: ReturnType<Pokemon["getAttacks"]>): Attack;
}
