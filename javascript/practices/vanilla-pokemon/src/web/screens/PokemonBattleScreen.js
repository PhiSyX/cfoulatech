import { EffectivenessEnum } from "../../domain/entities/Attack.js";
import { PokemonAttack } from "../../domain/entities/PokemonAttack.js";
import { GameBattle } from "../../domain/GameBattle.js";
import { AudioEffect } from "../audio/AudioEffect.js";
import { GameAtmosphere } from "../audio/GameAtmosphere.js";
import { pokemonFighter } from "../components/PokemonFighter.js";
import { dialog, li } from "../helpers/element.js";
import { MyAttackStore } from "../stores/MyAttackStore.js";
import { MyPokedexStore } from "../stores/MyPokedexStore.js";

/**
 * Crée l'écran de combat.
 * @param {PokemonBattleScreenProps["attacker"]} attacker
 * @param {PokemonBattleScreenProps["defender"]} defender
 */
export function createPokemonBattleScreen(attacker, defender) {
	let pokedexStore = new MyPokedexStore();
	let attackStore = new MyAttackStore();
	let attacks = attackStore.fromPokemon(attacker);

	let audioEffect = new AudioEffect();
	let gameAtmosphere = new GameAtmosphere();
	let gameBattle = new GameBattle(pokedexStore, attackStore);

	let screen = new PokemonBattleScreen(
		{ audioEffect, gameAtmosphere, gameBattle },
		{ attacker, defender, attacks },
	);

	screen.mount();
}

/**
 * Écran de combat
 */
class PokemonBattleScreen {
	// --------- //
	// Propriété //
	// --------- //

	/**
	 * @type {PokemonBattleScreenContext}
	 */
	#ctx;
	/**
	 * Les propriétés du composant.
	 * @type {PokemonBattleScreenProps}
	 */
	#props;

	/** Les éléments HTML de l'écran */
	/**
	 * @type {HTMLDivElement}
	 */
	#battleScreen;
	/**
	 * @type {HTMLDialogElement}
	 */
	#victoryDialog;

	// ----------- //
	// Constructor //
	// ----------- //

	/**
	 * @param {PokemonBattleScreenContext} ctx
	 * @param {PokemonBattleScreenProps} props
	 */
	constructor(ctx, props) {
		this.#ctx = ctx;
		this.#props = props;
		this.#battleScreen = document.querySelector("#battle-screen");
		this.#victoryDialog = document.querySelector("#victory-dialog");
	}

	/**
	 * Rendu du composant DOM.
	 * @returns {Array<HTMLElement>}
	 */
	render() {
		return [
			pokemonFighter(this.#props.defender),

			dialog([], { id: "message-preview" }),

			pokemonFighter(this.#props.attacker, {
				onAttack: this.onAttack,
				list: this.#props.attacks,
				opponent: this.#props.defender,
			}),
		];
	}

	/**
	 * Lorsqu'un bouton d'attaque est appuyé.
	 * @param {Attack} attack - Attaque d'un pokemon.
	 */
	onAttack = (attack) => {
		/**
		 * Lorsque l'attaque ne provoque pas la mort du pokemon.
		 * @param {PokemonAttack} a - Attaquant
		 * @param {Pokemon} d - Défenseur
		 */
		const whenAlive = (a, d) => {
			this.#ctx.audioEffect.hit();

			let $f1 = document.querySelector(`#fighter-${a.getPokemon().getId()}`);
			$f1.removeAttribute("data-type");
			let $f2 = document.querySelector(`#fighter-${d.getId()}`);
			$f2.setAttribute("data-type", d.getTypes());

			let $f2HpProgress = $f2.querySelector(".hp-progress");
			$f2HpProgress.value = d.getHitPoints();
			$f2HpProgress.dispatchEvent(new CustomEvent("change"));

			let message = `${a.getPokemonName()} attaque ${a.getAttackName()}. `;

			switch (a.getAttack().effectiveness(d)) {
				case EffectivenessEnum.Faible:
					message += "Ca n'est pas très efficace...";
					break;
				case EffectivenessEnum.Forte:
					message += "C'est super efficace !";
					break;
				case EffectivenessEnum.Rien:
					message += `Cette attaque n'affecte pas ${d.getName()}.`;
					break;
			}

			let msgPreview = this.#battleScreen.querySelector("#message-preview");
			if (message.length > 0) {
				msgPreview.dataset.type = a.getPokemon().getTypes().toString();
				msgPreview.setAttribute("open", "");
				msgPreview.textContent = message;
				setTimeout(() => {
					msgPreview.removeAttribute("open");
				}, 2_500);
			} else {
				msgPreview.removeAttribute("open");
			}
		};

		/**
		 * Lorsque l'attaque provoque la mort du pokemon.
		 * @param {Pokemon} w - Gagnant
		 * @param {Pokemon} _l - Perdant
		 */
		const whenDeath = (w, _l) => {
			this.#ctx.gameAtmosphere.victory();
			this.#victoryDialog.showPopover();
			this.#victoryDialog.addEventListener("blur", () => window.location.reload());
			this.#victoryDialog.querySelector(".name").append(w.getName());
			this.#victoryDialog.querySelector(".count-hits").append(this.#ctx.gameBattle.countHits(w).toString());
			this.#victoryDialog.querySelector(".resume").append(
				...this.#ctx.gameBattle.getHistory().map((history) =>
					li([
						history.from.getName(),
						" a infligé ",
						history.attack.calcPower(history.from, history.to).toString(),
						" points de dégâts avec ",
						history.attack.getName(),
					]),
				),
			);
		};

		this.#ctx.gameBattle.flow(
			new PokemonAttack(this.#props.attacker, attack),
			this.#props.defender,
			{ alive: whenAlive, death: whenDeath },
		);
	};

	mount() {
		this.#battleScreen.removeAttribute("hidden");
		this.#battleScreen.append(...this.render());
		this.#ctx.audioEffect.useButtonsEffect();
		this.#ctx.gameAtmosphere.battle();
	}
}

/**
 * @typedef {import("../../domain/entities/Pokemon.js").Pokemon} Pokemon
 * @typedef {import("../../domain/entities/Attack.js").Attack}Attack
 * @typedef {{attacker: Pokemon; defender: Pokemon; attacks: Array<Attack>}} PokemonBattleScreenProps
 * @typedef {{audioEffect: AudioEffect; gameAtmosphere: GameAtmosphere; gameBattle: GameBattle;}} PokemonBattleScreenContext
 */
