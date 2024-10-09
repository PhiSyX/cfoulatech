import { alert } from "../utils/alert.js";
import { prompt } from "../utils/prompt.js";

/**
 * La formule pour calculer un périmètre est: S * 4
 * @param {number} S - Les côtés
 * @returns {number}
 */
export function calculer_perimeter(S) {
	return S * 4;
}

let user_sides = Number(await prompt("Combien de côtés ?"));
let perimeter = calculer_perimeter(user_sides);

alert(`Le périmètre de ${user_sides} est: ${perimeter}`);
