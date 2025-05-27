/**
 * Classe représentant les effets sonores du jeu.
 */
export class AudioEffect {
	// --------- //
	// Propriété //
	// --------- //
	/**
	 * Element audio concernant un effet de selection sur les boutons
	 * @type {HTMLAudioElement}
	 */
	#selectionButtonEffect;
	/**
	 * Element audio concernant un effet de frappe d'un Pokemon.
	 * @type {HTMLAudioElement}
	 */
	#hitPokemonEffect;

	// ----------- //
	// Constructor //
	// ----------- //
	constructor() {
		this.#selectionButtonEffect = document.querySelector("#btn-effect");
		this.#hitPokemonEffect = document.querySelector("#hit-effect");
	}

	// ------- //
	// Méthode //
	// ------- //

	/**
	 * Applique un effet sonore sur tous les boutons.
	 */
	useButtonsEffect() {
		for (let btn of Array.from(document.querySelectorAll("button"))) {
			btn.removeEventListener("focus", this.select);
			btn.removeEventListener("mouseenter", this.select);

			btn.addEventListener("focus", this.select);
			btn.addEventListener("mouseenter", this.select);
		}
	}

	/**
	 * Joue l'effet sonore de sélection d'un bouton.
	 */
	select = () => {
		this.#selectionButtonEffect.currentTime = 0.3;
		void this.#selectionButtonEffect.play();
	};

	/**
	 * Joue l'effet sonore d'une attaque envers un autre pokemon.
	 */
	hit = () => {
		this.#hitPokemonEffect.currentTime = 0;
		void this.#hitPokemonEffect.play();
	};
}
