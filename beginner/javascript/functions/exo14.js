import { write } from "../utils/write.js";

/**
 * @param {number} a
 * @param {number} b
 * @param {number} c
 * @returns {number}
 */
function via_math_max(a, b, c) {
	return Math.max(a, b, c);
}

write("Le maximum est de", via_math_max(10, 3, 42));
