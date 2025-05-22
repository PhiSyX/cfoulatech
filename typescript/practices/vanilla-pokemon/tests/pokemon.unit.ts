import { describe, expect, test } from "vitest";
import { GameBattle } from "../src/domain/GameBattle.js";
import { EffectivenessEnum } from "../src/domain/entities/Attack.js";
import { PokemonTypeEnum } from "../src/domain/entities/Pokemon.js";
import { AttackNotAvailableError } from "../src/domain/errors/AttackNotAvailableError.js";
import { BadFighterAttackError } from "../src/domain/errors/BadFighterAttackError.js";
import { FighterNotAliveError } from "../src/domain/errors/FighterNotAliveError.js";
import { FakeAttackStore } from "./FakeAttackStore.js";
import { FakePokedexStore } from "./FakePokedexStore.js";

describe("Pokemon", () => {
	test("Règle: un pokémon n'a le droit d'attaquer qu'une seule fois", () => {
		let fakePokedexStore = new FakePokedexStore();
		let fakeAttackStore = new FakeAttackStore();
		let gameBattle = new GameBattle(fakePokedexStore, fakeAttackStore);
		gameBattle.attack("Tortank", "Dracaufeu", "Hydrocanon");
		expect(() => gameBattle.attack("Tortank", "Dracaufeu", "Hydrocanon")).toThrowError(BadFighterAttackError);
	});

	test("Règle: un pokémon n'attaque qu'avec ses propres attaques", () => {
		let fakePokedexStore = new FakePokedexStore();
		let fakeAttackStore = new FakeAttackStore();
		let pokemon = fakePokedexStore.findByName("Tortank");
		expect(() => fakeAttackStore.findByName("Déflagration", pokemon.getAttacks())).toThrowError(
			AttackNotAvailableError,
		);
	});

	test("Règle: un pokémon ne peut attaquer une fois mort", () => {
		let fakePokedexStore = new FakePokedexStore();
		let fakeAttackStore = new FakeAttackStore();
		let gameBattle = new GameBattle(fakePokedexStore, fakeAttackStore);
		fakePokedexStore.findByName("Dracaufeu").setHitPoints(0);
		expect(() => gameBattle.attack("Dracaufeu", "Tortank", "Déflagration")).toThrowError(FighterNotAliveError);
	});

	test("Fonctionnalité: Attaque d'un pokemon, perte de PV du défenseur", () => {
		let fakePokedexStore = new FakePokedexStore();
		let fakeAttackStore = new FakeAttackStore();
		let gameBattle = new GameBattle(fakePokedexStore, fakeAttackStore);
		let tortank = fakePokedexStore.findByName("Tortank").setHitPoints(100);
		let prevHp = tortank.getHitPoints();
		gameBattle.attack("Dracaufeu", "Tortank", "Déflagration");
		let currentHp = tortank.getHitPoints();
		expect(currentHp).not.toBe(prevHp);
		expect(tortank.isAlive()).toBeTruthy();
	});

	test("Fonctionnalité: Attaque d'un pokemon provoquant la mort du défenseur", () => {
		let fakePokedexStore = new FakePokedexStore();
		let fakeAttackStore = new FakeAttackStore();
		let gameBattle = new GameBattle(fakePokedexStore, fakeAttackStore);
		let dracaufeu = fakePokedexStore.findByName("Dracaufeu");
		let prevHp = dracaufeu.getHitPoints();
		gameBattle.attack("Tortank", "Dracaufeu", "Hydrocanon");
		let currentHp = dracaufeu.getHitPoints();
		expect(currentHp).not.toBe(prevHp);
		expect(dracaufeu.isAlive()).toBeFalsy();
	});

	test("Fonctionnalité: Efficacité d'attaque faible", () => {
		let fakeAttackStore = new FakeAttackStore();
		let hydrocanon = fakeAttackStore.findByName("Hydrocanon", [1]);
		expect(hydrocanon.effectiveness([PokemonTypeEnum.Eau])).toBe(EffectivenessEnum.Faible);
	});

	test("Fonctionnalité: Efficacité d'attaque forte", () => {
		let fakeAttackStore = new FakeAttackStore();
		let hydrocanon = fakeAttackStore.findByName("Déflagration", [2]);
		expect(hydrocanon.effectiveness([PokemonTypeEnum.Plante])).toBe(EffectivenessEnum.Forte);
	});
});
