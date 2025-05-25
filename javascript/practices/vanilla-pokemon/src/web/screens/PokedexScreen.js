import { removeRandomArray, shuffle } from "../../shared/helpers.js";
import { AudioEffect } from "../audio/AudioEffect.js";
import { GameAtmosphere } from "../audio/GameAtmosphere.js";
import { pokemonDetail } from "../components/PokemonDetail.js";
import { fragment } from "../helpers/element.js";
import { MyPokedexStore, POKEMON_DETAIL_POSTER } from "../stores/MyPokedexStore.js";
import { createPokemonBattleScreen } from "./PokemonBattleScreen.js";

/**
 * Crée l'écran de sélection d'un pokemon.
 */
export function createPokedexScreen() {
	let pokedexStore = new MyPokedexStore();

	let pokedex = shuffle(pokedexStore.all());
	let opponent = removeRandomArray(pokedex);

	let audioEffect = new AudioEffect();
	let gameAtmosphere = new GameAtmosphere();

	let screen = new PokedexScreen(
		{ audioEffect, gameAtmosphere },
		{ opponent, list: pokedex },
	);

	screen.mount();
}

/**
 * Classe représentant l'écran Pokedex
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
	#state = {};

	/** Les éléments du DOM */

	/**
	 * L'en-tête DOM de l'écran PokedexScreen
	 * @type {HTMLDivElement}
	 */
	#headerLayout;
	/**
	 * Le bouton DOM de lancement du combat.
	 * @type {HTMLButtonElement}
	 */
	#pokemonFightBtn;
	/**
	 * L'élément DOM principal de l'écran Pokedex.
	 * @type {HTMLDivElement}
	 */
	#pokedexScreen;
	/**
	 * Element DOM contenant la liste des combattants
	 * @type {HTMLDivElement}
	 */
	#pokemonList;
	/**
	 * Element DOM montrant le pokemon ennemie.
	 * @type {HTMLDivElement}
	 */
	#pokemonOpponent;

	// ----------- //
	// Constructor //
	// ----------- //
	/**
	 * Construit l'écran PokedexScreenContext
	 * @param {PokedexScreenContext} ctx
	 * @param {PokedexScreenProps} props
	 */
	constructor(ctx, props) {
		this.#ctx = ctx;
		this.#props = props;

		this.#headerLayout = document.querySelector("#header");
		this.#pokemonFightBtn = this.#headerLayout.querySelector("#pokemon-fight-btn");
		this.#pokedexScreen = document.querySelector("#pokedex-screen");
		this.#pokemonList = this.#pokedexScreen.querySelector("#pokemon-list");
		this.#pokemonOpponent = this.#pokedexScreen.querySelector("#pokemon-opponent");

		this.#pokemonFightBtn.addEventListener("click", this.#gotoBattleScreen);
	}

	// ------- //
	// Méthode // -> Publique
	// ------- //

	/**
	 * Rendu de l'écran Pokedex.
	 * @returns {DocumentFragment}
	 */
	render() {
		/**
		 * Lorsque un pokemon est sélectionné :
		 *
		 * @param {Pokemon} pokemon
		 */
		let whenSelectPokemon = (pokemon) => {
			this.#state.selectedFighter = pokemon;

			// Modification du DOM
			this.#pokemonList.querySelector(".selected")?.classList.remove("selected");
			this.#headerLayout.querySelector("#pokemon-fight-btn")?.removeAttribute("hidden");

			// Joue le cri du pokemon
			this.#ctx.gameAtmosphere.cry(pokemon);
		};

		return fragment(
			this.#props.list.map((pokemon) => pokemonDetail({
				pokemon,
				poster: POKEMON_DETAIL_POSTER,
				onSelect: whenSelectPokemon,
			})),
		);
	}

	mount() {
		this.#headerLayout.removeAttribute("hidden");
		this.#pokedexScreen.removeAttribute("hidden");
		this.#pokemonList.append(this.render());
		this.#pokemonOpponent.append(pokemonDetail({ pokemon: this.#props.opponent, poster: POKEMON_DETAIL_POSTER }));
		this.#ctx.audioEffect.useButtonsEffect();
	}

	// ------- //
	// Méthode // -> Privée
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
}

/**
 * @typedef {import("../../domain/entities/Pokemon.js").Pokemon} Pokemon
 * @typedef {{audioEffect: AudioEffect; gameAtmosphere: GameAtmosphere;}} PokedexScreenContext
 * @typedef {{list: Array<Pokemon>; opponent: Pokemon;}} PokedexScreenProps
 * @typedef {{selectedFighter?: Pokemon;}} PokedexScreenState
 */
