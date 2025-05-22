import { type Attack, EffectivenessEnum } from "../../domain/entities/Attack.js";
import type { Pokemon } from "../../domain/entities/Pokemon.js";
import { PokemonAttack } from "../../domain/entities/PokemonAttack.js";
import { GameBattle } from "../../domain/GameBattle.js";
import { AudioEffect } from "../audio/AudioEffect.js";
import { GameAtmosphere } from "../audio/GameAtmosphere.js";
import { pokemonFighter } from "../components/PokemonFighter.js";
import { dialog, li } from "../helpers/element.js";
import { MyAttackStore } from "../stores/MyAttackStore.js";
import { MyPokedexStore } from "../stores/MyPokedexStore.js";

interface PokemonBattleScreenProps {
	attacker: Pokemon;
	defender: Pokemon;
	attacks: Array<Attack>;
}

interface PokemonBattleScreenContext {
	audioEffect: AudioEffect;
	gameAtmosphere: GameAtmosphere;
	gameBattle: GameBattle;
}

export function createPokemonBattleScreen(
	attacker: PokemonBattleScreenProps["attacker"],
	defender: PokemonBattleScreenProps["defender"],
): void {
	let pokedexStore = new MyPokedexStore();
	let attackStore = new MyAttackStore();
	let attacks = attackStore.fromPokemon(attacker.getAttacks());

	let screen = new PokemonBattleScreen(
		{
			gameBattle: new GameBattle(pokedexStore, attackStore),
			audioEffect: new AudioEffect(),
			gameAtmosphere: new GameAtmosphere(),
		},
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

	#ctx: PokemonBattleScreenContext;
	#props: PokemonBattleScreenProps;

	/** Les éléments HTML de l'écran */
	#battleScreen: HTMLDivElement;
	#victoryDialog: HTMLDialogElement;

	// ----------- //
	// Constructor //
	// ----------- //

	constructor(ctx: PokemonBattleScreenContext, props: PokemonBattleScreenProps) {
		this.#ctx = ctx;
		this.#props = props;
		this.#battleScreen = document.querySelector("#battle-screen")!;
		this.#victoryDialog = document.querySelector("#victory-dialog")!;
	}

	// ------- //
	// Méthode // -> Publique
	// ------- //

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
	 */
	onAttack = (attack: Attack) => {
		/**
		 * Lorsque l'attaque ne provoque pas la mort du pokemon.
		 */
		const whenAlive = (f1: PokemonAttack, f2: Pokemon) => {
			this.#ctx.audioEffect.hit();

			let $f1 = document.querySelector(`#fighter-${f1.getPokemon().getId()}`)!;
			$f1.removeAttribute("data-type");
			let $f2 = document.querySelector(`#fighter-${f2.getId()}`)!;
			$f2.setAttribute("data-type", f2.getTypes().toString());

			let $f2HpProgress = $f2.querySelector<HTMLMeterElement>(".hp-progress")!;
			$f2HpProgress.value = f2.getHitPoints();
			$f2HpProgress.dispatchEvent(new CustomEvent("change"));

			let message = `${f1.getPokemonName()} attaque ${f1.getAttackName()}. `;

			switch (f1.getAttack().effectiveness(f2.getTypes())) {
				case EffectivenessEnum.Faible:
					message += "Ca n'est pas très efficace...";
					break;
				case EffectivenessEnum.Forte:
					message += "C'est super efficace !";
					break;
				case EffectivenessEnum.Rien:
					message += `Cette attaque n'affecte pas ${f2.getName()}.`;
					break;
			}

			let msgPreview = this.#battleScreen.querySelector<HTMLDialogElement>("#message-preview")!;
			if (message.length > 0) {
				msgPreview.dataset.type = f1.getPokemon().getTypes().toString();
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
		 */
		const whenDeath = (w: Pokemon, _: Pokemon) => {
			this.#ctx.gameAtmosphere.victory();

			this.#victoryDialog.showPopover();
			this.#victoryDialog.addEventListener("blur", () => window.location.reload());
			this.#victoryDialog.querySelector(".name")!.append(w.getName());
			this.#victoryDialog.querySelector(".count-hits")!.append(this.#ctx.gameBattle.countHits(w).toString());

			this.#victoryDialog
				.querySelector(".resume")!
				.append(
					...this.#ctx.gameBattle
						.getHistory()
						.map((history) =>
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

		this.#ctx.gameBattle.flow(new PokemonAttack(this.#props.attacker, attack), this.#props.defender, {
			alive: whenAlive,
			death: whenDeath,
		});
	};

	mount() {
		this.#battleScreen.removeAttribute("hidden");
		this.#battleScreen.append(...this.render());
		this.#ctx.audioEffect.useButtonsEffect();
		this.#ctx.gameAtmosphere.battle();
	}
}
