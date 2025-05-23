import { PokemonTypeEnum } from "./Pokemon.js";

export const EffectivenessEnum = {
	Forte: "forte",
	Faible: "faible",
	Normal: "normal",
	Rien: "rien",
};

export class Attack {
	// --------- //
	// Propriété //
	// --------- //

	/**
	 * ID de l'attaque.
	 * @type {number}
	 */
	#id;
	/**
	 * Le nom de l'attaque.
	 * @type {string}
	 */
	#name;
	/**
	 * La puissance de base de l'attaque.
	 * @type {number}
	 */
	#power;
	/**
	 * Les types de l'attaque.
	 * @type {Array<string>}
	 */
	#types;

	/**
	 * OffType: {
	 * 	DefType: Effectiveness
	 * }
	 */
	#effectiveness = {
		[PokemonTypeEnum.Acier]: {
			[PokemonTypeEnum.Acier]: EffectivenessEnum.Faible,
			[PokemonTypeEnum.Eau]: EffectivenessEnum.Faible,
			[PokemonTypeEnum.Feu]: EffectivenessEnum.Faible,
			[PokemonTypeEnum.Electrik]: EffectivenessEnum.Faible,

			[PokemonTypeEnum.Glace]: EffectivenessEnum.Forte,
			[PokemonTypeEnum.Roche]: EffectivenessEnum.Forte,
			[PokemonTypeEnum.Fee]: EffectivenessEnum.Forte,
		},

		[PokemonTypeEnum.Eau]: {
			[PokemonTypeEnum.Eau]: EffectivenessEnum.Faible,
			[PokemonTypeEnum.Dragon]: EffectivenessEnum.Faible,
			[PokemonTypeEnum.Plante]: EffectivenessEnum.Faible,

			[PokemonTypeEnum.Feu]: EffectivenessEnum.Forte,
			[PokemonTypeEnum.Sol]: EffectivenessEnum.Forte,
			[PokemonTypeEnum.Roche]: EffectivenessEnum.Forte,
		},

		[PokemonTypeEnum.Combat]: {
			[PokemonTypeEnum.Spectre]: EffectivenessEnum.Rien,

			[PokemonTypeEnum.Poison]: EffectivenessEnum.Faible,
			[PokemonTypeEnum.Vol]: EffectivenessEnum.Faible,
			[PokemonTypeEnum.Psy]: EffectivenessEnum.Faible,
			[PokemonTypeEnum.Insecte]: EffectivenessEnum.Faible,

			[PokemonTypeEnum.Acier]: EffectivenessEnum.Forte,
			[PokemonTypeEnum.Glace]: EffectivenessEnum.Forte,
			[PokemonTypeEnum.Normal]: EffectivenessEnum.Forte,
			[PokemonTypeEnum.Roche]: EffectivenessEnum.Forte,
			[PokemonTypeEnum.Tenebres]: EffectivenessEnum.Forte,
		},

		[PokemonTypeEnum.Dragon]: {
			[PokemonTypeEnum.Fee]: EffectivenessEnum.Rien,

			[PokemonTypeEnum.Acier]: EffectivenessEnum.Faible,

			[PokemonTypeEnum.Dragon]: EffectivenessEnum.Forte,
		},

		[PokemonTypeEnum.Electrik]: {
			[PokemonTypeEnum.Sol]: EffectivenessEnum.Rien,
			[PokemonTypeEnum.Dragon]: EffectivenessEnum.Faible,
			[PokemonTypeEnum.Glace]: EffectivenessEnum.Faible,
			[PokemonTypeEnum.Plante]: EffectivenessEnum.Faible,

			[PokemonTypeEnum.Eau]: EffectivenessEnum.Forte,
			[PokemonTypeEnum.Vol]: EffectivenessEnum.Forte,
		},

		[PokemonTypeEnum.Fee]: {
			[PokemonTypeEnum.Acier]: EffectivenessEnum.Faible,
			[PokemonTypeEnum.Feu]: EffectivenessEnum.Faible,
			[PokemonTypeEnum.Poison]: EffectivenessEnum.Faible,

			[PokemonTypeEnum.Combat]: EffectivenessEnum.Forte,
			[PokemonTypeEnum.Dragon]: EffectivenessEnum.Forte,
			[PokemonTypeEnum.Spectre]: EffectivenessEnum.Forte,
		},

		[PokemonTypeEnum.Feu]: {
			[PokemonTypeEnum.Dragon]: EffectivenessEnum.Faible,
			[PokemonTypeEnum.Eau]: EffectivenessEnum.Faible,
			[PokemonTypeEnum.Feu]: EffectivenessEnum.Faible,
			[PokemonTypeEnum.Roche]: EffectivenessEnum.Faible,

			[PokemonTypeEnum.Acier]: EffectivenessEnum.Forte,
			[PokemonTypeEnum.Glace]: EffectivenessEnum.Forte,
			[PokemonTypeEnum.Insecte]: EffectivenessEnum.Forte,
			[PokemonTypeEnum.Plante]: EffectivenessEnum.Forte,
		},

