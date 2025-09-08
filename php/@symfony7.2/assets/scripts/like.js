export class Like {
	/**
	 * @type {HTMLFormElement}
	 */
	$root;

	/**
	 * @param {HTMLFormElement} $root
	 */
	constructor($root) {
		this.$root = $root;
	}

	/**
	 * @param {HTMLFormElement} $formElement
	 */
	static fromElement($formElement) {
		return new Like($formElement);
	}

	addEventListeners() {
		this.$root.addEventListener("submit", this.handleSubmit);
	}

	/**
	 * @param {SubmitEvent} evt
	 * @returns {Promise<void>}
	 */
	handleSubmit = async (evt) => {
		evt.preventDefault();

		const formAction = this.$root.getAttribute("action") || "";
		/**
		 * @type {HTMLInputElement|null}
		 */
		const $inputMethod = this.$root.querySelector("input[name='_method']");
		const formMethod = $inputMethod?.value || this.$root.getAttribute("method") || "POST";

		/**
		 * @type {{
		 * 	success: string;
		 * 	likes: number;
		 * 	flow: string[];
		 * 	button_title: string;
		 * }}
		 */
		const body = await fetch(formAction, {method: formMethod})
			.then(response => response.ok ? response.json() : Promise.reject(response));

		const $button = document.querySelector(`button[form='${this.$root.id}']`);
		const $buttonOutput = $button?.querySelector("output");
		const $buttonSvg = $button?.querySelector("svg use");

		if (!$button || !$buttonOutput || !$buttonSvg) {
			return;
		}

		$buttonOutput.value = body.likes.toFixed();
		$button.setAttribute("form", this.$root.id.replace(/((?:un)?like)$/, body.flow[0]));
		$button.setAttribute("title", body.button_title);
		$buttonSvg.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", `#${body.flow[1]}`);

		const $fragment = document.createDocumentFragment();

		for (let i = 0; i < 100; i++) {
			const $confetti = document.createElement("span");
			$confetti.classList.add("confetti");

			$confetti.style.transform = ` translate3d(${(randomNumber(500) - 250)}px, ${(randomNumber(225) - 150)}px, 0) `;
			$confetti.style.transform += `rotate(${randomNumber(360)}deg)`;

			$confetti.style.background = `hsla(${randomNumber(360)}, 100%, 50%, 1)`;

			$fragment.append($confetti);

			setTimeout(() => $confetti.remove(), (32 ** 2) + (i * 2));
		}

		$button.append($fragment);
	};
}

/**
 * @param {number} max
 * @param {number} min
 * @returns {number}
 */
function randomNumber(max, min = 0) {
	return Math.random() * (max - min) + min;
}
