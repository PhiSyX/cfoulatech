export const PokemonTypeEnum = {
	Acier: "acier",
	Eau: "eau",
	Combat: "combat",
	Dragon: "dragon",
	Electrik: "électrik",
	Fee: "fée",
	Feu: "feu",
	Glace: "glace",
	Insecte: "insecte",
	Normal: "normal",
	Plante: "plante",
	Poison: "poison",
	Psy: "psy",
	Roche: "roche",
	Sol: "sol",
	Spectre: "spectre",
	Tenebres: "ténèbres",
	Vol: "vol",
};

export type PokemonTypeVariant =
	(typeof PokemonTypeEnum)[keyof typeof PokemonTypeEnum];

export type PokemonType = PokemonTypeVariant | Array<PokemonTypeVariant>;
