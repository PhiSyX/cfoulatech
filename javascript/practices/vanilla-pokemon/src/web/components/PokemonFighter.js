// @ts-nocheck

import {
	button,
	div,
	h1,
	header,
	img,
	li,
	meter,
	p,
	small,
	span,
	ul,
} from "../dom/element.js";
import { minmax } from "../../shared/helpers.js";

export function pokemonFighter(fighter, attack)
{
	return new PokemonFighter({ fighter, attack }).render();
}

class PokemonFighter
{
	#props;

	constructor(props)
	{
		this.#props = props;
	}

	render()
	{
		let maxHealth = this.#props.fighter.maxHealth();
		let hpDiff = p([], { className: "hp-diff" });

		const displayHitPoints = () => {
			let hp = minmax(this.#props.fighter.getHitPoints(), 0, maxHealth);
			hpDiff.textContent = `${hp.toFixed(0)} / ${maxHealth.toFixed(0)}`;
		};

		displayHitPoints();

		const moveIntoAttackList = (evt) => {
			let li = evt.currentTarget.parentElement;
			console.log(li);
			if (evt.key === "ArrowUp") {
				let firstBtnFromPrevLi = li.previousElementSibling.children[0];
				firstBtnFromPrevLi.focus();
			}
			if (evt.key === "ArrowDown") {
				let firstBtnFromNextLi = li.nextElementSibling.children[0];
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
						let power = attack.calcPower(this.#props.fighter, this.#props.attack?.opponent);
						return li([
							button(
								[
									span(
										[power.toFixed(0)],
										{
											className: ["badge", "text-align-right"],
											title: `Puissance ${power}`,
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
