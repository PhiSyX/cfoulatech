import { audio } from "../helpers/element.js";
import { POKEMON_CRY } from "../stores/PokedexStore.js";

/**
 * Classe représentant l'ambiance du jeu.
 */
export class GameAtmosphere {
	// --------- //
	// Propriété //
	// --------- //
	/**
	 * Element DOM AUDIO de la musique de combat.
	 * @type {HTMLAudioElement}
	 */
	#battleSound;
	/**
	 * Element DOM AUDIO de la musique de victoire.
	 * @type {HTMLAudioElement}
	 */
	#battleVictorySound;
	/**
	 * Musique jouée en cours d'écoute.
	 * @type {HTMLAudioElement|null}
	 */
	#currentMusic = null;
	/**
	 * Cri pokemon en cours d'écoute.
	 * @type {HTMLAudioElement|null}
	 */
	#currentCry = null
	/**
	 * URL Audio des cries du pokemon
	 * @type {string}
	 */
	#cryUrl;

	// ----------- //
	// Constructor //
	// ----------- //

	constructor() {
		this.#battleSound = document.querySelector("#battle-sound");
		this.#battleVictorySound = document.querySelector("#battle-victory-sound");
		this.#cryUrl = POKEMON_CRY;
	}

	// ------- //
	// Méthode //
	// ------- //

	/**
	 * Joue le crie d'un pokemon.
	 * @param {Pokemon} pokemon
	 */
	cry(pokemon) {
		this.#currentCry?.pause();
		let pokemonName_en = pokemon.getName({ lang: "en" }).toLowerCase();
		let src = this.#cryUrl.replace("{pokemon_en}", pokemonName_en);
		let audioElement = audio(src, { id: `cry-${pokemonName_en}` }, {
			ended: () => {
				this.#currentCry = null;
			}
		});
		audioElement.currentTime = 0;
		void audioElement.play();
		this.#currentCry = audioElement;
	}

	/**
	 * Joue la musique de combat.
	 */
	battle() {
		this.#currentMusic?.pause();
		setTimeout(() => {
			this.#currentMusic = this.#battleSound;
			void this.#battleSound.play();
		}, 500);
		this.#battleSound.addEventListener("ended", () => {
			this.#currentMusic = null;
		});
	}

	/**
	 * Joue la musique de victoire d'un combat.
	 */
	victory() {
		this.#currentMusic?.pause();
		setTimeout(() => {
			this.#currentMusic = this.#battleVictorySound;
			void this.#battleVictorySound.play();
		}, 500);
		this.#battleVictorySound.addEventListener("ended", () => {
			this.#currentMusic = null;
		});
	}
}

/**
 * @typedef {import("../../domain/entities/Pokemon.js").Pokemon} Pokemon
 */
