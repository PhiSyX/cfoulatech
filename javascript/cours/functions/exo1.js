import { alert } from "../utils/alert.js";
import { prompt } from "../utils/prompt.js";

/**
 * Calcule le cube d'un nombre.
 *
 * La formule est : N * N * N;
 *
 * @param {number} N
 * @returns {number}
 */
function calculate_cube(N) {
	return N * N * N;
}

let user_number = await prompt("Entre un nombre", { cast: "number" });
let output = calculate_cube(user_number);
alert(`Le cube de ${user_number} est ${output}`);
