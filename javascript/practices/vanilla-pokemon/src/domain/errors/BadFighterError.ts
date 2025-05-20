export class BadFighterAttackError extends Error {
	constructor(name: string) {
		super(`C'est au tour de ${name} de jouer.`);
	}
}
