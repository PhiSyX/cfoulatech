import { alert } from "../utils/alert.js";
import { prompt } from "../utils/prompt.js";

/**
 * La formule pour calculer un périmètre est: S * 4
 * @param {number} S - Les côtés
 * @returns {number} Le périmètre
 */
function calculate_perimeter(S) {
	return S * 4;
}

let user_sides = Number.parseInt(await prompt("Combien de côtés ?"), 10);
let perimeter = calculate_perimeter(user_sides);

alert(`Le périmètre de ${user_sides} est: ${perimeter}`);
