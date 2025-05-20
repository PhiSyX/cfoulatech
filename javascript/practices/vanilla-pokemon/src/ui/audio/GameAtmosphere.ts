import type { Pokemon } from "../../domain/entities/Pokemon.ts";
import { audio } from "../dom/element.ts";

export class GameAtmosphere {
	#battleSound: HTMLAudioElement;
	#battleVictorySound: HTMLAudioElement;

	#currentMusic: HTMLAudioElement | null = null;
	#currentCry: HTMLAudioElement | null = null;

	constructor() {
		this.#battleSound = document.querySelector("#battle-sound")!;
		this.#battleVictorySound = document.querySelector("#battle-victory-sound")!;
	}

	cry(pokemon: Pokemon) {
		this.#currentCry?.pause();

		let pokemonName_en = pokemon.getName({ lang: "en" }).toLowerCase();
		let src = `https://play.pokemonshowdown.com/audio/cries/${pokemonName_en}.mp3`;
		let audioElement = audio(src, {
			id: `cry-${pokemonName_en}`,
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
