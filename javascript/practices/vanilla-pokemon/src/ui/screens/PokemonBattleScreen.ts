import type { Pokemon } from "../../domain/entities/Pokemon.ts";
import { pokemonFighter } from "../components/PokemonFighter.ts";
import { GameAtmosphere } from "../audio/GameAtmosphere.ts";
import { type Attack, EffectivenessEnum } from "../../domain/entities/Attack.ts";
import { MyAttackStore } from "../stores/MyAttackStore.ts";
import { GameBattle } from "../../domain/GameBattle.ts";
import { MyPokedexStore } from "../stores/MyPokedexStore.ts";
import { PokemonAttack } from "../../domain/entities/PokemonAttack.ts";
import { dialog, li } from "../dom/element.ts";
import { AudioEffect } from "../audio/AudioEffect.ts";

export function createPokemonBattleScreen(
	attacker: Pokemon,
	defender: Pokemon,
) {
	let pokedexStore = new MyPokedexStore();
	let attackStore = new MyAttackStore();
	let attacks = attackStore.fromPokemon(attacker.getAttacks());

	let screen = new PokemonBattleScreen(
		new AudioEffect(), new GameAtmosphere(),
		new GameBattle(pokedexStore, attackStore),
		{ attacker, defender, attacks },
	);
	screen.mount();
}

interface PokemonBattleScreenProps {
	attacker: Pokemon;
	defender: Pokemon;
	attacks: Array<Attack>;
}

class PokemonBattleScreen {
	#audioEffect: AudioEffect;
	#gameAtmosphere: GameAtmosphere;
	#gameBattle: GameBattle;
	#props: PokemonBattleScreenProps;

	/** Les éléments HTML de l'écran */
	#battleScreen: HTMLDivElement;
	#victoryDialog: HTMLDialogElement;

	constructor(
		audioEffect: AudioEffect,
		gameAtmosphere: GameAtmosphere,
		gameBattle: GameBattle,
		props: PokemonBattleScreenProps,
	) {
		this.#audioEffect = audioEffect;
		this.#gameAtmosphere = gameAtmosphere;
		this.#gameBattle = gameBattle;
		this.#props = props;
		this.#battleScreen = document.querySelector("#battle-screen")!;
		this.#victoryDialog = document.querySelector("#victory-dialog")!;
	}

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

	onAttack = (attack: Attack) => {
		const whenAlive = (f1: PokemonAttack, f2: Pokemon) => {
			this.#audioEffect.hit();

			let $f1 = document.querySelector(`#fighter-${f1.getPokemon().getId()}`)!;
			$f1.removeAttribute("data-type");
			let $f2 = document.querySelector(`#fighter-${f2.getId()}`)!;
			$f2.setAttribute("data-type", f2.getTypes().toString());


			let $f2HpProgress = $f2.querySelector<HTMLMeterElement>(".hp-progress")!;
			$f2HpProgress.value = f2.getHitPoints();
			$f2HpProgress.dispatchEvent(new CustomEvent("change"));

			let message = "";

			switch (f1.getAttack().effectiveness(f2.getTypes())) {
				case EffectivenessEnum.Faible:
					message = "Ca n'est pas très efficace...";
					break;
				case EffectivenessEnum.Forte:
					message = "C'est super efficace !"
					break;
				case EffectivenessEnum.Rien:
					message = `Cette attaque n'affecte pas ${f2.getName()}.`;
					break;
			}

			let msgPreview = this.#battleScreen.querySelector<HTMLDialogElement>("#message-preview")!;
			if (message.length > 0) {
				msgPreview.dataset.type = f1.getPokemon().getTypes().toString();
				msgPreview.setAttribute("open", "");
				msgPreview.textContent = message;
				setTimeout(() => {
					msgPreview.removeAttribute("open");
				}, 2_000);
			} else {
				msgPreview.removeAttribute("open");
			}
		};

		const whenDeath = (w: Pokemon, _: Pokemon) => {
			this.#gameAtmosphere.victory();

			this.#victoryDialog.showPopover();
			this.#victoryDialog.addEventListener("blur", () => window.location.reload());
			this.#victoryDialog.querySelector(".name")!.append(w.getName());
			this.#victoryDialog.querySelector(".count-hits")!.append(this.#gameBattle.countHits(w).toString());

			this.#victoryDialog.querySelector(".resume")!.append(
				...this.#gameBattle.getHistory().map((history) => li([
						history.from.getName(),
						" a infligé ",
						history.attack.calcPower(history.from, history.to).toString(),
						" points de dégâts avec ",
						history.attack.getName(),
					]),
				),
			);
		};

		this.#gameBattle.flow(
			new PokemonAttack(this.#props.attacker, attack),
			this.#props.defender,
			whenAlive,
			whenDeath,
		);
	};

	mount() {
		this.#battleScreen.removeAttribute("hidden");
		this.#battleScreen.append(...this.render());
		this.#audioEffect.useButtonsEffect();
		this.#gameAtmosphere.battle();
	}
}
