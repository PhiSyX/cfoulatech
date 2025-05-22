export class PokemonNotFoundError extends Error {
	/**
	 * @param {string} pokemonName Le nom du pokemon introuvable.
	 */
	constructor(pokemonName) {
		super(`Le pokemon ${pokemonName} n'existe pas dans notre base de données`);
	}
}
