import type { Pokemon } from "../../domain/entities/Pokemon.js";
import { audio } from "../helpers/element.js";

const CRY_POKEMON = "https://play.pokemonshowdown.com/audio/cries/{pokemon_en}.mp3";

/**
 * Ambiance du jeu.
 */
export class GameAtmosphere {
	// --------- //
	// Propriété //
	// --------- //

	#battleSound: HTMLAudioElement;
	#battleVictorySound: HTMLAudioElement;

	#currentMusic: HTMLAudioElement | null = null;
	#currentCry: HTMLAudioElement | null = null;

	// ----------- //
	// Constructor //
	// ----------- //

	constructor() {
		this.#battleSound = document.querySelector("#battle-sound")!;
		this.#battleVictorySound = document.querySelector("#battle-victory-sound")!;
	}

	// ------- //
	// Méthode //
	// ------- //

	/**
	 * Joue le crie d'un pokemon.
	 */
	cry(pokemon: Pokemon) {
		this.#currentCry?.pause();

		let pokemonName_en = pokemon.getName({ lang: "en" }).toLowerCase();
		let src = CRY_POKEMON.replace("{pokemon_en}", pokemonName_en);
		let audioElement = audio(src, {
			id: `cry-${pokemonName_en}`,
			// @ts-expect-error
			event: {
				ended: () => {
					this.#currentCry = null;
				},
			},
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
