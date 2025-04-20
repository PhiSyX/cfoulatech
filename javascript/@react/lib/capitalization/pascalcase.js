import { camelcase } from "./camelcase";
import { kebabcase } from "./kebabcase";

// -------- //
// Fonction //
// -------- //

/**
 * Transforme une chaîne de caractère en PascalCase.
 * @param {string} text
 * @returns {string}
 */
function pascalcase(text)
{
	return camelcase(kebabcase(text).replace(/-/g, " "));
}

// ------ //
// Export //
// ------ //

export { pascalcase };
