import type { Pokemon } from "../domain/Pokemon.ts";
import { randomArray, randomNumber } from "../utils/helpers.ts";
import { createBattleScreen } from "./battle.ts";
import { AudioEffect } from "./audio.ts";
import { getTemplate } from "./elements.ts";

interface PokedexListProps {
	list: Array<Pokemon>;
	opponent: Pokemon;
	audio: AudioEffect;
}

interface PokedexListState {
	selected?: Pokemon;
}

interface PokedexItemProps {
	pokemon: Pokemon;
	onSelect: () => void;
	audio: AudioEffect;
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
		let fighter = this.state.selected!;
		createBattleScreen(fighter, this.props.opponent);
	};

	render() {
		let $fragment = document.createDocumentFragment();

		const whenSelectPokemon = (pokemon: Pokemon) => {
			this.pokedexList.querySelector(".selected")?.classList.remove("selected");

			this.battleFightBtn.removeAttribute("hidden");
			let [pokemonCryId] = pokemon.getCry();
			this.props.audio.playCry(pokemonCryId);
			this.state.selected = pokemon;
		};

		$fragment.append(...this.props.list.map(
			(pokemon) => PokedexItemUI.from(this.props.audio, pokemon, whenSelectPokemon)
		));

		return $fragment;
	}

	show() {
		this.homeScreen.removeAttribute("hidden");
		this.headerLayout.removeAttribute("hidden");
		this.pokedexList.append(this.render());
		this.pokemonOpponent.append(PokedexItemUI.from(this.props.audio, this.props.opponent));
	}
}

class PokedexItemUI {
	static from(audio: AudioEffect, pokemon: Pokemon, onSelect: (pokemon: Pokemon) => void = () => {}): HTMLElement {
		return new PokedexItemUI({
			audio,
			pokemon,
			onSelect: () => onSelect(pokemon),
		}).render();
	}

	props: PokedexItemProps;

	template: HTMLDivElement;
	name: HTMLHeadingElement;

	constructor(props: PokedexItemProps) {
		this.props = props;
		this.template = getTemplate("#tpl-pokedex-item");
		this.name = this.template.querySelector(".name")!;
	}

	render() {
		this.template.dataset.type = this.props.pokemon.getType().toString();
		this.template.style.backgroundImage = `url(${this.props.pokemon.getPicture()})`;

		this.name.prepend(this.props.pokemon.getName());

		// FIXME
		this.template.querySelector(".level output").value = this.props.pokemon.getLevel();
		this.template.querySelector(".type output").value =  this.props.pokemon.getType();

		this.template.addEventListener("click", this.selectPokemon);

		return this.template;
	}

	selectPokemon = () => {
		this.props.onSelect();
		this.template.classList.add("selected");
	};
}

export const createPokedexUI = (pokedex: Array<Pokemon>, opponents: Array<Pokemon>) => {
	let audio = new AudioEffect();

	let ui = new PokedexListUI({
		list: pokedex.map((pokemon) => pokemon.withLevel(randomNumber(40, 100))),
		opponent: randomArray(opponents).withLevel(randomNumber(40, 100)),
		audio: audio,
	});

	ui.show();

	audio.setupGlobal();
	audio.setupPokedex();
};
