import { alert } from "../utils/alert.js";

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

let user_number = 5;
let output = calculate_cube(user_number);
alert(output);
