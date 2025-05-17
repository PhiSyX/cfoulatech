import type { PokemonType } from "./PokermonType.ts";
import { Attack, type AttackProps } from "./Attack.ts";

export class Pokemon {
	private id?: string;
	private readonly name: string;
	private readonly type: PokemonType;

	private minHp: number = 0;
	private hp: number = 0;
	private maxHp: number = 0;

	protected currentLevel: number = 0;

	private readonly attackList: Map<AttackProps["name"], Attack> = new Map();
	private number!: number;

	constructor(name: string, type: PokemonType) {
		this.name = name;
		this.type = type;
	}

	withId(id?: string): this {
		this.id = id;
		return this;
	}

	withAttack(attack: AttackProps): this {
		this.attackList.set(
			attack.name,
			new Attack(attack.name, attack.power, attack.type),
		);
		return this;
	}

	withLevel(level: number): this {
		this.currentLevel = level;
		this.hp = this.maxHealth();
		return this;
	}

	withMinimalLevel(health: number): this {
		this.minHp = health;
		this.hp = this.maxHealth();
		return this;
	}

	withMaximalLevel(health: number): this {
		this.maxHp = health;
		this.hp = this.maxHealth();
		return this;
	}

	withNumber(n: number): this {
		this.number = n;
		return this;
	}

	getAttack(name: string): Attack | null {
		return this.attackList.get(name) || null;
	}

	getAttacks(): Array<Attack> {
		return Array.from(this.attackList.values());
	}

	getId(): string {
		return this.id || this.name.toLowerCase();
	}

	getName(): string {
		return this.name;
	}

	getType(): PokemonType {
		return this.type;
	}

	getCry(): [id: string, url: string] {
		return [
			`cry-${this.getId()}`,
			`https://play.pokemonshowdown.com/audio/cries/${this.getId()}.mp3`,
		];
	}

	getPicture(): string {
		let n = this.number.toString().padStart(3, "0");
		return `https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/detail/${n}.png`;
	}

	getGif(): string {
		let n = this.number;
		return `https://www.shinyhunters.com/images/regular/${n}.gif`;
	}

	getHitPoints(): number {
		return this.hp;
	}

	getLevel(): number {
		return this.currentLevel;
	}

	isAlive(): boolean {
		return this.hp > 0;
	}

	maxHealth(): number {
		const minLevel = 5;
		const maxLevel = 100;
		if (this.currentLevel < minLevel) return this.minHp;
		if (this.currentLevel > maxLevel) return this.maxHp;
		const ratio = (this.currentLevel - minLevel) / (maxLevel - minLevel);
		const hp = this.minHp + ratio * (this.maxHp - this.minHp);
		if (Number.isNaN(hp)) return this.minHp;
		return hp;
	}

	attack(defender: Pokemon, attack: Attack): boolean {
		defender.defend(this, attack);
		return true;
	}

	defend(attacker: Pokemon, attack: Attack): boolean {
		this.hp -= attack.calcPower(attacker, this);
		return this.isAlive();
	}
}
