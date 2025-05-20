import type { AttackStore } from "../../domain/stores/AttackStore.ts";
import { Attack } from "../../domain/entities/Attack.ts";
import {
	AttackNotFoundError,
} from "../../domain/errors/AttackNotFoundError.ts";
import {
	AttackNotAvailableError,
} from "../../domain/errors/AttackNotAvailableError.ts";
import {
	PokemonTypeEnum,
	type PokemonTypeVariant,
} from "../../domain/entities/Pokemon.ts";

interface AttackItem {
	id: number;
	name: string;
	power: number;
	types: Array<PokemonTypeVariant>;
}

export class MyAttackStore implements AttackStore {
	#dataset: Array<AttackItem> = [
		{
			id: 1,
			name: "Fatal-Foudre",
			power: 110,
			types: [PokemonTypeEnum.Electrik],
		},
		{
			id: 2,
			name: "Queue de fer",
			power: 100,
			types: [PokemonTypeEnum.Acier],
		},
		{
			id: 3,
			name: "Tonnerre",
			power: 90,
			types: [PokemonTypeEnum.Electrik],
		},
		{
			id: 4,
			name: "Plaquage",
			power: 85,
			types: [PokemonTypeEnum.Normal],
		},

		{
			id: 5,
			name: "Psyko",
			power: 90,
			types: [PokemonTypeEnum.Psy],
		},
		{
			id: 6,
			name: "Frappe Psy",
			power: 100,
			types: [PokemonTypeEnum.Psy],
		},
		{
			id: 7,
			name: "Choc Mental",
			power: 50,
			types: [PokemonTypeEnum.Psy],
		},
		{
			id: 8,
			name: "Rafale Psy",
			power: 65,
			types: [PokemonTypeEnum.Psy],
		},

		{
			id: 9,
			name: "Blizzard",
			power: 110,
			types: [PokemonTypeEnum.Glace],
		},
		{
			id: 10,
			name: "Vent Violent",
			power: 110,
			types: [PokemonTypeEnum.Vol],
		},
		{
			id: 11,
			name: "Laser Glace",
			power: 90,
			types: [PokemonTypeEnum.Glace],
		},
		{
			id: 12,
			name: "Lyophilisation",
			power: 70,
			types: [PokemonTypeEnum.Glace],
		},

		{
			id: 13,
			name: "Lance-Soleil",
			types: [PokemonTypeEnum.Plante],
			power: 120,
		},
		{
			id: 14,
			name: "Tempête Florale",
			types: [PokemonTypeEnum.Plante],
			power: 90,
		},
		{
			id: 16,
			name: "Coupe",
			types: [PokemonTypeEnum.Normal],
			power: 50,
		},

		{
			id: 17,
			name: "Éruption",
			types: [PokemonTypeEnum.Feu],
			power: 150,
		},
		{
			id: 18,
			name: "Lance-Flammes",
			types: [PokemonTypeEnum.Feu],
			power: 90,
		},
		{
			id: 19,
			name: "Météores",
			types: [PokemonTypeEnum.Normal],
			power: 60,
		},
		{
			id: 20,
			name: "Vive-Attaque",
			types: [PokemonTypeEnum.Normal],
			power: 40,
		},

		{
			id: 21,
			name: "Surpuissance",
			types: [PokemonTypeEnum.Combat],
			power: 120,
		},
		{
			id: 22,
			name: "Hydrocanon",
			types: [PokemonTypeEnum.Eau],
			power: 110,
		},
		{
			id: 23,
			name: "Mâchouille",
			types: [PokemonTypeEnum.Tenebres],
			power: 60,
		},
		{
			id: 24,
			name: "Morsure",
			types: [PokemonTypeEnum.Tenebres],
			power: 60,
		},

		{
			id: 25,
			name: "Piqué",
			types: [PokemonTypeEnum.Vol],
			power: 140,
		},
		{
			id: 27,
			name: "Draco-Charge",
			types: [PokemonTypeEnum.Dragon],
			power: 100,
		},
		{
			id: 28,
			name: PokemonTypeEnum.Vol,
			types: [PokemonTypeEnum.Vol],
			power: 90,
		},

		{
			id: 29,
			name: "Tempête Verte",
			types: [PokemonTypeEnum.Plante],
			power: 130,
		},
		{
			id: 30,
			name: "Prescience",
			types: [PokemonTypeEnum.Psy],
			power: 120,
		},
	];

	all(): Array<Attack> {
		return this.#dataset.map((attack) => {
			return (new Attack(attack.id))
				.setName(attack.name)
				.setTypes(attack.types)
				.setPower(attack.power)
		});
	}

	fromPokemon(ids: Array<number>): Array<Attack> {
		return this.#dataset.filter((attack) => ids.includes(attack.id)).map((attack) => {
			return (new Attack(attack.id))
				.setName(attack.name)
				.setTypes(attack.types)
				.setPower(attack.power)
		});
	}

	/**
	 * @throws {AttackNotFoundError}
	 */
	findByName(name: string, attacksIds: Array<number> = []): Attack {
		let record = this.#dataset.find((item) => item.name === name);
		if (typeof record === "undefined") {
			throw new AttackNotFoundError(name);
		}
		if (!attacksIds.includes(record.id)) {
			throw new AttackNotAvailableError(name);
		}
		return (new Attack(record.id))
			.setName(record.name)
			.setTypes(record.types)
			.setPower(record.power);
	}
}
