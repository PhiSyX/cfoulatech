import type { Attack, AttackProps } from "./Attack.ts";
import type { Pokemon } from "./Pokemon.ts";
import { randomArray } from "../utils/helpers.ts";

interface HistoryAttack {
	attacker: Pokemon;
	defender: Pokemon;
	attack: AttackProps["name"];
	applied_at: Date;
}

export class GameBattle {
	/**
	 * Il ne peut y avoir que deux combattants par partie.
	 */
	private readonly fighters: [attacker: Pokemon, defender: Pokemon];

	/**
	 * Ordre des combattants, change à chaque tour.
	 */
	private orderToursFighters: [p1: Pokemon, p2: Pokemon];

	/**
	 * Historique de la partie
	 */
	private history: Array<HistoryAttack> = [];

	// ----------- //
	// Constructor //
	// ----------- //

	constructor(p1: Pokemon, p2: Pokemon) {
		this.fighters = [p1, p2];
		this.orderToursFighters = [p1, p2];
	}

	loser(): Pokemon | false {
		if (this.fighters[0].getHitPoints() <= 0) return this.fighters[0];
		if (this.fighters[1].getHitPoints() <= 0) return this.fighters[1];
		return false;
	}

	winner(): Pokemon | false {
		if (this.fighters[0].getHitPoints() <= 0) return this.fighters[1];
		if (this.fighters[1].getHitPoints() <= 0) return this.fighters[0];
		return false;
	}

	requestAttack(attacker: Pokemon, defender: Pokemon, attack: Attack | string){
		if (attacker.getName() === this.orderToursFighters[1].getName()) {
			throw new BadFighterAttackError(defender.getName());
		}

		if (!attacker.isAlive()) {
			throw new NotAliveError(attacker.getName());
		}

		let attackName: string = (typeof attack === "string")
			? attack
			: attack.name;

		let withAttack = attacker.getAttack(attackName);
		if (!withAttack) throw new AttackNotFoundError(attacker.getName(), attackName);
		attacker.attack(defender, withAttack);

		this.history.push({
			attack: attackName,
			attacker,
			defender,
			applied_at: new Date(),
		});

		this.orderToursFighters = [defender, attacker];
	}

	autoflow(
		f1: Pokemon,
		f2: Pokemon,
		attack: Attack,
		nextFn: (f1: Pokemon, f2: Pokemon) => void,
		death: (w: Pokemon, d: Pokemon) => void,
		next: boolean = true,
	) {
		this.requestAttack(f1, f2, attack);

		nextFn(f1, f2);

		if (f2.isAlive()) {
			if (next) {
				setTimeout(
					() => this.autoflow(f2, f1, randomArray(f2.getAttacks()), nextFn, death, false),
					2_500,
				);
			}
		} else {
			death(f1, f2);
		}
	}
}

export class BadFighterAttackError extends Error {
	constructor(name: string) {
		super(`C'est au tour de ${name} de jouer.`);
	}
}

export class NotAliveError extends Error {
	constructor(name: string) {
		super(`${name} est mort, il ne peut pas jouer.`);
	}
}

export class AttackNotFoundError extends Error {
	constructor(attackerName: Pokemon["name"], attackName: string) {
		super(`${attackerName} ne possède pas d'attaque "${attackName}".`);
	}
}
