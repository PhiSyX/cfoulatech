export class AttackNotFoundError extends Error {
	/**
	 * @param {string} attackName Le nom d'une attaque inexistante.
	 */
	constructor(attackName) {
		super(`L'attaque ${attackName} n'existe pas dans notre base de données.`);
		this.name = "AttackNotFoundError";
	}
}
