import { pokedex, pokemons } from "../domain/Pokedex.ts";

export class AudioEffect {
	#battleSound: HTMLAudioElement;
	#battleVictorySound: HTMLAudioElement;
	#buttonEffect: HTMLAudioElement;
	#hitEffect: HTMLAudioElement;

	#currentAudio: HTMLAudioElement | null = null;
	#currentCry: HTMLAudioElement | null = null;

	constructor() {
		this.#buttonEffect = document.querySelector("#btn-effect")!;
		this.#hitEffect = document.querySelector("#hit-effect")!;
		this.#battleSound = document.querySelector("#battle-sound")!;
		this.#battleVictorySound = document.querySelector("#battle-victory-sound")!;
	}

	/**
	 * Ajoute des effets sonores sur différents éléments du site
	 */
	setupGlobal() {
		// Active l'effet sur tous les boutons
		for (let $el of document.querySelectorAll("button")) {
			$el.removeEventListener("click", this.#playButtonEffect);
			$el.removeEventListener("mouseenter", this.#playButtonEffect);

			$el.addEventListener("click", this.#playButtonEffect);
			$el.addEventListener("mouseenter", this.#playButtonEffect);
		}
	}

	/**
	 * Crée tous les cries des pokémons
	 */
	setupPokedex() {
		for (let pokemon of [...pokedex, ...pokemons]) {
			let $audio = document.createElement("audio");
			let [pokemonCry, pokemonAudio] = pokemon.getCry();
			$audio.id = pokemonCry;
			$audio.src = pokemonAudio;
			document.body.append($audio);
		}
	}

	#playButtonEffect = () => {
		this.#buttonEffect.currentTime = 0.3;
		void this.#buttonEffect.play();
	};

	playHitEffect() {
		this.#hitEffect.currentTime = 0;
		void this.#hitEffect.play();
	}

	playBattleSound() {
		this.#currentAudio?.pause();

		setTimeout(() => {
			this.#currentAudio = this.#battleSound;
			void this.#battleSound.play();
		}, 500);

		this.#battleSound.addEventListener("ended", () => {
			this.#currentAudio = null;
		});
	}

	/**
	 * Joue un son sur un élément <audio />
	 */
	playCry(idSelector: string, delay: number = 0, initialTime: number = 0) {
		this.#currentCry?.pause();

		let $audio = document.querySelector<HTMLAudioElement>(`#${idSelector}`)!;
		$audio.currentTime = initialTime;

		setTimeout(() => {
			this.#currentCry = $audio;
			void $audio.play();
		}, delay);

		$audio.addEventListener("ended", () => {
			this.#currentCry = null;
		});

		return $audio;
	}

	/**
	 * Joue le son de la victoire d'une partie.
	 */
	playBattleVictorySound() {
		this.#currentAudio?.pause();

		setTimeout(() => {
			this.#currentAudio = this.#battleVictorySound;
			void this.#battleVictorySound.play();
		}, 500);

		this.#battleVictorySound.addEventListener("ended", () => {
			this.#currentAudio = null;
		});
	}
}
