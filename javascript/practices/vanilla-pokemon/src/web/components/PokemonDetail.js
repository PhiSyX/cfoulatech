import { article, h1, output, paragraph, small } from "../helpers/element.js";

/**
 * Effectue le rendu du composant PokemonDetail.
 * @param {PokemonDetailFnProps} props
 * @returns {HTMLElement}
 */
export function pokemonDetail(props) {
	return new PokemonDetail({
		pokemon: props.pokemon,
		poster: props.poster,
		onSelect: () => props.onSelect?.(props.pokemon),
	}).render();
}

/**
 * Classe représentant le composant DOM PokemonDetail.
 */
class PokemonDetail {
	// --------- //
	// Propriété //
	// --------- //

	/**
	 * Les propriétés du composant.
	 * @type {PokemonDetailProps}
	 */
	#props;

	// ----------- //
	// Constructor //
	// ----------- //

	/**
	 * Construit le composant PokemonDetail
	 * @param {PokemonDetailProps} props
	 */
	constructor(props) {
		this.#props = props;
	}

	// ------- //
	// Méthode // -> Publique
	// ------- //
	

	/**
	 * Fonction de rendu d'un composant DOM.
	 * @returns {HTMLElement}
	 */
	render() {
		let zeroedId = this.#props.pokemon.getId().toString().padStart(3, "0");
		let picture = this.#props.poster.replace("{id}", zeroedId);
		return article(
			[
				h1(
					[
						this.#props.pokemon.getName(),
						" ",
						small(
							[output([this.#props.pokemon.getTypes()], { className: "badge" })],
							{ className: "type" },
						),
					],
					{ className: "name" },
				),

				paragraph(
					["Niveau: ", this.#props.pokemon.getLevel(),],
					{ className: "level" },
				),
			],
			{
				className: "pokemon-detail",
				tabIndex: -1,
				dataset: { type: this.#props.pokemon.getTypes() },
				style: { backgroundImage: `url(${picture})` },
			},
			{
				click: this.#selectPokemon,
				keydown: this.#selectPokemonFromKeyboard,
			}
		);
	}

	// ------- //
	// Méthode // -> Privée
	// ------- //

	/**
	 * Sélectionne le pokemon.
	 * @param {PointerEvent} evt
	 */
	#selectPokemon = (evt) => {
		this.#props.onSelect();
		evt.currentTarget.classList.add("selected");
	};

	/**
	 * Sélectionne un pokemon en naviguant avec les flèches directionnelles du
	 * clavier.
	 * @param {KeyboardEvent} evt
	 */
	#selectPokemonFromKeyboard = (evt) => {
		/**
		 * Récupération du bouton à partir de l'événement.
		 * @type {HTMLButtonElement}
		 */
		let btn = evt.currentTarget;

		switch (evt.key) {
			// Flèche de gauche
			case "ArrowLeft":
			{
				/**
				 * @type {HTMLLIElement|null}
				 */
				let parentLi = btn.previousElementSibling;
				parentLi?.click();
				parentLi?.focus();
			} break;

			// Flèche de droite
			case "ArrowRight":
			{
				/**
				 * @type {HTMLLIElement|null}
				 */
				let parentLi = btn.nextElementSibling;
				parentLi?.click();
				parentLi?.focus();
			} break;

			case "Enter":
			case " ":
			{
				btn.click();
			} break;
		}
	};
}

/**
 * @typedef {import("../../domain/entities/Pokemon.js").Pokemon} Pokemon
 *
 * @typedef {{ pokemon: Pokemon; poster: `${string}{id}${string}`; onSelect: () => void; }} PokemonDetailProps
 * @typedef {{ pokemon: Pokemon; poster: `${string}{id}${string}`; onSelect?: (pokemon: Pokemon) => void }} PokemonDetailFnProps
 */
