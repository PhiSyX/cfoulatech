export class DateTime {
	/**
	 * @type {Date}
	 */
	#date;

	static EVERY_SECOND = 1_000;

	/**
	 * @param {string} date
	 */
	constructor(date) {
		this.#date = new Date(date);
	}

	changeFooterTime() {
		/**
		 * @typedef {() => number} FnNumber
		 *
		 * @type {Record<string,FnNumber>}
		 */
		let $els = {
			years: () => this.#date.getFullYear(),
			months: () => this.#date.getMonth() + 1,
			days: () => this.#date.getDate(),
			hours: () => this.#date.getHours(),
			minutes: () => this.#date.getMinutes(),
			seconds: () => this.#date.getSeconds(),
		};

		// Change le temps
		setInterval(() => {
			this.#date.setSeconds(this.#date.getSeconds() + 1);

			for (let [key, fn] of Object.entries($els)) {
				let $el = document.querySelector(`.js-${key}`);
				if ($el && Number($el.textContent) !== fn()) {
					$el.textContent = fn().toFixed().padStart(2, '0');
				}
			}
		}, DateTime.EVERY_SECOND);
	}
}
