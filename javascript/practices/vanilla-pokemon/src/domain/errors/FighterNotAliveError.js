// @ts-nocheck

export class FighterNotAliveError extends Error {
	constructor(attackerName) {
		super(`Le pokémon ${attackerName} n'est plus en vie.`);
	}
}
