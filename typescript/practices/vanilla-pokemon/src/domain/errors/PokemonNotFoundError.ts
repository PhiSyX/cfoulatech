export class PokemonNotFoundError extends Error {
	constructor(name: number | string) {
		super(`Le pokemon ${name} n'existe pas dans notre base de données`);
	}
}
