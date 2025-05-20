export class FighterNotAliveError extends Error {
	constructor(attackerName: string) {
		super(`Le pokémon ${attackerName} n'est plus en vie.`);
	}
}
