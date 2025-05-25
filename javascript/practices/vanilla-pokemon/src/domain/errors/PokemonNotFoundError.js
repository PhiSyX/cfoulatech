export class PokemonNotFoundError extends Error {
	/**
	 * @param {string|number} pokemonName Le nom du pokemon introuvable.
	 */
	constructor(pokemonName) {
		if (typeof pokemonName === "number") {
			pokemonName = `à l'id ${pokemonName}`;
		}
		super(`Le pokemon ${pokemonName} n'existe pas dans notre base de données`);
		this.name = "PokemonNotFoundError";
	}
}
