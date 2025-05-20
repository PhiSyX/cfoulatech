import type { Pokemon } from "../../domain/entities/Pokemon.ts";
import type { Attack } from "../../domain/entities/Attack.ts";
import { button, div, h1, header, img, li, meter, p, small, span, ul } from "../dom/element.ts";
import { minmax } from "../../shared/helpers.ts";

export function pokemonFighter(fighter: Pokemon, attack?: PokemonFighterProps["attack"]) {
	return new PokemonFighter({ fighter, attack }).render();
}

interface PokemonFighterProps {
	fighter: Pokemon;
	attack?: {
		list: Array<Attack>;
		onAttack: (_: Attack) => void;
		opponent: Pokemon;
	};
}

class PokemonFighter {
	#props: PokemonFighterProps;

	constructor(props: PokemonFighterProps) {
		this.#props = props;
	}

	render() {
		let maxHealth = this.#props.fighter.maxHealth();
		let hpDiff = p([], { className: "hp-diff" });

		const displayHitPoints = () => {
			let hp = minmax(this.#props.fighter.getHitPoints(), 0, maxHealth);
			hpDiff.textContent = `${hp.toFixed(0)} / ${maxHealth.toFixed(0)}`;
		};

		displayHitPoints();

		const moveIntoAttackList = (evt: KeyboardEvent) => {
			let li = (evt.currentTarget as HTMLButtonElement).parentElement as HTMLLIElement;
			console.log(li);
			if (evt.key === "ArrowUp") {
				let firstBtnFromPrevLi = (li.previousElementSibling as HTMLLIElement).children[0] as HTMLButtonElement;
				firstBtnFromPrevLi.focus();
			}
			if (evt.key === "ArrowDown") {
				let firstBtnFromNextLi = (li.nextElementSibling as HTMLLIElement).children[0] as HTMLButtonElement;
				firstBtnFromNextLi.focus();
			}
		};

		return div(
			[
				header([
					h1(
						[
							this.#props.fighter.getName(),
							" ",
							small(["Lv: ", this.#props.fighter.getLevel().toString()], { className: "level" }),
						],
						{ className: "name" },
					),
					meter(this.#props.fighter.getHitPoints(), maxHealth, {
						className: "hp-progress",
						event: { change: displayHitPoints },
					}),
					hpDiff,
				]),
				ul(
					(this.#props.attack?.list || []).map((attack) => {
						return li([
							button(
								[
									span(
										[
											attack
												.calcPower(this.#props.fighter, this.#props.attack?.opponent!)
												.toString(),
										],
										{
											className: ["badge", "text-align-right"],
										},
									),
									" ",
									attack.getName(),
								],
								{
									dataset: {
										name: attack.getName(),
										type: attack.getTypes().toString(),
									},
									event: {
										click: () => this.#props.attack?.onAttack(attack),
										keydown: moveIntoAttackList,
									},
								},
							),
						]);
					}),
					{ className: "attacks", hidden: !this.#props.attack },
				),
				img(`https://www.shinyhunters.com/images/regular/${this.#props.fighter.getId()}.gif`, {
					className: "pic",
					height: 200,
				}),
			],
			{
				id: `fighter-${this.#props.fighter.getId()}`,
				className: "fighter",
				dataset: {
					type: this.#props.attack && this.#props.fighter.getTypes().toString(),
				},
			},
		);
	}
}
