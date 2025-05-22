import type { Attack } from "../../domain/entities/Attack.js";
import type { Pokemon } from "../../domain/entities/Pokemon.js";
import { minmax } from "../../shared/helpers.js";
import { button, div, h1, header, img, li, meter, p, small, span, ul } from "../helpers/element.js";

interface PokemonFighterProps {
	fighter: Pokemon;
	attack?: {
		list: Array<Attack>;
		onAttack: (_: Attack) => void;
		opponent: Pokemon;
	};
}

/**
 * Rend un composant DOM PokemonFighter.
 */
export function pokemonFighter(
	fighter: PokemonFighterProps["fighter"],
	attack?: PokemonFighterProps["attack"],
): HTMLElement {
	return new PokemonFighter({ fighter, attack }).render();
}

/**
 * Composant DOM PokemonFighter.
 */
class PokemonFighter {
	// --------- //
	// Propriété //
	// --------- //

	/**
	 * Les propriétés du composant.
	 */
	#props: PokemonFighterProps;

	// ----------- //
	// Constructor //
	// ----------- //

	constructor(props: PokemonFighterProps) {
		this.#props = props;
	}

	// ------- //
	// Méthode //
	// ------- //

	/**
	 * Rendu du composant DOM.
	 */
	render(): HTMLElement {
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
						// @ts-expect-error
						event: { change: displayHitPoints },
					}),
					hpDiff,
				]),
				ul(
					(this.#props.attack?.list || []).map((attack) => {
						let power = attack.calcPower(this.#props.fighter, this.#props.attack?.opponent!);
						return li([
							button(
								[
									span([power.toFixed(0)], {
										className: ["badge", "text-align-right"],
										title: `Puissance ${power}`,
									}),
									" ",
									attack.getName(),
								],
								{
									dataset: {
										name: attack.getName(),
										type: attack.getTypes().toString(),
									},
									// @ts-expect-error
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
					// @ts-expect-error
					type: this.#props.attack && this.#props.fighter.getTypes().toString(),
				},
			},
		);
	}
}
