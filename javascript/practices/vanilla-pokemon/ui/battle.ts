import type { Pokemon } from "../domain/Pokemon.ts";
import { AudioEffect } from "./audio.ts";
import { GameBattle } from "../domain/GameBattle.ts";
import { button, fragment, getTemplate, li, span } from "./elements.ts";
import { minmax } from "../utils/helpers.ts";

interface BattleScreenProps
{
	attacker: Pokemon;
	defender: Pokemon;
	audio: AudioEffect;
}

interface BattleFightProps
{
	fighter: Pokemon;
	opponent: Pokemon;
	controls: boolean;
	audio: AudioEffect;
}

interface BattleScreenState
{
	game: GameBattle;
}

class BattleScreenUI
{
	props: BattleScreenProps;
	state: BattleScreenState;

	headerLayout: HTMLDivElement;
	homeScreen: HTMLDivElement;
	battleScreen: HTMLDivElement;

	constructor(props: BattleScreenProps)
	{
		this.props = props;
		this.state = {
			game: new GameBattle(this.props.attacker, this.props.defender),
		};

		this.headerLayout = document.querySelector("#header")!;
		this.homeScreen = document.querySelector("#pokedex-screen")!;
		this.battleScreen = document.querySelector("#battle-screen")!;
	}

	render()
	{
		return [
			new BattleFightUI(
				{
					fighter: this.props.defender,
					opponent: this.props.attacker,
					controls: false,
					audio: this.props.audio,
				},
				this.state,
			).render(),

			new BattleFightUI(
				{
					fighter: this.props.attacker,
					opponent: this.props.defender,
					controls: true,
					audio: this.props.audio,
				},
				this.state,
			).render(),
		];
	}

	show()
	{
		this.homeScreen.setAttribute("hidden", "hidden");
		this.headerLayout.setAttribute("hidden", "hidden");
		this.battleScreen.removeAttribute("hidden");
		this.battleScreen.append(...this.render());
	}
}

class BattleFightUI
{
	#props: BattleFightProps;
	#state: BattleScreenState;

	#template: HTMLDivElement;
	#name: HTMLHeadingElement;
	#level: HTMLSpanElement;
	#hpProgress: HTMLMeterElement;
	#hpDiff: HTMLSpanElement;
	#picture: HTMLImageElement;
	#attacks: HTMLUListElement;

	constructor(props: BattleFightProps, state: BattleScreenState)
	{
		this.#props = props;
		this.#state = state;

		let $tpl = getTemplate("#tpl-fighter");
		this.#template = $tpl;
		this.#name = $tpl.querySelector(".name")!;
		this.#level = $tpl.querySelector(".level")!;
		this.#hpProgress = $tpl.querySelector(".hp-progress")!;
		this.#hpDiff = $tpl.querySelector(".hp-diff")!;
		this.#picture = $tpl.querySelector(".pic")!;
		this.#attacks = $tpl.querySelector(".attacks")!;
	}

	render()
	{
		this.#template.id = `fighter-${this.#props.fighter.getId()}`;

		this.#name.prepend(this.#props.fighter.getName(), " ");
		this.#level.append(this.#props.fighter.getLevel().toString());

		/* Barre de progression des points de vies */
		let maxHealth = this.#props.fighter.maxHealth();
		this.#hpProgress.optimum = maxHealth;
		this.#hpProgress.low = maxHealth / 6;
		this.#hpProgress.high = maxHealth / 2;
		this.#hpProgress.max = maxHealth;
		this.#hpProgress.value = this.#props.fighter.getHitPoints();
		this.#hpDiff.removeAttribute("hidden");

		const displayHitPoints = () => {
			let max = this.#props.fighter.maxHealth();
			let hp = minmax(this.#props.fighter.getHitPoints(), 0, max);
			this.#hpDiff.textContent = `${hp.toFixed(0)} / ${max.toFixed(0)}`;
		};

		displayHitPoints();
		this.#hpProgress.addEventListener("change", displayHitPoints);

		if (this.#props.controls) {
			this.#template.dataset.type = this.#props.fighter.getType().toString();
		}

		this.#picture.src = this.#props.fighter.getGif();

		if (!this.#props.controls) return this.#template;

		this.#attacks.removeAttribute("hidden");

		for (let attack of this.#props.fighter.getAttacks()) {
			let power = attack.calcPower(this.#props.fighter, this.#props.opponent);
			let $attackPower = span(Math.floor(power).toString(), {
				attrs: {
					className: ["badge", "text-align-right"],
					title: `Puissance ${power.toFixed(2)}`,
				},
			});

			let $attackBtn = button(fragment($attackPower, attack.name), {
				attrs: {
					dataset: {
						name: attack.name,
						type: attack.type.toString(),
					},
				},
				events: { click: this.handleAttackOpponent },
			});

			let $attack = li([$attackBtn]);
			this.#attacks.append($attack);
		}

		return this.#template;
	}

	handleAttackOpponent = (evt: MouseEvent) => {
		let attack = this.#props.fighter.getAttack((evt.currentTarget as unknown as HTMLButtonElement).dataset.name!)!;


		this.#state.game.flow(
			this.#props.fighter,
			this.#props.opponent!,
			attack,
			(f1, f2, _) => {
				let $f1 = document.querySelector(`#fighter-${f1.getId()}`)!;
				$f1.removeAttribute("data-type");
				let $f2 = document.querySelector(`#fighter-${f2.getId()}`)!;
				$f2.setAttribute("data-type", f2.getType().toString());

				let $f2HpProgress = $f2.querySelector<HTMLMeterElement>(".hp-progress")!;
				$f2HpProgress.value = f2.getHitPoints();
				$f2HpProgress.dispatchEvent(new CustomEvent("change"));

				void this.#props.audio.playHitEffect();
			},

			(w, d) => {
				this.#props.audio.playBattleVictorySound();

				let victoryDialog = document.querySelector<HTMLDialogElement>("#victory-dialog")!;
				victoryDialog.showPopover();
				victoryDialog.addEventListener("blur", () => window.location.reload());

				victoryDialog.querySelector(".name")!.append(w.getName());
				victoryDialog.querySelector(".count-hits")!.append(this.#state.game.countHits(w).toString());
				let victoryResume = victoryDialog.querySelector(".resume")!;

				for (let history of this.#state.game.history) {
					let $item = li([
						history.attacker.getName(),
						" a infligé ",
						history.attack.calcPower(history.attacker, history.defender).toString(),
						" points de dégâts avec ",
						history.attack.name,
					]);
					victoryResume.append($item);
				}
			},
		);
	};
}

export function createBattleScreen(attacker: Pokemon, defender: Pokemon): void
{
	let audio = new AudioEffect();

	let screen = new BattleScreenUI({
		attacker,
		defender,
		audio,
	});

	screen.show();

	audio.setupGlobal();

	audio.playBattleSound();
	audio.playCry(attacker.getCry()[0], 5_000);
	audio.playCry(defender.getCry()[0], 8_000);
}
