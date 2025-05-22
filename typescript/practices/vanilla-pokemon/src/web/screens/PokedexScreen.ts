import type { Pokemon } from "../../domain/entities/Pokemon.js";
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
export function createPokedexScreen(): void {
	let pokedexStore = new MyPokedexStore();

	let pokedex = pokedexStore.all();
	let opponent = removeRandomArray(pokedex);

	let screen = new PokedexScreen(
		{
			audioEffect: new AudioEffect(),
			gameAtmosphere: new GameAtmosphere(),
		},
		{ opponent, list: pokedex },
	);
	screen.mount();
}

/**
 * @typedef {{ audioEffect: AudioEffect; gameAtmosphere: GameAtmosphere; }} PokedexScreenContext
 */
interface PokedexScreenContext {
	audioEffect: AudioEffect;
	gameAtmosphere: GameAtmosphere;
}

interface PokedexScreenProps {
	list: Array<Pokemon>;
	opponent: Pokemon;
}

interface PokedexScreenState {
	selectedFighter?: Pokemon;
}

/**
 * Écran Pokedex
 */
class PokedexScreen {
	// --------- //
	// Propriété //
	// --------- //

	#ctx: PokedexScreenContext;
	#props: PokedexScreenProps;
	#state: PokedexScreenState;

	/* Les éléments du DOM */

	#headerLayout: HTMLDivElement;
	#pokemonFightBtn: HTMLButtonElement;
	#pokedexScreen: HTMLDivElement;
	#pokemonList: HTMLDivElement;
	#pokemonOpponent: HTMLDivElement;

	// ----------- //
	// Constructor //
	// ----------- //

	constructor(ctx: PokedexScreenContext, props: PokedexScreenProps) {
		this.#ctx = ctx;
		this.#props = props;
		this.#state = {};

		this.#headerLayout = document.querySelector("#header")!;
		this.#pokemonFightBtn = this.#headerLayout.querySelector("#pokemon-fight-btn")!;

		this.#pokedexScreen = document.querySelector("#pokedex-screen")!;
		this.#pokemonList = this.#pokedexScreen.querySelector("#pokemon-list")!;
		this.#pokemonOpponent = this.#pokedexScreen.querySelector("#pokemon-opponent")!;

		this.#pokemonFightBtn.addEventListener("click", () => {
			this.#headerLayout.setAttribute("hidden", "hidden");
			this.#pokedexScreen.setAttribute("hidden", "hidden");

			let selectedFighter = this.#state.selectedFighter!;
			createPokemonBattleScreen(selectedFighter, this.#props.opponent);
		});
	}

	// ------- //
	// Méthode //
	// ------- //

	/**
	 * Rendu de l'écran.
	 */
	render(): DocumentFragment {
		/**
		 * Lorsque un pokemon est sélectionné
		 */
		let whenSelectPokemon = (pokemon: Pokemon) => {
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

	mount(): void {
		this.#headerLayout.removeAttribute("hidden");
		this.#pokedexScreen.removeAttribute("hidden");
		this.#pokemonList.append(this.render());
		this.#pokemonOpponent.append(pokemonDetail({ pokemon: this.#props.opponent }));
		this.#ctx.audioEffect.useButtonsEffect();
	}
}
