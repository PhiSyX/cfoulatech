export class AttackNotFoundError extends Error {
	constructor(attackName: string) {
		super(`L'attaque ${attackName} n'existe pas dans notre base de données.`);
	}
}
