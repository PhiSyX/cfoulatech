/** Pokemons */

import { Pokemon } from "./Pokemon.ts";
import { PokemonTypeEnum, type PokemonType } from "./PokermonType.ts";
import { randomNumber, removeRandomArray } from "../utils/helpers.ts";

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
			type: PokemonTypeEnum.Electrik,
			weakness: [PokemonTypeEnum.Sol],
			hp: {
				min: 35,
				max: 274,
			},
			attacks: [
				{
					name: "Fatal-Foudre",
					power: 110,
					type: PokemonTypeEnum.Electrik,
				},
				{
					name: "Queue de fer",
					power: 100,
					type: PokemonTypeEnum.Acier,
				},
				{
					name: "Tonnerre",
					power: 90,
					type: PokemonTypeEnum.Electrik,
				},
				{
					name: "Plaquage",
					power: 85,
					type: PokemonTypeEnum.Normal,
				},
			],
		},
		{
			number: 150,
			name: "Mewtwo",
			type: PokemonTypeEnum.Psy,
			weakness: [PokemonTypeEnum.Insecte, PokemonTypeEnum.Spectre, PokemonTypeEnum.Tenebres],
			hp: {
				min: 106,
				max: 416,
			},
			attacks: [
				{
					name: "Psyko",
					power: 90,
					type: PokemonTypeEnum.Psy,
				},
				{
					name: "Frappe Psy",
					power: 100,
					type: PokemonTypeEnum.Psy,
				},
				{
					name: "Choc Mental",
					power: 50,
					type: PokemonTypeEnum.Psy,
				},
				{
					name: "Rafale Psy",
					power: 65,
					type: PokemonTypeEnum.Psy,
				},
			],
		},
		{
			number: 144,
			id: "articuno",
			name: "Artikodin",
			type: [PokemonTypeEnum.Glace, PokemonTypeEnum.Vol],
			weakness: [PokemonTypeEnum.Feu, PokemonTypeEnum.Electrik, PokemonTypeEnum.Roche, PokemonTypeEnum.Acier],
			hp: {
				min: 90,
				max: 384,
			},
			attacks: [
				{
					name: "Blizzard",
					power: 110,
					type: PokemonTypeEnum.Glace,
				},
				{
					name: "Vent Violent",
					power: 110,
					type: PokemonTypeEnum.Vol,
				},
				{
					name: "Laser Glace",
					power: 90,
					type: PokemonTypeEnum.Glace,
				},
				{
					name: "Lyophilisation",
					power: 70,
					type: PokemonTypeEnum.Glace,
				},
			],
		},
		{
			number: 154,
			id: "meganium",
			name: "Méganium",
			type: PokemonTypeEnum.Plante,
			weakness: [
				PokemonTypeEnum.Feu,
				PokemonTypeEnum.Glace,
				PokemonTypeEnum.Poison,
				PokemonTypeEnum.Vol,
				PokemonTypeEnum.Insecte,
			],
			hp: {
				min: 80,
				max: 364,
			},
			attacks: [
				{
					name: "Lance-Soleil",
					type: PokemonTypeEnum.Plante,
					power: 120,
				},
				{
					name: "Tempête Florale",
					type: PokemonTypeEnum.Plante,
					power: 90,
				},
				{
					name: "Plaquage",
					type: PokemonTypeEnum.Normal,
					power: 65,
				},
				{
					name: "Coupe",
					type: PokemonTypeEnum.Normal,
					power: 50,
				},
			],
		},
		{
			number: 157,
			name: "Typhlosion",
			type: PokemonTypeEnum.Feu,
			weakness: [PokemonTypeEnum.Eau, PokemonTypeEnum.Glace],
			hp: {
				min: 78,
				max: 360,
			},
			attacks: [
				{
					name: "Éruption",
					type: PokemonTypeEnum.Feu,
					power: 150,
				},
				{
					name: "Lance-Flammes",
					type: PokemonTypeEnum.Feu,
					power: 90,
				},
				{
					name: "Météores",
					type: PokemonTypeEnum.Normal,
					power: 60,
				},
				{
					name: "Vive-Attaque",
					type: PokemonTypeEnum.Normal,
					power: 40,
				},
			],
		},
		{
			number: 160,
			id: "feraligatr",
			name: "Aligatueur",
			type: PokemonTypeEnum.Eau,
			weakness: [PokemonTypeEnum.Feu, PokemonTypeEnum.Electrik],
			hp: {
				min: 80,
				max: 374,
			},
			attacks: [
				{
					name: "Surpuissance",
					type: PokemonTypeEnum.Combat,
					power: 120,
				},
				{
					name: "Hydrocanon",
					type: PokemonTypeEnum.Eau,
					power: 110,
				},
				{
					name: "Mâchouille",
					type: PokemonTypeEnum.Tenebres,
					power: 60,
				},
				{
					name: "Morsure",
					type: PokemonTypeEnum.Tenebres,
					power: 60,
				},
			],
		},
		{
			number: 249,
			name: "Lugia",
			type: [PokemonTypeEnum.Psy, PokemonTypeEnum.Vol],
			weakness: [
				PokemonTypeEnum.Electrik,
				PokemonTypeEnum.Glace,
				PokemonTypeEnum.Roche,
				PokemonTypeEnum.Spectre,
				PokemonTypeEnum.Tenebres,
			],
			hp: {
				min: 106,
				max: 416,
			},
			attacks: [
				{
					name: "Piqué",
					type: PokemonTypeEnum.Vol,
					power: 140,
				},
				{
					name: "Hydrocanon",
					type: PokemonTypeEnum.Eau,
					power: 120,
				},
				{
					name: "Draco-Charge",
					type: PokemonTypeEnum.Dragon,
					power: 100,
				},
				{
					name: PokemonTypeEnum.Vol,
					type: PokemonTypeEnum.Vol,
					power: 90,
				},
			],
		},
		{
			number: 251,
			name: "Celebi",
			type: [PokemonTypeEnum.Psy, PokemonTypeEnum.Plante],
			weakness: [
				PokemonTypeEnum.Feu,
				PokemonTypeEnum.Glace,
				PokemonTypeEnum.Poison,
				PokemonTypeEnum.Vol,
				PokemonTypeEnum.Insecte,
				PokemonTypeEnum.Spectre,
				PokemonTypeEnum.Tenebres,
			],
			hp: {
				min: 100,
				max: 404,
			},
			attacks: [
				{
					name: "Tempête Verte",
					type: PokemonTypeEnum.Plante,
					power: 130,
				},
				{
					name: "Prescience",
					type: PokemonTypeEnum.Psy,
					power: 120,
				},
				{
					name: "Lance-Soleil",
					type: PokemonTypeEnum.Plante,
					power: 120,
				},
				{
					name: "Choc Mental",
					type: PokemonTypeEnum.Psy,
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
		.withMaximalLevel(pokemon.hp.max)
		.withLevel(randomNumber(5, 100));

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
