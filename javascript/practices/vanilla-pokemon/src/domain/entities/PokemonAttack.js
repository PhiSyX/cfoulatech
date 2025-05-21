// @ts-nocheck

export class PokemonAttack
{
	#pokemon;
	#attack;

	constructor(pokemon, attack)
	{
		this.#pokemon = pokemon;
		this.#attack = attack;
	}

	getAttack()
	{
		return this.#attack;
	}

	getPokemon()
	{
		return this.#pokemon;
	}

	getPokemonName()
	{
		return this.#pokemon.getName();
	}

	getAttackName()
	{
		return this.#attack.getName();
	}
}
