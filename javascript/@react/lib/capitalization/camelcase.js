// -------- //
// Constant //
// -------- //

const INCLUDE_SEPARATOR = /([\s-_:]+)/;
const EXCLUDE_SEPARATOR = /[\s-_:]+/;

const Default = {
	to_lower: true,
	includes_separators: true,
};

// -------- //
// Fonction //
// -------- //

/**
 * Transforme une chaîne de caractère en une chaîne capitalisée.
 * @param {string} text
 * @param {{ to_lower?: boolean; includes_separators?: boolean; }} user_options
 * @returns {*}
 */
function camelcase(text, user_options = Default)
{
	let options = { ...Default, ...user_options };

	/**
	 * @param {string} word
	 * @returns {string}
	 */
	let algo = (word) => {
		if (word.length === 0) {
			return word;
		}

		// SAFETY(phisyx): la condition ci-haut nous garantit que la chaîne de
		// caractères comporte au moins un (1) caractère, qui nous permet
		// d'accéder à l'index zéro (0) de la chaîne en toute sécurité.
		let first_ch /* char */ = word[0].toUpperCase();

		// NOTE(phisyx): le résultat d'une [String.prototype.slice(1)] lorsque
		// la chaîne est vide, renvoie une chaîne vide.
		let rest_of_str = word.slice(1);

		if (options.to_lower) {
			return first_ch + rest_of_str.toLowerCase();
		}
		return first_ch + rest_of_str;
	};

	if (!INCLUDE_SEPARATOR.test(text)) {
		return algo(text);
	}

	if (options.includes_separators === true) {
		return text
			.split(INCLUDE_SEPARATOR)
			.map(algo)
			.join("");
	}

	return text.split(EXCLUDE_SEPARATOR).map(algo).join("");
}

// ------ //
// Export //
// ------ //

export { camelcase };
