import { Pokemon } from "../../domain/entities/Pokemon.js";
import { PokemonTypeEnum } from "../../domain/entities/Pokemon.js";
import { PokemonNotFoundError } from "../../domain/errors/PokemonNotFoundError.js";
import { randomNumber, shuffle } from "../../shared/helpers.js";

let pokedex = [
	{
		id: 25,
		name: "Pikachu",
		types: [PokemonTypeEnum.Electrik],
		weakness: [PokemonTypeEnum.Sol],
		level: randomNumber(40, 100),
		hp: {
			min: 35,
			max: 274,
		},
		attacks: [1, 2, 3, 4],
	},
	{
		id: 150,
		name: "Mewtwo",
		types: [PokemonTypeEnum.Psy],
		weakness: [PokemonTypeEnum.Insecte, PokemonTypeEnum.Spectre, PokemonTypeEnum.Tenebres],
		level: randomNumber(40, 100),
		hp: {
			min: 106,
			max: 416,
		},
		attacks: [5, 6, 7, 8],
	},
	{
		id: 144,
		name_en: "articuno",
		name: "Artikodin",
		types: [PokemonTypeEnum.Glace, PokemonTypeEnum.Vol],
		weakness: [PokemonTypeEnum.Feu, PokemonTypeEnum.Electrik, PokemonTypeEnum.Roche, PokemonTypeEnum.Acier],
		level: randomNumber(40, 100),
		hp: {
			min: 90,
			max: 384,
		},
		attacks: [9, 10, 11, 12],
	},
	{
		id: 154,
		name_en: "meganium",
		name: "Méganium",
		types: [PokemonTypeEnum.Plante],
		weakness: [
			PokemonTypeEnum.Feu,
			PokemonTypeEnum.Glace,
			PokemonTypeEnum.Poison,
			PokemonTypeEnum.Vol,
			PokemonTypeEnum.Insecte,
		],
		level: randomNumber(40, 100),
		hp: {
			min: 80,
			max: 364,
		},
		attacks: [13, 14, 4, 16],
	},
	{
		id: 157,
		name: "Typhlosion",
		types: [PokemonTypeEnum.Feu],
		weakness: [PokemonTypeEnum.Eau, PokemonTypeEnum.Glace],
		level: randomNumber(40, 100),
		hp: {
			min: 78,
			max: 360,
		},
		attacks: [17, 18, 19, 20],
	},
	{
		id: 160,
		name_en: "feraligatr",
		name: "Aligatueur",
		types: [PokemonTypeEnum.Eau],
		weakness: [PokemonTypeEnum.Feu, PokemonTypeEnum.Electrik],
		level: randomNumber(40, 100),
		hp: {
			min: 80,
			max: 374,
		},
		attacks: [21, 22, 23, 24],
	},
	{
		id: 249,
		name: "Lugia",
		types: [PokemonTypeEnum.Psy, PokemonTypeEnum.Vol],
		weakness: [
			PokemonTypeEnum.Electrik,
			PokemonTypeEnum.Glace,
			PokemonTypeEnum.Roche,
			PokemonTypeEnum.Spectre,
			PokemonTypeEnum.Tenebres,
		],
		level: randomNumber(40, 100),
		hp: {
			min: 106,
			max: 416,
		},
		attacks: [25, 22, 27, 28],
	},
	{
		id: 251,
		name: "Celebi",
		types: [PokemonTypeEnum.Psy, PokemonTypeEnum.Plante],
		weakness: [
			PokemonTypeEnum.Feu,
			PokemonTypeEnum.Glace,
			PokemonTypeEnum.Poison,
			PokemonTypeEnum.Vol,
			PokemonTypeEnum.Insecte,
			PokemonTypeEnum.Spectre,
			PokemonTypeEnum.Tenebres,
		],
		level: randomNumber(40, 100),
		hp: {
			min: 100,
			max: 404,
		},
		attacks: [29, 30, 13, 7],
	},
].map((detail) =>
	new Pokemon(detail.id)
		.setName(detail.name, detail.name_en)
		.setTypes(detail.types)
		.setMinHp(detail.hp.min)
		.setMaxHp(detail.hp.max)
		.setAttacks(detail.attacks)
		.setLevel(detail.level),
);

export class MyPokedexStore {
	#dataset = pokedex;

	/**
	 * Pokedex
	 */
	all() {
		return shuffle([...this.#dataset]);
	}

	/**
	 * Cherche un pokemon en fonction de son ID.
	 */
	find(id) {
		let record = this.#dataset.find((item) => item.getId() === id);
		if (typeof record === "undefined") {
			throw new PokemonNotFoundError(id);
		}
		return record;
	}

	/**
	 * Cherche un pokemon en fonction de son nom.
	 */
	findByName(name) {
		let record = this.#dataset.find((item) => item.getName() === name);
		if (typeof record === "undefined") {
			throw new PokemonNotFoundError(name);
		}
		return record;
	}

	/**
	 * Met à jour les points de vie d'un pokemon en fonction de son ID.
	 */
	updateHitPoints(id, hp) {
		let record = this.find(id);
		record.setHitPoints(hp);
	}
}
