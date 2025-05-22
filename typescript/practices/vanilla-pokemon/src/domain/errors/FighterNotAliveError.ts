export class FighterNotAliveError extends Error {
	constructor(attackerName: string) {
		super(`Le pokemon ${attackerName} n'est plus en vie.`);
	}
}
