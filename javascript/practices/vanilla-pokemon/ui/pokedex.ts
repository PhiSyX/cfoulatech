import type { Pokemon } from "../domain/Pokemon.ts";
import { randomArray, randomNumber } from "../utils/helpers.ts";
import { createBattleScreen } from "./battle.ts";
import { audioDelay, useAudioEffect } from "./audio.ts";
import {
	changeImage,
	changeText,
	changeValue,
	getTemplate, showElement,
} from "./elements.ts";

interface PokedexListProps {
	list: Array<Pokemon>;
	opponent: Pokemon;
}

interface PokedexListState {
	selected?: Pokemon;
}

interface PokedexItemProps {
	pokemon: Pokemon;
	onSelect: () => void;
}

class PokedexListUI {
	props: PokedexListProps;
	state: PokedexListState;

	battleFightBtn: HTMLButtonElement;
	homeScreen: HTMLDivElement;
	headerLayout: HTMLDivElement;
	pokedexList: HTMLDivElement;
	pokemonOpponent: HTMLDivElement;

	constructor(props: PokedexListProps, state: PokedexListState = {}) {
		this.props = props;
		this.state = state;

		this.homeScreen = document.querySelector("#pokedex-screen")!;
		this.headerLayout = document.querySelector("#header")!;
		this.pokedexList = document.querySelector("#pokedex-list")!;
		this.pokemonOpponent = document.querySelector("#pokemon-opponent")!;

		this.battleFightBtn = document.querySelector("#pokemon-fight-btn")!;
		this.battleFightBtn.addEventListener("click", this.gotoBattle);
	}

	gotoBattle = () => {
		createBattleScreen(this.state.selected!, this.props.opponent)
	}

	render() {
		let $fragment = document.createDocumentFragment();

		const whenSelectPokemon = (pokemon: Pokemon) => {
			this.state.selected = pokemon;
		};

		$fragment.append(
			...this.props.list.map(
				(pokemon) => PokedexItemUI.from(pokemon, whenSelectPokemon),
			),
		);

		return $fragment;
	}

	show() {
		showElement(this.homeScreen);
		showElement(this.headerLayout);
		this.pokedexList.append(this.render());
		this.pokemonOpponent.append(PokedexItemUI.from(this.props.opponent));
	}
}

class PokedexItemUI {
	static from(pokemon: Pokemon, onSelect: (pokemon: Pokemon) => void = () => {
	}): HTMLElement {
		return (new PokedexItemUI({
			pokemon,
			onSelect: () => onSelect(pokemon),
		})).render();
	}

	props: PokedexItemProps;

	battleFightBtn: HTMLButtonElement;
	pokemonTemplate: HTMLDivElement;
	pokedexList: HTMLDivElement;

	constructor(props: PokedexItemProps) {
		this.props = props;
		this.pokemonTemplate = getTemplate("#tpl-pokedex-item");
		this.pokedexList = document.querySelector("#pokedex-list")!;
		this.battleFightBtn = document.querySelector("#pokemon-fight-btn")!;
	}

	render() {
		this.pokemonTemplate.dataset.type = this.props.pokemon.getType().toString();

		changeImage(
			this.pokemonTemplate.querySelector(".pic"),
			this.props.pokemon.getPicture(),
			this.props.pokemon.getName(),
		);
		changeText(this.pokemonTemplate.querySelector(".name"), this.props.pokemon.getName());
		changeValue(this.pokemonTemplate.querySelector(".level output"), this.props.pokemon.getLevel());
		changeValue(this.pokemonTemplate.querySelector(".type output"), this.props.pokemon.getType());

		this.pokemonTemplate.addEventListener("click", this.selectPokemon);

		return this.pokemonTemplate;
	}

	selectPokemon = () => {
		this.pokedexList.querySelector(".selected")?.classList.remove("selected");
		showElement(this.battleFightBtn);
		let [pokemonCryId] = this.props.pokemon.getCry();
		audioDelay(pokemonCryId, 0);
		this.pokemonTemplate.classList.add("selected");
		this.props.onSelect();
	};
}

export const createPokedexUI = (pokedex: Array<Pokemon>, opponents: Array<Pokemon>) => {
	let ui = new PokedexListUI({
		list: pokedex.map((pokemon) => pokemon.withLevel(randomNumber(40, 100))),
		opponent: randomArray(opponents).withLevel(randomNumber(40, 100)),
	});
	ui.show();
	useAudioEffect();
}
