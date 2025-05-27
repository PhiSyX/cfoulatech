import { EffectivenessEnum } from "../../domain/entities/Attack.js";
import { PokemonAttack } from "../../domain/entities/PokemonAttack.js";
import { GameBattle } from "../../domain/GameBattle.js";
import { AudioEffect } from "../audio/AudioEffect.js";
import { GameAtmosphere } from "../audio/GameAtmosphere.js";
import { pokemonFighter } from "../components/PokemonFighter.js";
import { dialog, li } from "../helpers/element.js";
import { AttackStore } from "../stores/AttackStore.js";
import { GameStore } from "../stores/GameStore.js";
import { PokedexStore } from "../stores/PokedexStore.js";

/**
 * Crée l'écran de combat.
 * @param {PokemonBattleScreenProps["attacker"]} attacker
 * @param {PokemonBattleScreenProps["defender"]} defender
 */
export function createPokemonBattleScreen(attacker, defender) {
	let gameStore = new GameStore();
	let pokedexStore = new PokedexStore();
	let attackStore = new AttackStore();
	let gameBattle = new GameBattle(gameStore, pokedexStore, attackStore);

	let audioEffect = new AudioEffect();
	let gameAtmosphere = new GameAtmosphere();

	let attacks = attackStore.fromPokemon(attacker);

	let screen = new PokemonBattleScreen(
		{ gameBattle, audioEffect, gameAtmosphere },
		{ attacker, defender, attacks },
	);

	screen.mount();
}

/**
 * Classe représentant l'écran de combat.
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
	 * Élément DOM de l'écran de combat.
	 * @type {HTMLDivElement}
	 */
	#battleScreen;
	/**
	 * Élément DOM de la boite de dialogue de victoire.
	 * @type {HTMLDialogElement}
	 */
	#victoryDialog;
	/**
	 * Élément DOM de la boite de dialogue de prévisualisation de message.
	 * @type {HTMLDialogElement}
	 */
	#messagePreviewDialog;

	// ----------- //
	// Constructor //
	// ----------- //

	/**
	 * Construit la classe PokemonBattleScreen
	 * @param {PokemonBattleScreenContext} ctx
	 * @param {PokemonBattleScreenProps} props
	 */
	constructor(ctx, props) {
		this.#ctx = ctx;
		this.#props = props;

		this.#battleScreen = document.querySelector("#battle-screen");
		this.#victoryDialog = document.querySelector("#victory-dialog");
		this.#messagePreviewDialog = dialog([], { id: "message-preview" });
	}

	// ------- //
	// Méthode // -> Publique
	// ------- //

	/**
	 * Rendu du composant DOM.
	 * @returns {Array<HTMLElement>}
	 */
	render() {
		return [
			this.#messagePreviewDialog,
			pokemonFighter(this.#props.defender),
			pokemonFighter(this.#props.attacker, {
				onAttack: this.#handleClickAttack,
				list: this.#props.attacks,
				opponent: this.#props.defender,
			}),
		];
	}

	mount() {
		this.#battleScreen.removeAttribute("hidden");
		this.#battleScreen.append(...this.render());
		this.#ctx.audioEffect.useButtonsEffect();
		this.#ctx.gameAtmosphere.battle();
	}

	// ------- //
	// Méthode // -> Privée
	// ------- //

	/**
	 * Lorsqu'un bouton d'attaque est appuyé.
	 * @param {Attack} attack - Attaque d'un pokemon.
	 */
	#handleClickAttack = (attack) => {
		this.#ctx.gameBattle.attack(
			new PokemonAttack(this.#props.attacker, attack),
			this.#props.defender,
			{ alive: this.#whenAlive, death: this.#whenDeath },
		);
	};

	/**
	 * Lorsque l'attaque ne provoque pas la mort du pokemon.
	 * @param {PokemonAttack} a - Attaquant
	 * @param {Pokemon} d - Défenseur
	 */
	#whenAlive = (a, d) => {
		this.#ctx.audioEffect.hit();

		/**
		 * @type {HTMLDivElement}
		 */
		let $f1 = document.querySelector(`#fighter-${a.getPokemon().getId()}`);
		$f1.removeAttribute("data-type");
		/**
		 * @type {HTMLDivElement}
		 */
		let $f2 = document.querySelector(`#fighter-${d.getId()}`);
		$f2.setAttribute("data-type", d.getTypes());

		/**
		 * @type {HTMLMeterElement}
		 */
		let $f2HpProgress = $f2.querySelector(".hp-progress");
		$f2HpProgress.value = d.getHitPoints();
		$f2HpProgress.dispatchEvent(new Event("change"));

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

		/**
		 * @type {HTMLDialogElement}
		 */
		if (message.length > 0) {
			this.#messagePreviewDialog.dataset.type = a.getPokemon().getTypes();
			this.#messagePreviewDialog.setAttribute("open", "");
			this.#messagePreviewDialog.textContent = message;
			setTimeout(() => {
				this.#messagePreviewDialog.removeAttribute("open");
			}, 2_500);
		} else {
			this.#messagePreviewDialog.removeAttribute("open");
		}
	};

	/**
	 * Lorsque l'attaque provoque la mort du pokemon.
	 * @param {Pokemon} w - Gagnant
	 * @param {Pokemon} _l - Perdant
	 */
	#whenDeath = (w, _l) => {
		this.#ctx.gameAtmosphere.victory();
		this.#victoryDialog.showPopover();
		this.#victoryDialog.addEventListener("blur", () => window.location.reload());
		this.#victoryDialog.querySelector(".name")?.append(w.getName());
		this.#victoryDialog.querySelector(".count-hits")?.append(this.#ctx.gameBattle.countHits(w));
		this.#victoryDialog.querySelector(".resume")?.append(
			...this.#ctx.gameBattle.getHistory().map((history) =>
				li([
					history.from.getName(),
					" a infligé ",
					history.attack.calcPower(history.from, history.to),
					" points de dégâts avec ",
					history.attack.getName(),
				]),
			),
		);
	};
}

/**
 * @typedef {import("../../domain/entities/Pokemon.js").Pokemon} Pokemon
 * @typedef {import("../../domain/entities/Attack.js").Attack} Attack
 * @typedef {{attacker: Pokemon; defender: Pokemon; attacks: Array<Attack>;}} PokemonBattleScreenProps
 * @typedef {{audioEffect: AudioEffect; gameAtmosphere: GameAtmosphere; gameBattle: GameBattle;}} PokemonBattleScreenContext
 */
