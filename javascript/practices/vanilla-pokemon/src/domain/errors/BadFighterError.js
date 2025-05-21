// @ts-nocheck

export class BadFighterAttackError extends Error {
	constructor(name) {
		super(`C'est au tour de ${name} de jouer.`);
	}
}
