import { minmax } from "../../shared/helpers.js";
import { button, div, h1, header, img, li, meter, paragraph, small, span, ul } from "../helpers/element.js";
import { POKEMON_FIGHTER_POSTER } from "../stores/MyGameStore.js";

/**
 * Effectue le rendu du composant PokemonFighter.
 * @param {PokemonFighterProps["fighter"]} fighter
 * @param {PokemonFighterProps["attack"]} [attack]
 * @returns {HTMLElement}
 */
export function pokemonFighter(fighter, attack) {
	return new PokemonFighter({ fighter, attack, poster: POKEMON_FIGHTER_POSTER })
		.render();
}

/**
 * Classe représentant le composant DOM PokemonFighter.
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
	 * Construit le composant PokemonFighter
	 * @param {PokemonFighterProps} props
	 */
	constructor(props) {
		this.#props = props;
	}

	// ------- //
	// Méthode // -> Publique
	// ------- //
	/**
	 * Rendu du composant DOM.
	 * @returns {HTMLElement}
	 */
	render() {
		let maxHealth = this.#props.fighter.maxHealth();
		let hpDiff = paragraph([], { className: "hp-diff" });

		const displayHitPoints = () => {
			let hp = minmax(this.#props.fighter.getHitPoints(), 0, maxHealth);
			hpDiff.textContent = `${hp.toFixed(0)} / ${maxHealth.toFixed(0)}`;
		};

		displayHitPoints();

		return div(
			[
				header([
					h1(
						[
							this.#props.fighter.getName(),
							" ",
							small(
								["Lv: ", this.#props.fighter.getLevel()],
								{ className: "level" },
							),
						],
						{ className: "name" },
					),

					meter(
						this.#props.fighter.getHitPoints(),
						maxHealth,
						{ className: "hp-progress" },
						{ change: displayHitPoints }
					),

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
										title: `Puissance ${power} - Base ${attack.getPower()}`,
									}),
									" ",
									attack.getName(),
								],
								{
									dataset: { name: attack.getName(), type: attack.getTypes() },
								},
								{
									click: () => this.#props.attack?.onAttack(attack),
									keydown: this.#moveIntoAttackList,
								}
							),
						]);
					}),
					{ className: "attacks", hidden: !this.#props.attack },
				),

				img(this.#props.poster.replace("{id}", this.#props.fighter.getId()), {
					className: "pic",
					height: 200,
				}),
			],
			{
				id: `fighter-${this.#props.fighter.getId()}`,
				className: "fighter",
				dataset: { type: this.#props.attack && this.#props.fighter.getTypes() },
			},
		);
	}

	// ------- //
	// Méthode // -> Privée
	// ------- //

	/**
	 * Se déplace dans la liste des combattants de l'écran de Pokedex.
	 * @param {KeyboardEvent} evt
	 */
	#moveIntoAttackList = (evt) => {
		/**
		 * @type {HTMLButtonElement}
		 */
		let $btn = evt.currentTarget;
		/**
		 * @type {HTMLLIElement}
		 */
		let $li = $btn.parentElement;
		switch (evt.key) {
			case "ArrowUp":
			{
				/**
				 * @type {HTMLLIElement|null}
				 */
				let previousLi = $li.previousElementSibling?.children[0];
				previousLi?.focus();
			} break;

			case "ArrowDown":
			{
				/**
				 * @type {HTMLLIElement|null}
				 */
				let nextLi = $li.nextElementSibling?.children[0];
				nextLi?.focus();
			} break;
		}
	};
}

/**
 * @typedef {import("../../domain/entities/Pokemon.js").Pokemon} Pokemon
 * @typedef {import("../../domain/entities/Attack.js").Attack} Attack
 *
 * @typedef {{
 * 		fighter: Pokemon;
 * 		poster: `${string}{id}${string}`;
 * 		attack?: {
 * 			list: Array<Attack>;
 * 			onAttack: (_: Attack) => void;
 * 			opponent: Pokemon;
 * 		};
 * }} PokemonFighterProps
 */