		[PokemonTypeEnum.Glace]: {
			[PokemonTypeEnum.Acier]: EffectivenessEnum.Faible,
			[PokemonTypeEnum.Eau]: EffectivenessEnum.Faible,
			[PokemonTypeEnum.Feu]: EffectivenessEnum.Faible,
			[PokemonTypeEnum.Glace]: EffectivenessEnum.Faible,

			[PokemonTypeEnum.Dragon]: EffectivenessEnum.Forte,
			[PokemonTypeEnum.Plante]: EffectivenessEnum.Forte,
			[PokemonTypeEnum.Sol]: EffectivenessEnum.Forte,
			[PokemonTypeEnum.Vol]: EffectivenessEnum.Forte,
		},

		[PokemonTypeEnum.Insecte]: {
			[PokemonTypeEnum.Feu]: EffectivenessEnum.Faible,
			[PokemonTypeEnum.Combat]: EffectivenessEnum.Faible,
			[PokemonTypeEnum.Poison]: EffectivenessEnum.Faible,
			[PokemonTypeEnum.Vol]: EffectivenessEnum.Faible,
			[PokemonTypeEnum.Spectre]: EffectivenessEnum.Faible,
			[PokemonTypeEnum.Acier]: EffectivenessEnum.Faible,
			[PokemonTypeEnum.Fee]: EffectivenessEnum.Faible,

			[PokemonTypeEnum.Dragon]: EffectivenessEnum.Forte,
			[PokemonTypeEnum.Plante]: EffectivenessEnum.Forte,
			[PokemonTypeEnum.Psy]: EffectivenessEnum.Forte,
		},

		[PokemonTypeEnum.Normal]: {
			[PokemonTypeEnum.Spectre]: EffectivenessEnum.Rien,
			[PokemonTypeEnum.Acier]: EffectivenessEnum.Faible,
			[PokemonTypeEnum.Roche]: EffectivenessEnum.Faible,
		},

		[PokemonTypeEnum.Plante]: {
			[PokemonTypeEnum.Acier]: EffectivenessEnum.Faible,
			[PokemonTypeEnum.Dragon]: EffectivenessEnum.Faible,
			[PokemonTypeEnum.Feu]: EffectivenessEnum.Faible,
			[PokemonTypeEnum.Insecte]: EffectivenessEnum.Faible,
			[PokemonTypeEnum.Plante]: EffectivenessEnum.Faible,
			[PokemonTypeEnum.Vol]: EffectivenessEnum.Faible,

			[PokemonTypeEnum.Eau]: EffectivenessEnum.Forte,
			[PokemonTypeEnum.Sol]: EffectivenessEnum.Forte,
			[PokemonTypeEnum.Roche]: EffectivenessEnum.Forte,
		},

		[PokemonTypeEnum.Poison]: {
			[PokemonTypeEnum.Poison]: EffectivenessEnum.Faible,
			[PokemonTypeEnum.Sol]: EffectivenessEnum.Faible,
			[PokemonTypeEnum.Roche]: EffectivenessEnum.Faible,
			[PokemonTypeEnum.Spectre]: EffectivenessEnum.Faible,

			[PokemonTypeEnum.Fee]: EffectivenessEnum.Forte,
			[PokemonTypeEnum.Plante]: EffectivenessEnum.Forte,
		},

		[PokemonTypeEnum.Psy]: {
			[PokemonTypeEnum.Tenebres]: EffectivenessEnum.Rien,

			[PokemonTypeEnum.Psy]: EffectivenessEnum.Faible,
			[PokemonTypeEnum.Acier]: EffectivenessEnum.Faible,

			[PokemonTypeEnum.Combat]: EffectivenessEnum.Forte,
			[PokemonTypeEnum.Poison]: EffectivenessEnum.Forte,
		},

		[PokemonTypeEnum.Roche]: {
			[PokemonTypeEnum.Combat]: EffectivenessEnum.Faible,
			[PokemonTypeEnum.Sol]: EffectivenessEnum.Faible,
			[PokemonTypeEnum.Acier]: EffectivenessEnum.Faible,

			[PokemonTypeEnum.Feu]: EffectivenessEnum.Forte,
			[PokemonTypeEnum.Glace]: EffectivenessEnum.Forte,
			[PokemonTypeEnum.Vol]: EffectivenessEnum.Forte,
			[PokemonTypeEnum.Insecte]: EffectivenessEnum.Forte,
		},

