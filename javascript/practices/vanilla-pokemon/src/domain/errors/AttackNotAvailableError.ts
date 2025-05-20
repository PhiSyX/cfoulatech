export class AttackNotAvailableError extends Error {
	constructor(attackName: string) {
		super(`L'attaque ${attackName} n'est pas disponible pour ce pokémon.`);
	}
}
