import { GameAtmosphere } from "../audio/GameAtmosphere.ts";
import { fragment } from "../dom/element.ts";
import { MyPokedexStore } from "../stores/MyPokedexStore.ts";
import type { Pokemon } from "../../domain/entities/Pokemon.ts";
import { pokemonDetail } from "../components/PokemonDetail.ts";
import { randomArray, removeRandomArray } from "../../shared/helpers.ts";
import { createPokemonBattleScreen } from "./PokemonBattleScreen.ts";
import { AudioEffect } from "../audio/AudioEffect.ts";

export function createPokedexScreen() {
	let pokedexStore = new MyPokedexStore();

	let pokedex = pokedexStore.all();
	let opponent = randomArray([
		removeRandomArray(pokedex),
		removeRandomArray(pokedex),
		removeRandomArray(pokedex),
		removeRandomArray(pokedex),
	]);

	let screen = new PokedexScreen(new AudioEffect(), new GameAtmosphere(), {
		opponent: opponent,
		list: pokedex,
	});
	screen.mount();
}

interface PokedexScreenProps {
	list: Array<Pokemon>;
	opponent: Pokemon;
}

interface PokedexScreenState {
	selectedFighter?: Pokemon;
}

class PokedexScreen {
	#audioEffect: AudioEffect;
	#gameAtmosphere: GameAtmosphere;

	#props: PokedexScreenProps;
	#state: PokedexScreenState;

	/* Les éléments du DOM */
	#headerLayout: HTMLDivElement;
	#pokemonFightBtn: HTMLButtonElement;
	#pokedexScreen: HTMLDivElement;
	#pokemonList: HTMLDivElement;
	#pokemonOpponent: HTMLDivElement;

	constructor(
		audioEffect: AudioEffect,
		gameAtmosphere: GameAtmosphere,
		props: PokedexScreenProps
	) {
		this.#audioEffect = audioEffect;
		this.#gameAtmosphere = gameAtmosphere;
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

	render() {
		let whenSelectPokemon = (pokemon: Pokemon) => {
			this.#pokemonList.querySelector(".selected")?.classList.remove("selected");
			this.#headerLayout.querySelector("#pokemon-fight-btn")?.removeAttribute("hidden");
			this.#gameAtmosphere.cry(pokemon);
			this.#state.selectedFighter = pokemon;
		};

		return fragment(this.#props.list.map((pokemon) => {
			return pokemonDetail({
				pokemon,
				onSelect: whenSelectPokemon,
			});
		}));
	}

	mount() {
		this.#headerLayout.removeAttribute("hidden");
		this.#pokedexScreen.removeAttribute("hidden");
		this.#pokemonList.append(this.render());
		this.#pokemonOpponent.append(
			pokemonDetail({ pokemon: this.#props.opponent }),
		);
		this.#audioEffect.useButtonsEffect();
	}
}
