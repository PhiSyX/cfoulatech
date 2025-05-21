import type { Pokemon } from "../../domain/entities/Pokemon.ts";
import { article, h1, output, p, small } from "../dom/element.ts";

interface PokemonDetailProps {
	pokemon: Pokemon;
	onSelect: () => void;
}

export function pokemonDetail(props: {
	pokemon: Pokemon;
	onSelect?: (pokemon: Pokemon) => void;
}) {
	return new PokemonDetail({
		pokemon: props.pokemon,
		onSelect: () => props.onSelect?.(props.pokemon),
	}).render();
}

class PokemonDetail {
	#props: PokemonDetailProps;

	constructor(props: PokemonDetailProps) {
		this.#props = props;
	}

	#selectPokemon = (e: MouseEvent) => {
		this.#props.onSelect();
		// @ts-expect-error
		e.currentTarget?.classList.add("selected");
	};

	#selectPokemonNav = (e: KeyboardEvent) => {
		let btn = e.currentTarget as HTMLButtonElement;

		if (e.key === "ArrowLeft") {
			let parentLi = btn.previousElementSibling as HTMLLIElement;
			parentLi.click();
			parentLi.focus();
		} else if (e.key === "ArrowRight") {
			let parentLi = btn.nextElementSibling as HTMLLIElement;
			parentLi.click();
			parentLi.focus();
		} else if (e.key === "Enter" || e.key === " ") {
			btn.click();
		}
	};

	render() {
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
