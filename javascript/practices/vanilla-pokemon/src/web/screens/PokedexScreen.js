import { removeRandomArray } from "../../shared/helpers.js";
import { AudioEffect } from "../audio/AudioEffect.js";
import { GameAtmosphere } from "../audio/GameAtmosphere.js";
import { pokemonDetail } from "../components/PokemonDetail.js";
import { fragment } from "../helpers/element.js";
import { MyPokedexStore } from "../stores/MyPokedexStore.js";
import { createPokemonBattleScreen } from "./PokemonBattleScreen.js";

/**
 * Crée l'écran des choix de pokemon.
 */
export function createPokedexScreen() {
	let pokedexStore = new MyPokedexStore();

	let pokedex = pokedexStore.all();
	let opponent = removeRandomArray(pokedex);

	let audioEffect = new AudioEffect();
	let gameAtmosphere = new GameAtmosphere();

	let screen = new PokedexScreen(
		{ audioEffect, gameAtmosphere },
		{ opponent, list: pokedex },
	);

	screen.mount();
}

/**
 * Écran Pokedex
 */
class PokedexScreen {
	// --------- //
	// Propriété //
	// --------- //
	/**
	 * @type {PokedexScreenContext}
	 */
	#ctx;
	/**
	 * Les propriétés du composant.
	 * @type {PokedexScreenProps}
	 */
	#props;
	/**
	 * L'état local du composant.
	 * @type {PokedexScreenState}
	 */
	#state;

	/** Les éléments du DOM */

	/**
	 * @type {HTMLDivElement}
	 */
	#headerLayout;
	/**
	 * @type {HTMLButtonElement}
	 */
	#pokemonFightBtn;
	/**
	 * @type {HTMLDivElement}
	 */
	#pokedexScreen;
	/**
	 * @type {HTMLDivElement}
	 */
	#pokemonList;
	/**
	 * @type {HTMLDivElement}
	 */
	#pokemonOpponent;

	// ----------- //
	// Constructor //
	// ----------- //
	/**
	 * @param {PokedexScreenContext} ctx
	 * @param {PokedexScreenProps} props
	 */
	constructor(ctx, props) {
		this.#ctx = ctx;
		this.#props = props;
		this.#state = {};

		this.#headerLayout = document.querySelector("#header");
		this.#pokemonFightBtn = this.#headerLayout.querySelector("#pokemon-fight-btn");
		this.#pokedexScreen = document.querySelector("#pokedex-screen");
		this.#pokemonList = this.#pokedexScreen.querySelector("#pokemon-list");
		this.#pokemonOpponent = this.#pokedexScreen.querySelector("#pokemon-opponent");

		this.#pokemonFightBtn.addEventListener("click", this.#gotoBattleScreen);
	}

	// ------- //
	// Méthode //
	// ------- //

	/**
	 * Navigue vers l'écran de combat
	 */
	#gotoBattleScreen = () => {
		this.#headerLayout.setAttribute("hidden", "hidden");
		this.#pokedexScreen.setAttribute("hidden", "hidden");
		let selectedFighter = this.#state.selectedFighter;
		createPokemonBattleScreen(selectedFighter, this.#props.opponent);
	};

	/**
	 * Rendu de l'écran.
	 * @returns {DocumentFragment}
	 */
	render() {
		/**
		 * Lorsque un pokemon est sélectionné
		 */
		let whenSelectPokemon = (pokemon) => {
			this.#pokemonList.querySelector(".selected")?.classList.remove("selected");
			this.#headerLayout.querySelector("#pokemon-fight-btn")?.removeAttribute("hidden");
			this.#ctx.gameAtmosphere.cry(pokemon);
			this.#state.selectedFighter = pokemon;
		};

		return fragment(
			this.#props.list.map((pokemon) => {
				return pokemonDetail({
					pokemon,
					onSelect: whenSelectPokemon,
				});
			}),
		);
	}

	mount() {
		this.#headerLayout.removeAttribute("hidden");
		this.#pokedexScreen.removeAttribute("hidden");
		this.#pokemonList.append(this.render());
		this.#pokemonOpponent.append(pokemonDetail({ pokemon: this.#props.opponent }));
		this.#ctx.audioEffect.useButtonsEffect();
	}
}

/**
 * @typedef {import("../../domain/entities/Pokemon.js").Pokemon} Pokemon
 * @typedef {{ audioEffect: AudioEffect; gameAtmosphere: GameAtmosphere;}} PokedexScreenContext
 * @typedef {{list: Array<Pokemon>; opponent: Pokemon;}} PokedexScreenProps
 * @typedef {{selectedFighter?: Pokemon;}} PokedexScreenState
 */
