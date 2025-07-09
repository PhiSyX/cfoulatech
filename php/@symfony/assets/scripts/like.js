export class Like {
	/**
	 * @type {HTMLFormElement}
	 */
	$root;

	constructor($like) {
		this.$root = $like;
	}

	static fromElement($like) {
		return new Like($like);
	}

	addEventListeners() {
		this.$root.addEventListener("submit", this.handleSubmit);
	}

	handleSubmit = async (evt) => {
		evt.preventDefault();

		const formAction = this.$root.getAttribute("action");
		const formMethod = this.$root.querySelector("input[name='_method']")?.value || this.$root.getAttribute("method");

		const body = await fetch(formAction, {method: formMethod})
			.then(response => response.ok ? response.json() : Promise.reject(response));

		const $button = document.querySelector(`button[form='${this.$root.id}']`);
		const $buttonOutput = $button.querySelector("output");
		const $buttonSvg = $button.querySelector("svg use");

		$buttonOutput.value = body.likes;

		$button.setAttribute("form", this.$root.id.replace(/((?:un)?like)$/, body.flow[0]));
		$button.setAttribute("title", body.button_title);
		$buttonSvg.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", `#${body.flow[1]}`);

		const $fragment = document.createDocumentFragment();

		for (let i = 0; i < 100; i++) {
			const $confetti = document.createElement("span");
			$confetti.classList.add("confetti");

			$confetti.style.transform = ` translate3d(${(random(500) - 250)}px, ${(random(225) - 150)}px, 0) `;
			$confetti.style.transform += `rotate(${random(360)}deg)`;

			$confetti.style.background = `hsla(${random(360)}, 100%, 50%, 1)`;

			$fragment.append($confetti);

			setTimeout(() => $confetti.remove(), (32 ** 2) + (i * 2));
		}

		$button.append($fragment);
	};
}


function random(max) {
	return Math.random() * max;
}
