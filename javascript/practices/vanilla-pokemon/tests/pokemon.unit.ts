import { describe, expect, test } from "vitest";

import {
	AttackNotFoundError,
	BadFighterAttackError,
	GameBattle,
	NotAliveError,
} from "../domain/GameBattle.ts";
import { Pokemon } from "../domain/Pokemon.ts";

const tortank = () =>
	new Pokemon("Tortank", "eau")
		.withLevel(100)
		.withMinimalLevel(79)
		.withMaximalLevel(362);
const dracaufeu = () =>
	new Pokemon("Dracaufeu", "feu")
		.withLevel(100)
		.withMinimalLevel(78)
		.withMaximalLevel(360);
const lokhlass = () =>
	new Pokemon("Lokhlass", ["eau", "glace"])
		.withLevel(40)
		.withMinimalLevel(130)
		.withMaximalLevel(464);

describe("Pokemon", () => {
	test("Règle: un pokémon n'a le droit d'attaquer qu'une seule fois", () => {
		let attacker = tortank().withAttack({
			name: "Hydrocanon",
			power: 110,
			type: ["eau"],
		});
		let defender = dracaufeu().withAttack({
			name: "Deflagration",
			power: 110,
			type: ["feu"],
		});

		let game = new GameBattle(attacker, defender);

		let attack1 = attacker.getAttack("Hydrocanon")!;
		game.requestAttack(attacker, defender, attack1);
		expect(() =>
			game.requestAttack(attacker, defender, attack1),
		).toThrowError(BadFighterAttackError);

		let attack2 = defender.getAttack("Deflagration")!;
		game.requestAttack(defender, attacker, attack2);
		expect(() =>
			game.requestAttack(defender, attacker, attack2),
		).toThrowError(BadFighterAttackError);
	});

	test("Règle: un pokémon n'attaque qu'avec ses propres attaques", () => {
		let attacker = tortank().withAttack({
			name: "Hydrocanon",
			power: 110,
			type: ["eau"],
		});
		let defender = dracaufeu().withAttack({
			name: "Deflagration",
			power: 110,
			type: ["feau"],
		});

		let game = new GameBattle(attacker, defender);

		let notFoundAttack = defender.getAttack("Deflagration")!;
		expect(() =>
			game.requestAttack(attacker, defender, notFoundAttack),
		).toThrowError(AttackNotFoundError);

		let attack = attacker.getAttack("Hydrocanon")!;
		expect(() =>
			game.requestAttack(attacker, defender, attack),
		).not.toThrowError(AttackNotFoundError);
	});

	test("Règle: un pokémon ne peut attaquer une fois mort", () => {
		let attacker = tortank().withAttack({
			name: "Hydrocanon",
			power: 110,
			type: ["eau"],
		});
		let defender = dracaufeu().withAttack({
			name: "Deflagration",
			power: 3000,
			type: ["feu"],
		});

		let game = new GameBattle(attacker, defender);

		let attack1 = attacker.getAttack("Hydrocanon")!;
		let attack2 = defender.getAttack("Deflagration")!;

		game.requestAttack(attacker, defender, attack1);
		game.requestAttack(defender, attacker, attack2);
		expect(() =>
			game.requestAttack(attacker, defender, attack1),
		).toThrowError(NotAliveError);
	});

	test("Fonctionnalité: Attaque d'un pokemon, perte de PV du défenseur", () => {
		let attacker = tortank().withAttack({
			name: "Morsure",
			power: 60,
			type: "ténèbres",
		});

		let defender = dracaufeu();
		let game = new GameBattle(attacker, defender);

		let attack = attacker.getAttack("Morsure")!;
		game.requestAttack(attacker, defender, attack);
		expect(defender.isAlive()).toBeTruthy();

		expect(defender.getHitPoints()).toBe(
			defender.maxHealth() - attack.calcPower(attacker, defender),
		);
	});

	test("Fonctionnalité: Attaque d'un pokemon provoquant la mort du défenseur", () => {
		let attacker = tortank().withAttack({
			name: "Anti-Air",
			type: "roche",
			power: 3000,
		});
		let defender = dracaufeu();
		let game = new GameBattle(attacker, defender);

		let attack = attacker.getAttack("Anti-Air")!;
		game.requestAttack(attacker, defender, attack);

		expect(defender.isAlive()).toBeFalsy();
		expect(game.loser()).toBe(defender);
		expect(game.winner()).toBe(attacker);
	});

	test("Fonctionnalité: Efficacité d'attaque faible", () => {
		let attacker = dracaufeu().withAttack({
			name: "Lance-flemme",
			type: ["feu"],
			power: 110,
		});
		let defender = tortank();
		let game = new GameBattle(attacker, defender);

		let attack = attacker.getAttack("Lance-flemme")!;

		game.requestAttack(attacker, defender, attack);

		expect(defender.getHitPoints()).toBe(
			defender.maxHealth() - attack.calcPower(attacker, defender),
		);
	});

	test("Fonctionnalité: Efficacité d'attaque forte", () => {
		let attacker = dracaufeu().withAttack({
			name: "Feu d'Enfer",
			type: ["feu"],
			power: 100,
		});
		let defender = lokhlass();

		let game = new GameBattle(attacker, defender);

		let attack = attacker.getAttack("Feu d'Enfer")!;

		game.requestAttack(attacker, defender, attack);

		expect(defender.getHitPoints()).toBe(
			defender.maxHealth() - attack.calcPower(attacker, defender),
		);
	});
});
