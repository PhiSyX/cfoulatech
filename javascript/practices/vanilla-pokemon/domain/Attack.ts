import { type PokemonType, type PokemonTypeVariant, PokemonTypeEnum } from "./PokermonType.ts";

import type { Pokemon } from "./Pokemon.ts";

export const EffectivenessEnum = {
	Forte: "forte",
	Faible: "faible",
	Normal: "normal",
	Rien: "rien",
} as const;

export type EffectivenessVariant = (typeof EffectivenessEnum)[keyof typeof EffectivenessEnum];

export interface AttackProps {
	name: string;
	power: number;
	type: PokemonType;
}

export class Attack implements AttackProps {
	public readonly name: AttackProps["name"];
	public readonly power: AttackProps["power"];
	public readonly type: AttackProps["type"];

	constructor(name: AttackProps["name"], power: AttackProps["power"], type: AttackProps["type"]) {
		this.name = name;
		this.power = power;
		this.type = type;
	}

	calcPower(attacker: Pokemon, defender: Pokemon): number {
		let levelDiff = attacker.getLevel() - defender.getLevel();

		let power = this.power;
		switch (this.effectiveness(defender.getType())) {
			case EffectivenessEnum.Forte:
				power *= 2;
				power += levelDiff * 0.1;
				break;

			case EffectivenessEnum.Normal:
				power += levelDiff * 0.135;
				break;

			case EffectivenessEnum.Faible:
				power /= 2;
				power -= levelDiff * 0.2;
				break;

			case EffectivenessEnum.Rien:
				power = 0;
				break;
		}

		return power;
	}