		[PokemonTypeEnum.Sol]: {
			[PokemonTypeEnum.Vol]: EffectivenessEnum.Rien,

			[PokemonTypeEnum.Insecte]: EffectivenessEnum.Faible,
			[PokemonTypeEnum.Plante]: EffectivenessEnum.Faible,

			[PokemonTypeEnum.Feu]: EffectivenessEnum.Forte,
			[PokemonTypeEnum.Electrik]: EffectivenessEnum.Forte,
			[PokemonTypeEnum.Poison]: EffectivenessEnum.Forte,
			[PokemonTypeEnum.Roche]: EffectivenessEnum.Forte,
			[PokemonTypeEnum.Acier]: EffectivenessEnum.Forte,
		},

		[PokemonTypeEnum.Spectre]: {
			[PokemonTypeEnum.Normal]: EffectivenessEnum.Rien,

			[PokemonTypeEnum.Tenebres]: EffectivenessEnum.Faible,

			[PokemonTypeEnum.Psy]: EffectivenessEnum.Forte,
			[PokemonTypeEnum.Roche]: EffectivenessEnum.Forte,
		},

		[PokemonTypeEnum.Tenebres]: {
			[PokemonTypeEnum.Combat]: EffectivenessEnum.Faible,
			[PokemonTypeEnum.Fee]: EffectivenessEnum.Faible,
			[PokemonTypeEnum.Tenebres]: EffectivenessEnum.Faible,

			[PokemonTypeEnum.Psy]: EffectivenessEnum.Forte,
			[PokemonTypeEnum.Spectre]: EffectivenessEnum.Forte,
		},

		[PokemonTypeEnum.Vol]: {
			[PokemonTypeEnum.Electrik]: EffectivenessEnum.Faible,
			[PokemonTypeEnum.Roche]: EffectivenessEnum.Faible,
			[PokemonTypeEnum.Acier]: EffectivenessEnum.Faible,

			[PokemonTypeEnum.Combat]: EffectivenessEnum.Forte,
			[PokemonTypeEnum.Insecte]: EffectivenessEnum.Forte,
			[PokemonTypeEnum.Vol]: EffectivenessEnum.Forte,
		},
	};

	// ----------- //
	// Constructor //
	// ----------- //

	/**
	 * @param {number} id
	 */
	constructor(id) {
		this.#id = id;
	}

	// --------------- //
	// Getter | Setter //
	// --------------- //

	getId() {
		return this.#id;
	}

	/**
	 * @param {string} name
	 */
	setName(name) {
		this.#name = name;
		return this;
	}

	getName() {
		return this.#name;
	}

	/**
	 * @param {number} power
	 */
	setPower(power) {
		this.#power = power;
		return this;
	}

	getPower() {
		return this.#power;
	}

	/**
	 * @param {Array<string>} types
	 */
	setTypes(types) {
		this.#types = types;
		return this;
	}

	getTypes() {
		return this.#types;
	}

	// ------- //
	// Méthode // -> Publique
	// ------- //

	/**
	 * Efficacité d'une attaque en fonction des types d'un pokemon.
	 * @param {Pokemon} pokemon
	 * @returns {"forte" | "normal" | "faible" | "rien"}
	 */
	effectiveness(pokemon) {
		let effect = (offType, defType) => {
			return this.#effectiveness[offType][defType] || EffectivenessEnum.Normal;
		};

		let choose = (es) => {
			let fo = es.find((e) => e === EffectivenessEnum.Forte);
			let no = es.find((e) => e === EffectivenessEnum.Normal);
			let fa = es.find((e) => e === EffectivenessEnum.Faible);
			let ri = es.find((e) => e === EffectivenessEnum.Rien);
			return fo || no || fa || ri || EffectivenessEnum.Normal;
		};

		return choose(this.#types.flatMap((t) => pokemon.getTypes().map((pt) => effect(t, pt))));
	}

	/**
	 * Calcule la puissance d'une attaque en fonction de:
	 *
	 * 	1. La différence de niveau des pokemon's
	 * 	2. Des types du défenseur et du type d'attaque.
	 *
	 * @param {Pokemon} attacker
	 * @param {Pokemon} defender
	 * @returns {number}
	 */
	calcPower(attacker, defender) {
		let levelDiff = attacker.getLevel() - defender.getLevel();
		let power = this.getPower();

		switch (this.effectiveness(defender)) {
			// Puissance d'attaque x2
			case EffectivenessEnum.Forte:
				power *= 2;
				power += levelDiff * 0.1;
				break;
			// Puissance normale
			case EffectivenessEnum.Normal:
				power += levelDiff * 0.135;
				break;
			// Puissance d'attaque /2
			case EffectivenessEnum.Faible:
				power /= 2;
				power -= levelDiff * 0.2;
				break;
			// Aucun effet sur le pokemon
			case EffectivenessEnum.Rien:
				power = 0;
				break;
		}

		return power;
	}
}

/**
 * @typedef {import("./Pokemon.js").Pokemon} Pokemon
 */
