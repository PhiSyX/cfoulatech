export class FighterNotAliveError extends Error {
	/**
	 * @param {string} pokemonName Le nom du pokemon n'étant plus en vie.
	 */
	constructor(pokemonName) {
		super(`Le pokemon ${pokemonName} n'est plus en vie.`);
	}
}
