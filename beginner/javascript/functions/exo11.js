import { write } from "../utils/write.js";

/**
 * @param {number} n
 * @returns {number}
 */
function increment1(n) {
	return ++n;
}

/**
 * @param {number} n
 * @returns {number}
 */
function increment2(n) {
	return n + 1;
}

let output_1 = increment1(5);
let expected_output_1 = 6;

write(`${output_1} == ${expected_output_1}?`, output_1 === expected_output_1);

let output_2 = increment2(5);
let expected_output_2 = 6;

write(`${output_2} == ${expected_output_2}?`, output_2 === expected_output_2);
