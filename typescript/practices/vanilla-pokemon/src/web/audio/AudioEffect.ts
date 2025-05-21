export class AudioEffect {
	#btnEffect!: HTMLAudioElement;
	#hitEffect!: HTMLAudioElement;

	constructor() {
		this.#btnEffect = document.querySelector("#btn-effect")!;
		this.#hitEffect = document.querySelector("#hit-effect")!;
	}

	useButtonsEffect() {
		for (let btn of Array.from(document.querySelectorAll("button"))) {
			btn.removeEventListener("focus", this.select);
			btn.removeEventListener("mouseenter", this.select);

			btn.addEventListener("focus", this.select);
			btn.addEventListener("mouseenter", this.select);
		}
	}

	select = () => {
		this.#btnEffect.currentTime = 0.3;
		void this.#btnEffect.play();
	};

	hit = () => {
		void this.#hitEffect.play();
	};
}
