// @ts-nocheck

export class AttackNotFoundError extends Error {
	constructor(attackName) {
		super(`L'attaque ${attackName} n'existe pas dans notre base de données.`);
	}
}
