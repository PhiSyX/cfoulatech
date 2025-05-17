import { pokedex, pokemons } from "../domain/Pokedex.ts";

class AudioEffect {
	global() {
		const playEffect = () => {
			audioDelay("hover-effect", 0, .3);
		};

		for (let $el of document.querySelectorAll("button")) {
			$el.removeEventListener("click", playEffect);
			$el.addEventListener("click", playEffect);
		}
	}

	pokedex() {
		for (let pokemon of [...pokedex, ...pokemons]) {
			let $audio = document.createElement("audio");
			let [pokemonCry, pokemonAudio] = pokemon.getCry();
			$audio.id = pokemonCry;
			$audio.src = pokemonAudio;
			document.body.append($audio);
		}
	}
}

export const useAudioEffect = () => {
	let audioEffect = new AudioEffect();
	audioEffect.global();
	audioEffect.pokedex();
};

export function audioDelay(idSelector: string, delay: number, ct: number = 0) {
	let $audio = document.querySelector<HTMLAudioElement>(`#${idSelector}`)!;
	$audio.currentTime = ct;
	setTimeout(() => void $audio.play(), delay);
	return $audio;
}
