import type { Pokemon } from "../domain/Pokemon.ts";
import { audioDelay, useAudioEffect } from "./audio.ts";
import { GameBattle } from "../domain/GameBattle.ts";
import {
	button,
	changeImage,
	changeProgress,
	changeText,
	getTemplate,
	hideElement,
	li,
	showElement,
	span,
} from "./elements.ts";
import { minmax } from "../utils/helpers.ts";

interface BattleScreenProps {
	attacker: Pokemon;
	defender: Pokemon;
}

interface BattleFightProps {
	fighter: Pokemon;
	opponent?: Pokemon;
	controls: boolean;
}

interface BattleScreenState {
	game: GameBattle;
}

class BattleScreenUI {
	props: BattleScreenProps;
	state: BattleScreenState;

	headerLayout: HTMLDivElement;
	homeScreen: HTMLDivElement;
	battleScreen: HTMLDivElement;

	constructor(props: BattleScreenProps) {
		this.props = props;
		this.state = {
			game: new GameBattle(this.props.attacker, this.props.defender),
		};

		this.headerLayout = document.querySelector("#header")!;
		this.homeScreen = document.querySelector("#pokedex-screen")!;
		this.battleScreen = document.querySelector("#battle-screen")!;
	}

	render() {
		return [
			new BattleFightUI(
				{
					fighter: this.props.defender,
					controls: false,
				},
				this.state,
			).render(),
			new BattleFightUI(
				{
					fighter: this.props.attacker,
					opponent: this.props.defender,
					controls: true,
				},
				this.state,
			).render(),
		];
	}

	show() {
		hideElement(this.homeScreen);
		hideElement(this.headerLayout);
		showElement(this.battleScreen);
		this.battleScreen.append(...this.render());
	}
}

class BattleFightUI {
	props: BattleFightProps;
	state: BattleScreenState;

	template: HTMLDivElement;
	name: HTMLHeadingElement;
	level: HTMLSpanElement;
	hpProgress: HTMLProgressElement;
	hpDiff: HTMLSpanElement;
	picture: HTMLImageElement;
	attacks: HTMLUListElement;

	constructor(props: BattleFightProps, state: BattleScreenState) {
		this.props = props;
		this.state = state;

		let $tpl = getTemplate("#tpl-fighter");
		this.template = $tpl;
		this.name = $tpl.querySelector(".name")!;
		this.level = $tpl.querySelector(".level")!;
		this.hpProgress = $tpl.querySelector(".hp-progress")!;
		this.hpDiff = $tpl.querySelector(".hp-diff")!;
		this.picture = $tpl.querySelector(".pic")!;
		this.attacks = $tpl.querySelector(".attacks")!;
	}

	render() {
		this.template.id = `fighter-${this.props.fighter.getId()}`;

		this.name.prepend(this.props.fighter.getName(), " ");
		this.level.append(this.props.fighter.getLevel().toString());

		changeProgress(
			this.hpProgress,
			this.props.fighter.getHitPoints(),
			this.props.fighter.maxHealth(),
		);

		if (this.props.controls) {
			this.template.dataset.type = this.props.fighter
				.getType()
				.toString();
		}

		showElement(this.hpDiff);
		changeText(
			this.hpDiff,
			`${this.props.fighter.getHitPoints().toFixed(0)} / ${this.props.fighter.maxHealth().toFixed(0)}`,
		);

		changeImage(this.picture, this.props.fighter.getGif());

		if (!this.props.controls) return this.template;

		showElement(this.attacks);

		for (let attack of this.props.fighter.getAttacks()) {
			this.attacks.append(
				li({
					children: [
						button({
							attrs: { dataset: { name: attack.name, type: attack.type.toString() } },
							events: { click: this.handleAttackOpponent },
							children: [
								span(
									attack.calcPower(this.props.fighter, this.props.opponent!).toFixed(1), {
										attrs: {
											className: [
												"badge",
												"text-align-right",
											],
											title: `Puissance de base ${attack.power}`,
										},
									}),
								attack.name,
							],
						}),
					],
				}),
			);
		}

		return this.template;
	}

	handleAttackOpponent = (e: MouseEvent) => {
		let attack = this.props.fighter.getAttack(
			(e.currentTarget as unknown as HTMLButtonElement).dataset.name!,
		)!;

		this.template.classList.add("attack");

		this.state.game.autoflow(
			this.props.fighter,
			this.props.opponent!,
			attack,
			(f1, f2) => {
				let $f1 = document.querySelector(`#fighter-${f1.getId()}`);
				$f1?.removeAttribute("data-type");

				let $f2 = document.querySelector(`#fighter-${f2.getId()}`);
				$f2?.setAttribute("data-type", f2.getType().toString());

				changeText(
					document.querySelector(`#fighter-${f2.getId()} .hp-diff`),
					`${
						minmax(f2.getHitPoints(), 0, f2.maxHealth())
							.toFixed(0)
					} / ${f2.maxHealth().toFixed(0)}`,
				);

				changeProgress(
					document.querySelector(
						`#fighter-${f2.getId()} .hp-progress`,
					),
					f2.getHitPoints(),
				);

				document.querySelector("#hit-effect")?.play();
			},

			(w, d) => {
				document
					.querySelector<HTMLAudioElement>("#battle-effect")
					?.pause();
				document
					.querySelector<HTMLAudioElement>("#battle-victory-effect")
					?.play();
				console.log("death", {
					w: w.getName(),
					d: d.getName(),
					g1: w.getHitPoints(),
					g2: d.getHitPoints(),
				});
			},
		);
	};
}

export function createBattleScreen(attacker: Pokemon, defender: Pokemon): void {
	let screen = new BattleScreenUI({ attacker, defender });
	screen.show();

	audioDelay("battle-effect", 500);
	audioDelay(attacker.getCry()[0], 5_000);
	audioDelay(defender.getCry()[0], 8_000);

	useAudioEffect();
}
