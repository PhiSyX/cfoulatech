// @ts-nocheck

import { article, h1, output, p, small } from "../dom/element.js";

export function pokemonDetail(props)
{
	return new PokemonDetail({
		pokemon: props.pokemon,
		onSelect: () => props.onSelect?.(props.pokemon),
	}).render();
}

class PokemonDetail
{
	#props;

	constructor(props)
	{
		this.#props = props;
	}

	#selectPokemon = (e) => {
		this.#props.onSelect();
		e.currentTarget?.classList.add("selected");
	};

	#selectPokemonNav = (e) => {
		let btn = e.currentTarget;

		if (e.key === "ArrowLeft") {
			let parentLi = btn.previousElementSibling;
			parentLi.click();
			parentLi.focus();
		} else if (e.key === "ArrowRight") {
			let parentLi = btn.nextElementSibling;
			parentLi.click();
			parentLi.focus();
		} else if (e.key === "Enter" || e.key === " ") {
			btn.click();
		}
	};

	render()
	{
		let zeroedId = this.#props.pokemon.getId().toString().padStart(3, "0");
		let picture = `https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/detail/${zeroedId}.png`;

		return article(
			[
				h1(
					[
						this.#props.pokemon.getName(),
						" ",
						small([output([this.#props.pokemon.getTypes().toString()], { className: "badge" })], {
							className: "type",
						}),
					],
					{ className: "name" },
				),

				p(["Niveau: ", output([this.#props.pokemon.getLevel().toString()])], { className: "level" }),
			],
			{
				className: "pokemon-detail",
				tabIndex: -1,
				dataset: {
					type: this.#props.pokemon.getTypes(),
				},
				style: {
					backgroundImage: `url(${picture})`,
				},
				event: {
					click: this.#selectPokemon,
					keydown: this.#selectPokemonNav,
				},
			},
		);
	}
}
