// @ts-nocheck

import { GameAtmosphere } from "../audio/GameAtmosphere.js";
import { fragment } from "../dom/element.js";
import { MyPokedexStore } from "../stores/MyPokedexStore.js";
import { pokemonDetail } from "../components/PokemonDetail.js";
import { removeRandomArray } from "../../shared/helpers.js";
import { createPokemonBattleScreen } from "./PokemonBattleScreen.js";
import { AudioEffect } from "../audio/AudioEffect.js";

export function createPokedexScreen() {
	let pokedexStore = new MyPokedexStore();

	let pokedex = pokedexStore.all();
	let opponent = removeRandomArray(pokedex);

	let screen = new PokedexScreen(new AudioEffect(), new GameAtmosphere(), {
		opponent: opponent,
		list: pokedex,
	});
	screen.mount();
}

class PokedexScreen {
	#audioEffect;
	#gameAtmosphere;

	#props;
	#state = {};

	/* Les éléments du DOM */
	#headerLayout;
	#pokemonFightBtn;
	#pokedexScreen;
	#pokemonList;
	#pokemonOpponent;

	constructor(audioEffect, gameAtmosphere, props) {
		this.#audioEffect = audioEffect;
		this.#gameAtmosphere = gameAtmosphere;
		this.#props = props;
		this.#state = {};

		this.#headerLayout = document.querySelector("#header");
		this.#pokemonFightBtn = this.#headerLayout.querySelector("#pokemon-fight-btn");
		this.#pokedexScreen = document.querySelector("#pokedex-screen");
		this.#pokemonList = this.#pokedexScreen.querySelector("#pokemon-list");
		this.#pokemonOpponent = this.#pokedexScreen.querySelector("#pokemon-opponent");

		this.#pokemonFightBtn.addEventListener("click", () => {
			this.#headerLayout.setAttribute("hidden", "hidden");
			this.#pokedexScreen.setAttribute("hidden", "hidden");
			let selectedFighter = this.#state.selectedFighter;
			createPokemonBattleScreen(selectedFighter, this.#props.opponent);
		});
	}

	render() {
		let whenSelectPokemon = (pokemon) => {
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
