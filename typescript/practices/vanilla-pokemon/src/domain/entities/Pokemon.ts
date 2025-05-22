import { minmax } from "../../shared/helpers.js";

export class Pokemon {
	#id?: number;
	#nameFR!: string;
	#nameEN!: string;
	#attacks: Array<number> = [];
	#minHp: number = 0;
	#hp: number = 0;
	#maxHp: number = 0;

	#level!: number;
	#types!: Array<PokemonTypeVariant>;

	constructor(id?: number) {
		this.#id = id;
	}

	getId(): number {
		return this.#id!;
	}

	setName(fr: string, en?: string): this {
		this.#nameFR = fr;
		this.#nameEN = fr;
		if (en) {
			this.#nameEN = en;
		}
		return this;
	}

	getName(options: { lang: "fr" | "en" } = { lang: "fr" }): string {
		if (options?.lang === "en") {
			return this.#nameEN;
		}
		return this.#nameFR;
	}

	getAttacks(): Array<number> {
		return this.#attacks;
	}

	setAttacks(attacks: Array<number>): this {
		this.#attacks = attacks;
		return this;
	}

	getHitPoints(): number {
		return this.#hp;
	}

	setMinHp(minHp: number): this {
		this.#minHp = minHp;
		return this;
	}

	setHitPoints(hp: number): this {
		this.#hp = hp;
		return this;
	}

	setMaxHp(maxHp: number): this {
		this.#maxHp = maxHp;
		return this;
	}

	getLevel(): number {
		return this.#level;
	}

	setLevel(level: number): this {
		this.#level = level;
		this.#hp = this.maxHealth();
		return this;
	}

	getTypes(): Array<PokemonTypeVariant> {
		return this.#types;
	}

	setTypes(types: Array<PokemonTypeVariant>): this {
		this.#types = types;
		return this;
	}

	maxHealth(): number {
		const minLevel = 5;
		const maxLevel = 100;
		if (this.#level < minLevel) return this.#minHp;
		if (this.#level > maxLevel) return this.#maxHp;
		const ratio = (this.#level - minLevel) / (maxLevel - minLevel);
		const hp = this.#minHp + ratio * (this.#maxHp - this.#minHp);
		if (Number.isNaN(hp)) return this.#minHp;
		return minmax(hp, this.#minHp, this.#maxHp);
	}

	isAlive(): boolean {
		return this.#hp > 0;
	}
}

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

export type PokemonTypeVariant = (typeof PokemonTypeEnum)[keyof typeof PokemonTypeEnum];
