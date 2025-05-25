import { PokemonTypeEnum } from "./Pokemon.js";

/**
 * Les différentes efficacités d'attaques.
 */
export const EffectivenessEnum = {
	Forte: "forte",
	Faible: "faible",
	Normal: "normal",
	Rien: "rien",
};

/**
 * Classe représentant une attaque.
 */
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
	 * @type {Array<PokemonTypeEnumVariant>}
	 */
	#types;

	/**
	 * OffType: {
	 * 		DefType: Effectiveness
	 * }
	 * 
	 * @type {Effectiveness}
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
	 * Construit la classe Attack.
	 * @param {number} id - ID de l'attaque
	 */
	constructor(id) {
		this.#id = id;
	}

	// --------------- //
	// Getter | Setter //
	// --------------- //

	/**
	 * ID de l'attaque
	 * @returns {number}
	 */
	getId() {
		return this.#id;
	}

	/**
	 * Nom de l'attaque.
	 * @returns {string}
	 */
	getName() {
		return this.#name;
	}


	/**
	 * Défini le nom de l'attaque.
	 * @param {string} name
	 * @returns {Attack}
	 */
	setName(name) {
		this.#name = name;
		return this;
	}

	/**
	 * Puissance de base de l'attaque.
	 * @returns {number}
	 */
	getPower() {
		return this.#power;
	}

	/**
	 * Défini la puissance de base de l'attaque.
	 * @param {number} power
	 * @returns {Attack}
	 */
	setPower(power) {
		this.#power = power;
		return this;
	}

	/**
	 * Les types de l'attaques.
	 * @returns {Array<PokemonTypeEnumVariant>}
	 */
	getTypes() {
		return this.#types;
	}

	/**
	 * Défini les types de l'attaque.
	 * @param {Array<PokemonTypeEnumVariant>} types
	 * @returns {Attack}
	 */
	setTypes(types) {
		this.#types = types;
		return this;
	}

	// ------- //
	// Méthode // → Publique
	// ------- //

	/**
	 * Efficacité d'une attaque en fonction des types d'un pokemon.
	 * @param {Pokemon} pokemon
	 * @returns {EffectivenessEnumVariant}
	 */
	effectiveness(pokemon) {
		/**
		 * Récupère l'efficacité d'une attaque.
		 * @param {PokemonTypeEnumVariant} offType
		 * @param {PokemonTypeEnumVariant} defType
		 * @returns {EffectivenessEnumVariant}
		 */
		const getEffectiveness = (offType, defType) => {
			return this.#effectiveness[offType][defType] || EffectivenessEnum.Normal;
		};

		/**
		 * Choisis l'efficacité la plus importe pour une attaque vers la moins importante.
		 * @param {Array<EffectivenessEnumVariant>} $enum
		 * @returns {EffectivenessEnumVariant}
		 */
		const chooseEffectiveness = ($enum) => {
			return $enum.find((variant) =>
				variant === EffectivenessEnum.Forte ||
				variant === EffectivenessEnum.Normal ||
				variant === EffectivenessEnum.Faible ||
				variant === EffectivenessEnum.Rien
			) || EffectivenessEnum.Normal;
		};

		return chooseEffectiveness(
			this.#types.flatMap((offType) => 
				pokemon.getTypes().map((defType) => getEffectiveness(offType, defType))
			)
		);
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
 * @typedef {import("./Pokemon.js").PokemonTypeEnum} PokemonTypeEnum
 *
 * @typedef {typeof PokemonTypeEnum[keyof typeof PokemonTypeEnum]} PokemonTypeEnumVariant
 *
 * @typedef {{
 * 		[O in PokemonTypeEnumVariant]: {
 * 			[D in PokemonTypeEnumVariant]: EffectivenessEnumVariant
 * 		}
 * }} Effectiveness
 *
 * @typedef {typeof EffectivenessEnum[keyof typeof EffectivenessEnum]} EffectivenessEnumVariant
 */
