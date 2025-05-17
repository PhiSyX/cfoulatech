/** Pokemons */

import { Pokemon } from "./Pokemon.ts";
import type { PokemonType } from "./PokermonType.ts";
import { removeRandomArray } from "../utils/helpers.ts";

interface Attack {
	name: string;
	power: number;
	type: PokemonType;
}

type PokedexItem = {
	id?: string;
	number: number;
	name: string;
	type: PokemonType;
	picture: string;
	weakness: Array<PokemonType>;
	hp: {
		min: number;
		max: number;
	};
	attacks: Array<Attack>;
};

export const pokedex: Array<Pokemon> = (
	[
		{
			number: 25,
			name: "Pikachu",
			type: "électrik",
			weakness: ["sol"],
			hp: {
				min: 35,
				max: 274,
			},
			attacks: [
				{
					name: "Fatal-Foudre",
					power: 110,
					type: "électrik",
				},
				{
					name: "Queue de fer",
					power: 100,
					type: "acier",
				},
				{
					name: "Tonnerre",
					power: 90,
					type: "électrik",
				},
				{
					name: "Plaquage",
					power: 85,
					type: "normal",
				},
			],
		},
		{
			number: 150,
			name: "Mewtwo",
			type: "psy",
			weakness: ["insecte", "spectre", "ténèbres"],
			hp: {
				min: 106,
				max: 416,
			},
			attacks: [
				{
					name: "Psyko",
					power: 90,
					type: "psy",
				},
				{
					name: "Frappe Psy",
					power: 100,
					type: "psy",
				},
				{
					name: "Choc Mental",
					power: 50,
					type: "psy",
				},
				{
					name: "Rafale Psy",
					power: 65,
					type: "psy",
				},
			],
		},
		{
			number: 144,
			id: "articuno",
			name: "Artikodin",
			type: ["glace", "vol"],
			weakness: ["feu", "électrik", "roche", "acier"],
			hp: {
				min: 90,
				max: 384,
			},
			attacks: [
				{
					name: "Blizzard",
					power: 110,
					type: "glace",
				},
				{
					name: "Vent Violent",
					power: 110,
					type: "vol",
				},
				{
					name: "Laser Glace",
					power: 90,
					type: "glace",
				},
				{
					name: "Lyophilisation",
					power: 70,
					type: "glace",
				},
			],
		},
		{
			number: 154,
			id: "meganium",
			name: "Méganium",
			type: "plante",
			weakness: ["feu", "glace", "poison", "vol", "insecte"],
			hp: {
				min: 80,
				max: 364,
			},
			attacks: [
				{
					name: "Lance-Soleil",
					type: "plante",
					power: 120,
				},
				{
					name: "Tempête Florale",
					type: "plante",
					power: 90,
				},
				{
					name: "Plaquage",
					type: "normal",
					power: 65,
				},
				{
					name: "Coupe",
					type: "normal",
					power: 50,
				},
			],
		},
		{
			number: 157,
			name: "Typhlosion",
			type: "feu",
			weakness: ["eau", "glace"],
			hp: {
				min: 78,
				max: 360,
			},
			attacks: [
				{
					name: "Éruption",
					type: "feu",
					power: 150,
				},
				{
					name: "Lance-Flammes",
					type: "feu",
					power: 90,
				},
				{
					name: "Météores",
					type: "normal",
					power: 60,
				},
				{
					name: "Vive-Attaque",
					type: "normal",
					power: 40,
				},
			],
		},
		{
			number: 160,
			id: "feraligatr",
			name: "Aligatueur",
			type: "eau",
			weakness: ["feu", "électrik"],
			hp: {
				min: 80,
				max: 374,
			},
			attacks: [
				{
					name: "Surpuissance",
					type: "combat",
					power: 120,
				},
				{
					name: "Hydrocanon",
					type: "eau",
					power: 110,
				},
				{
					name: "Mâchouille",
					type: "ténèbres",
					power: 60,
				},
				{
					name: "Morsure",
					type: "ténèbres",
					power: 60,
				},
			],
		},
		{
			number: 249,
			name: "Lugia",
			type: ["psy", "vol"],
			weakness: ["électrik", "glace", "roche", "spectre", "ténèbres"],
			hp: {
				min: 106,
				max: 416,
			},
			attacks: [
				{
					name: "Piqué",
					type: "vol",
					power: 140,
				},
				{
					name: "Hydrocanon",
					type: "eau",
					power: 120,
				},
				{
					name: "Draco-Charge",
					type: "dragon",
					power: 100,
				},
				{
					name: "Vol",
					type: "vol",
					power: 90,
				},
			],
		},
		{
			number: 251,
			name: "Celebi",
			type: ["psy", "plante"],
			weakness: [
				"feu",
				"glace",
				"poison",
				"vol",
				"insecte",
				"spectre",
				"ténèbres",
			],
			hp: {
				min: 100,
				max: 404,
			},
			attacks: [
				{
					name: "Tempête Verte",
					type: "plante",
					power: 130,
				},
				{
					name: "Prescience",
					type: "psy",
					power: 120,
				},
				{
					name: "Lance-Soleil",
					type: "plante",
					power: 120,
				},
				{
					name: "Choc Mental",
					type: "psy",
					power: 50,
				},
			],
		},
	] as Array<PokedexItem>
).map((pokemon) => {
	let new_pokemon = new Pokemon(pokemon.name, pokemon.type as PokemonType)
		.withId(pokemon.id)
		.withNumber(pokemon.number)
		.withMinimalLevel(pokemon.hp.min)
		.withMaximalLevel(pokemon.hp.max);

	for (let attack of pokemon.attacks) {
		new_pokemon = new_pokemon.withAttack({
			power: attack.power,
			name: attack.name,
			type: attack.type,
		});
	}

	return new_pokemon;
});

export const pokemons: Array<Pokemon> = [
	removeRandomArray(pokedex),
	removeRandomArray(pokedex),
	removeRandomArray(pokedex),
	removeRandomArray(pokedex),
];
