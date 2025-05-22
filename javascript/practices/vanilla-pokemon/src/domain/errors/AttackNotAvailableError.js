export class AttackNotAvailableError extends Error {
	/**
	 * @param {string} attackName Le nom d'une attaque non disponible pour un pokemon.
	 */
	constructor(attackName) {
		super(`L'attaque ${attackName} n'est pas disponible pour ce pokemon.`);
	}
}
