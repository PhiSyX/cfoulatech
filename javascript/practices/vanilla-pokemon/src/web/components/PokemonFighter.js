import { minmax } from "../../shared/helpers.js";
import { button, div, h1, header, img, li, meter, p, small, span, ul } from "../helpers/element.js";

/**
 * Rend un composant DOM PokemonFighter.
 * @param {PokemonFighterProps["fighter"]} fighter
 * @param {PokemonFighterProps["attack"]} attack
 * @returns {HTMLElement}
 */
export function pokemonFighter(fighter, attack) {
	return new PokemonFighter({ fighter, attack }).render();
}

const POKEMON_POSTER = "https://www.shinyhunters.com/images/regular/{id}.gif";

/**
 * Composant DOM PokemonFighter.
 */
class PokemonFighter {
	// --------- //
	// Propriété //
	// --------- //
	/**
	 * Les propriétés du composant.
	 * @type {PokemonFighterProps}
	 */
	#props;

	// ----------- //
	// Constructor //
	// ----------- //
	/**
	 * @param {PokemonFighterProps} props
	 */
	constructor(props) {
		this.#props = props;
	}

	// ------- //
	// Méthode //
	// ------- //
	/**
	 * Rendu du composant DOM.
	 * @returns {HTMLElement}
	 */
	render() {
		let maxHealth = this.#props.fighter.maxHealth();
		let hpDiff = p([], { className: "hp-diff" });

		const displayHitPoints = () => {
			let hp = minmax(this.#props.fighter.getHitPoints(), 0, maxHealth);
			hpDiff.textContent = `${hp.toFixed(0)} / ${maxHealth.toFixed(0)}`;
		};

		/**
		 * @param {KeyboardEvent} evt
		 */
		const moveIntoAttackList = (evt) => {
			let li = evt.currentTarget.parentElement;
			switch (evt.key) {
				case "ArrowUp":
					{
						let firstBtnFromPrevLi = li.previousElementSibling.children[0];
						firstBtnFromPrevLi?.focus();
					}
					break;

				case "ArrowDown":
					{
						let firstBtnFromNextLi = li.nextElementSibling.children[0];
						firstBtnFromNextLi?.focus();
					}
					break;
			}
		};

		displayHitPoints();

		return div(
			[
				header([
					h1(
						[
							this.#props.fighter.getName(),
							" ",
							small(["Lv: ", this.#props.fighter.getLevel()], { className: "level" }),
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
										type: attack.getTypes(),
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
				img(POKEMON_POSTER.replace("{id}", this.#props.fighter.getId()), {
					className: "pic",
					height: 200,
				}),
			],
			{
				id: `fighter-${this.#props.fighter.getId()}`,
				className: "fighter",
				dataset: {
					type: this.#props.attack && this.#props.fighter.getTypes(),
				},
			},
		);
	}
}

/**
 * @typedef {import("../../domain/entities/Pokemon.js").Pokemon} Pokemon
 * @typedef {import("../../domain/entities/Attack.js").Attack} Attack
 * @typedef {{ fighter: Pokemon; attack?: { list: Array<Attack>; onAttack: (_: Attack) => void; opponent: Pokemon; }; }} PokemonFighterProps
 */