	effectiveness(pokemonType: PokemonType): EffectivenessVariant {
		let effect = (offType: PokemonTypeVariant, defType: PokemonTypeVariant) => {
			switch (offType) {
				case PokemonTypeEnum.Acier:
					switch (defType) {
						case PokemonTypeEnum.Acier:
						case PokemonTypeEnum.Eau:
						case PokemonTypeEnum.Feu:
						case PokemonTypeEnum.Electrik:
							return EffectivenessEnum.Faible;
						case PokemonTypeEnum.Glace:
						case PokemonTypeEnum.Roche:
						case PokemonTypeEnum.Fee:
							return EffectivenessEnum.Forte;
					}
					break;

				case PokemonTypeEnum.Eau:
					switch (defType) {
						case PokemonTypeEnum.Eau:
						case PokemonTypeEnum.Dragon:
						case PokemonTypeEnum.Plante:
							return EffectivenessEnum.Faible;
						case PokemonTypeEnum.Feu:
						case PokemonTypeEnum.Sol:
						case PokemonTypeEnum.Roche:
							return EffectivenessEnum.Forte;
					}
					break;

				case PokemonTypeEnum.Combat:
					switch (defType) {
						case PokemonTypeEnum.Spectre:
							return EffectivenessEnum.Rien;
						case PokemonTypeEnum.Poison:
						case PokemonTypeEnum.Vol:
						case PokemonTypeEnum.Psy:
						case PokemonTypeEnum.Insecte:
							return EffectivenessEnum.Faible;
						case PokemonTypeEnum.Acier:
						case PokemonTypeEnum.Glace:
						case PokemonTypeEnum.Normal:
						case PokemonTypeEnum.Roche:
						case PokemonTypeEnum.Tenebres:
							return EffectivenessEnum.Forte;
					}
					break;

				case PokemonTypeEnum.Dragon:
					switch (defType) {
						case PokemonTypeEnum.Fee:
							return EffectivenessEnum.Rien;
						case PokemonTypeEnum.Acier:
							return EffectivenessEnum.Faible;
						case PokemonTypeEnum.Dragon:
							return EffectivenessEnum.Forte;
					}
					break;

				case PokemonTypeEnum.Electrik:
					switch (defType) {
						case PokemonTypeEnum.Sol:
							return EffectivenessEnum.Rien;
						case PokemonTypeEnum.Dragon:
						case PokemonTypeEnum.Glace:
						case PokemonTypeEnum.Plante:
							return EffectivenessEnum.Faible;
						case PokemonTypeEnum.Eau:
						case PokemonTypeEnum.Vol:
							return EffectivenessEnum.Forte;
					}
					break;

				case PokemonTypeEnum.Fee:
					switch (defType) {
						case PokemonTypeEnum.Acier:
						case PokemonTypeEnum.Feu:
						case PokemonTypeEnum.Poison:
							return EffectivenessEnum.Faible;
						case PokemonTypeEnum.Combat:
						case PokemonTypeEnum.Dragon:
						case PokemonTypeEnum.Spectre:
							return EffectivenessEnum.Forte;
					}
					break;

				case PokemonTypeEnum.Feu:
					switch (defType) {
						case PokemonTypeEnum.Dragon:
						case PokemonTypeEnum.Eau:
						case PokemonTypeEnum.Feu:
						case PokemonTypeEnum.Roche:
							return EffectivenessEnum.Faible;
						case PokemonTypeEnum.Acier:
						case PokemonTypeEnum.Glace:
						case PokemonTypeEnum.Insecte:
						case PokemonTypeEnum.Plante:
							return EffectivenessEnum.Forte;
					}
					break;

				case PokemonTypeEnum.Glace:
					switch (defType) {
						case PokemonTypeEnum.Acier:
						case PokemonTypeEnum.Eau:
						case PokemonTypeEnum.Feu:
						case PokemonTypeEnum.Glace:
							return EffectivenessEnum.Faible;
						case PokemonTypeEnum.Dragon:
						case PokemonTypeEnum.Plante:
						case PokemonTypeEnum.Sol:
						case PokemonTypeEnum.Vol:
							return EffectivenessEnum.Forte;
					}
					break;

				case PokemonTypeEnum.Insecte:
					switch (defType) {
						case PokemonTypeEnum.Feu:
						case PokemonTypeEnum.Combat:
						case PokemonTypeEnum.Poison:
						case PokemonTypeEnum.Vol:
						case PokemonTypeEnum.Spectre:
						case PokemonTypeEnum.Acier:
						case PokemonTypeEnum.Fee:
							return EffectivenessEnum.Faible;
						case PokemonTypeEnum.Dragon:
						case PokemonTypeEnum.Plante:
						case PokemonTypeEnum.Psy:
							return EffectivenessEnum.Forte;
					}
					break;

				case PokemonTypeEnum.Normal:
					switch (defType) {
						case PokemonTypeEnum.Spectre:
							return EffectivenessEnum.Rien;
						case PokemonTypeEnum.Acier:
						case PokemonTypeEnum.Roche:
							return EffectivenessEnum.Faible;
					}
					break;

				case PokemonTypeEnum.Plante:
					switch (defType) {
						case PokemonTypeEnum.Acier:
						case PokemonTypeEnum.Dragon:
						case PokemonTypeEnum.Feu:
						case PokemonTypeEnum.Insecte:
						case PokemonTypeEnum.Plante:
						case PokemonTypeEnum.Vol:
							return EffectivenessEnum.Faible;
						case PokemonTypeEnum.Eau:
						case PokemonTypeEnum.Sol:
						case PokemonTypeEnum.Roche:
							return EffectivenessEnum.Forte;
					}
					break;

				case PokemonTypeEnum.Poison:
					switch (defType) {
						case PokemonTypeEnum.Poison:
						case PokemonTypeEnum.Sol:
						case PokemonTypeEnum.Roche:
						case PokemonTypeEnum.Spectre:
							return EffectivenessEnum.Faible;
						case PokemonTypeEnum.Fee:
						case PokemonTypeEnum.Plante:
							return EffectivenessEnum.Forte;
					}
					break;

				case PokemonTypeEnum.Psy:
					switch (defType) {
						case PokemonTypeEnum.Tenebres:
							return EffectivenessEnum.Rien;
						case PokemonTypeEnum.Psy:
						case PokemonTypeEnum.Acier:
							return EffectivenessEnum.Faible;
						case PokemonTypeEnum.Combat:
						case PokemonTypeEnum.Poison:
							return EffectivenessEnum.Forte;
					}
					break;

				case PokemonTypeEnum.Roche:
					switch (defType) {
						case PokemonTypeEnum.Combat:
						case PokemonTypeEnum.Sol:
						case PokemonTypeEnum.Acier:
							return EffectivenessEnum.Faible;
						case PokemonTypeEnum.Feu:
						case PokemonTypeEnum.Glace:
						case PokemonTypeEnum.Vol:
						case PokemonTypeEnum.Insecte:
							return EffectivenessEnum.Forte;
					}
					break;

				case PokemonTypeEnum.Sol:
					switch (defType) {
						case PokemonTypeEnum.Vol:
							return EffectivenessEnum.Rien;
						case PokemonTypeEnum.Insecte:
						case PokemonTypeEnum.Plante:
							return EffectivenessEnum.Faible;
						case PokemonTypeEnum.Feu:
						case PokemonTypeEnum.Electrik:
						case PokemonTypeEnum.Poison:
						case PokemonTypeEnum.Roche:
						case PokemonTypeEnum.Acier:
							return EffectivenessEnum.Forte;
					}
					break;

				case PokemonTypeEnum.Spectre:
					switch (defType) {
						case PokemonTypeEnum.Normal:
							return EffectivenessEnum.Rien;
						case PokemonTypeEnum.Tenebres:
							return EffectivenessEnum.Faible;
						case PokemonTypeEnum.Psy:
						case PokemonTypeEnum.Roche:
							return EffectivenessEnum.Forte;
					}
					break;

				case PokemonTypeEnum.Tenebres:
					switch (defType) {
						case PokemonTypeEnum.Combat:
						case PokemonTypeEnum.Fee:
						case PokemonTypeEnum.Tenebres:
							return EffectivenessEnum.Faible;
						case PokemonTypeEnum.Psy:
						case PokemonTypeEnum.Spectre:
							return EffectivenessEnum.Forte;
					}
					break;

				case PokemonTypeEnum.Vol:
					switch (defType) {
						case PokemonTypeEnum.Electrik:
						case PokemonTypeEnum.Roche:
						case PokemonTypeEnum.Acier:
							return EffectivenessEnum.Faible;
						case PokemonTypeEnum.Combat:
						case PokemonTypeEnum.Insecte:
						case PokemonTypeEnum.Vol:
							return EffectivenessEnum.Forte;
					}
					break;
			}
			return EffectivenessEnum.Normal;
		};

		let choose = (es: Array<EffectivenessVariant>) => {
			let fo = es.find((e) => e === EffectivenessEnum.Forte);
			let no = es.find((e) => e === EffectivenessEnum.Normal);
			let fa = es.find((e) => e === EffectivenessEnum.Faible);
			let ri = es.find((e) => e === EffectivenessEnum.Rien);
			return fo || no || fa || ri || EffectivenessEnum.Normal;
		};

		if (Array.isArray(this.type)) {
			let effectiveness = this.type.flatMap((t) => {
				if (Array.isArray(pokemonType)) return pokemonType.map((pt) => effect(t, pt));
				return effect(t, pokemonType);
			});
			return choose(effectiveness);
		}

		if (Array.isArray(pokemonType)) {
			let effectiveness = pokemonType.map((pt) => effect(this.type, pt));
			return choose(effectiveness);
		}

		return effect(this.type, pokemonType);
	}
}
