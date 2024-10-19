import { alert } from "../utils/alert.js";
import { prompt } from "../utils/prompt.js";

/**
 * Calcule le cube d'un nombre.
 *
 * Le formule est : N * N * N;
 *
 * @param {number} N
 * @returns {number}
 */
function calculate_cube(N) {
	return N * N * N;
}

let user_number = Number.parseInt(await prompt("Entre un nombre"), 10);
let output = calculate_cube(user_number);
alert(`Le cube de ${user_number} est ${output}`);
