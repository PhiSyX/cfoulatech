// -------- //
// Constant //
// -------- //

const Default = {
	includes_dash_before_number: false,
	includes_special_chars_after_dash: false,
	reduce_cumulative_hyphens_into_one: true,
};

// -------- //
// Fonction //
// -------- //

/**
 * Transforme une chaîne de caractère en kebab-case.
 * @param {string} text
 * @param {{
 * 	includes_dash_before_number?: boolean;
 * 	includes_special_chars_after_dash?: boolean,
 * 	reduce_cumulative_hyphens_into_one?: boolean,
 * }} user_options
 * @returns {string}
 */
function kebabcase(text, user_options = Default)
{
	let options = { ...Default, ...user_options };

	/**
	 * @param {string[number]} ch
	 * @param {number} idx
	 * @returns {string}
	 */
	let algo = (ch, idx) => {
		if (ch === "-" || ch !== ch.toUpperCase()) {
			return ch;
		}

		let prefix = idx !== 0 ? "-" : "";

		if (options.includes_dash_before_number) {
			if (/\d/.test(ch)) {
				return `${prefix}${ch.toLowerCase()}`;
			}
		}

		if (options.includes_special_chars_after_dash) {
			if (!/[a-z]/i.test(ch)) {
				return `${prefix}${ch.toLowerCase()}`;
			}
		}

		if (/[a-z]/i.test(ch)) {
			return `${prefix}${ch.toLowerCase()}`;
		}

		if (/\d/.test(ch)) {
			return ch;
		}

		return prefix;
	};

	let output = text.split("").map(algo).join("");

	if (options.reduce_cumulative_hyphens_into_one) {
		return output.replace(/-{2,}/g, "-");
	}

	return output;
}

// ------ //
// Export //
// ------ //

export { kebabcase };
