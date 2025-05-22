import type { Pokemon } from "../../domain/entities/Pokemon.js";
import { article, h1, output, p, small } from "../helpers/element.js";

interface PokemonDetailProps {
	pokemon: Pokemon;
	onSelect: () => void;
}

/**
 * Rend un composant DOM PokemonDetail.
 */
export function pokemonDetail(props: {
	pokemon: PokemonDetailProps["pokemon"];
	onSelect?: (pokemon: Pokemon) => void;
}): HTMLElement {
	return new PokemonDetail({
		pokemon: props.pokemon,
		onSelect: () => props.onSelect?.(props.pokemon),
	}).render();
}

const PICTURE_POKEMON = "https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/detail/{id}.png";

/**
 * Composant DOM PokemonDetail.
 */
class PokemonDetail {
	// --------- //
	// Propriété //
	// --------- //

	/**
	 * Les propriétés du composant.
	 */
	#props: PokemonDetailProps;

	// ----------- //
	// Constructor //
	// ----------- //

	constructor(props: PokemonDetailProps) {
		this.#props = props;
	}

	/**
	 * Sélectionne le pokemon.
	 */
	#selectPokemon = (evt: PointerEvent) => {
		this.#props.onSelect();

		// @ts-expect-error
		evt.currentTarget?.classList.add("selected");
	};

	/**
	 * Sélectionne un pokemon en naviguant avec les flèches directionnelles du
	 * clavier.
	 */
	#selectPokemonFromKeyboard = (evt: KeyboardEvent) => {
		let btn = evt.currentTarget as HTMLButtonElement;

		if (evt.key === "ArrowLeft") {
			let parentLi = btn.previousElementSibling as HTMLLIElement | null;
			parentLi?.click();
			parentLi?.focus();
		} else if (evt.key === "ArrowRight") {
			let parentLi = btn.nextElementSibling as HTMLLIElement | null;
			parentLi?.click();
			parentLi?.focus();
		} else if (evt.key === "Enter" || evt.key === " ") {
			btn.click();
		}
	};

	/**
	 * Fonction de rendu d'un composant DOM.
	 */
	render(): HTMLElement {
		let zeroedId = this.#props.pokemon.getId().toString().padStart(3, "0");
		let picture = PICTURE_POKEMON.replace("{id}", zeroedId);

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
					// @ts-expect-error
					click: this.#selectPokemon,
					keydown: this.#selectPokemonFromKeyboard,
				},
			},
		);
	}
}
