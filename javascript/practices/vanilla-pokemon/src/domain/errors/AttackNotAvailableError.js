// @ts-nocheck

export class AttackNotAvailableError extends Error {
	constructor(attackName) {
		super(`L'attaque ${attackName} n'est pas disponible pour ce pokémon.`);
	}
}
