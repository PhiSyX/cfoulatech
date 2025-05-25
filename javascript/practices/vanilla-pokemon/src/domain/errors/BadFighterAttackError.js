export class BadFighterAttackError extends Error {
	/**
	 * @param {string} pokemonName Le nom du pokemon adverse
	 */
	constructor(pokemonName) {
		super(`C'est au tour de ${pokemonName} de jouer.`);
		this.name = "BadFighterAttackError";
	}
}
