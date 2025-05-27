import { Pokemon, PokemonTypeEnum } from "../../domain/entities/Pokemon.js";
import { PokemonNotFoundError } from "../../domain/errors/PokemonNotFoundError.js";
import { randomNumber } from "../../shared/helpers.js";

export const POKEMON_DETAIL_POSTER = "https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/detail/{id}.png";
export const POKEMON_CRY = "https://play.pokemonshowdown.com/audio/cries/{pokemon_en}.mp3";

let pokedex = [
	{
		id: 25,
		name: "Pikachu",
		types: [PokemonTypeEnum.Electrik],
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

/**
 * Magasin de données concernant le pokedex.
 */
export class PokedexStore {
	#dataset = pokedex;

	/**
	 * Récupère la liste des pokemon's (= le Pokedex)
	 * @returns {Array<Pokemon>}
	 */
	all() {
		return [...this.#dataset];
	}

	/**
	 * Cherche un pokemon en fonction de son ID.
	 * @param {number} id - ID d'un pokemon
	 * @returns {Pokemon}
	 * @throws {PokemonNotFoundError}
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
	 * @param {string} name - Le nom d'un pokemon
	 * @returns {Pokemon}
	 * @throws {PokemonNotFoundError}
	 */
	findByName(name) {
		let record = this.#dataset.find(
			(item) =>
				item.getName({ lang: "fr" }).toLowerCase() === name.toLowerCase() ||
				item.getName({ lang: "en" }).toLowerCase() === name.toLowerCase()
		);

		if (typeof record === "undefined") {
			throw new PokemonNotFoundError(name);
		}
		return record;
	}

	/**
	 * Met à jour les points de vie d'un pokemon en fonction de son ID.
	 * @param {number} id - ID d'un pokemon.
	 * @param {number} hp - Nombre de points de vie à re-définir.
	 */
	updateHitPoints(id, hp) {
		let record = this.find(id);
		record.setHitPoints(hp);
	}
}
