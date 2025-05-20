import type { Pokemon } from "../../domain/entities/Pokemon.ts";
import { pokemonFighter } from "../components/PokemonFighter.ts";
import { GameAtmosphere } from "../audio/GameAtmosphere.ts";
import type { Attack } from "../../domain/entities/Attack.ts";
import { MyAttackStore } from "../stores/MyAttackStore.ts";
import { GameBattle } from "../../domain/GameBattle.ts";
import { MyPokedexStore } from "../stores/MyPokedexStore.ts";
import { PokemonAttack } from "../../domain/entities/PokemonAttack.ts";
import { li } from "../dom/element.ts";
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
	}

	render() {
		const onAttack = (attack: Attack) => {
			this.#gameBattle.flow(
				new PokemonAttack(this.#props.attacker, attack),
				this.#props.defender,
				(f1, f2) => {
					this.#audioEffect.hit();

					let $f1 = document.querySelector(`#fighter-${f1.getId()}`)!;
					$f1.removeAttribute("data-type");
					let $f2 = document.querySelector(`#fighter-${f2.getId()}`)!;
					$f2.setAttribute("data-type", f2.getTypes().toString());


					let $f2HpProgress = $f2.querySelector<HTMLMeterElement>(".hp-progress")!;
					$f2HpProgress.value = f2.getHitPoints();
					$f2HpProgress.dispatchEvent(new CustomEvent("change"));
				},
				(w, _) => {
					this.#gameAtmosphere.victory();

					let victoryDialog = document.querySelector<HTMLDialogElement>("#victory-dialog")!;
					victoryDialog.showPopover();
					victoryDialog.addEventListener("blur", () => window.location.reload());

					victoryDialog.querySelector(".name")!.append(w.getName());
					victoryDialog.querySelector(".count-hits")!.append(this.#gameBattle.countHits(w).toString());
					let victoryResume = victoryDialog.querySelector(".resume")!;

					for (let history of this.#gameBattle.getHistory()) {
						let $item = li([
							history.from.getName(),
							" a infligé ",
							history.attack.calcPower(history.from, history.to).toString(),
							" points de dégâts avec ",
							history.attack.getName(),
						]);
						victoryResume.append($item);
					}
				},
			);
		};

		return [
			pokemonFighter(this.#props.defender),
			pokemonFighter(this.#props.attacker, {
				onAttack,
				list: this.#props.attacks,
				opponent: this.#props.defender,
			}),
		];
	}

	mount() {
		this.#battleScreen.removeAttribute("hidden");
		this.#battleScreen.append(...this.render());
		this.#audioEffect.useButtonsEffect();
		this.#gameAtmosphere.battle();
	}
}
