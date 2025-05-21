// @ts-nocheck

export class PokemonNotFound extends Error {
	constructor(name) {
		super(`Le pokemon ${name} n'existe pas dans notre base de données`);
	}
}
