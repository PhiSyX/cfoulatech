import type { AttackStore } from "../src/domain/stores/AttackStore.ts";
import { Attack } from "../src/domain/entities/Attack.ts";
import { AttackNotFoundError } from "../src/domain/errors/AttackNotFoundError.ts";
import { AttackNotAvailableError } from "../src/domain/errors/AttackNotAvailableError.ts";
import { PokemonTypeEnum } from "../src/domain/entities/Pokemon.ts";

export class FakeAttackStore implements AttackStore {
	#dataset: Array<Attack> = [
		new Attack(1)
			.setName("Hydrocanon")
			.setTypes([PokemonTypeEnum.Eau])
			.setPower(110),
		new Attack(2)
			.setName("Déflagration")
			.setTypes([PokemonTypeEnum.Feu])
			.setPower(110),
	];

	all(): Array<Attack> {
		return this.#dataset;
	}

	/**
	 * @throws {AttackNotFoundError}
	 */
	findByName(name: string, attacksIds: Array<number> = []): Attack {
		let record = this.#dataset.find((item) => item.getName() === name);
		if (typeof record === "undefined") {
			throw new AttackNotFoundError(name);
		}
		if (attacksIds.length && !attacksIds.includes(record.getId())) {
			throw new AttackNotAvailableError(name);
		}
		return record;
	}

	fromPokemon(ids: Array<number>): Array<Attack> {
		return this.#dataset.filter((attack) => ids.includes(attack.getId()));
	}
}
