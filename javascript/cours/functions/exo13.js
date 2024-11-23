import { write } from "../utils/write.js";

/**
 * @param {string} str
 * @returns {string}
 */
export function via_for(str) {
	let new_str = "";

	for (let index = str.length - 1; index >= 0; index--) {
		let ch = str[index];
		new_str += ch;
	}

	return new_str;
}

/**
 * @param {string} str
 * @returns {string}
 */
export function recursively(str) {
	if (str.length === 0) {
		return "";
	}
	return recursively(str.slice(1)) + str.charAt(0);
}

/**
 * @param {string} str
 * @returns {string}
 */
export function natively(str) {
	return Array.from(str).reverse().join("");
}

let output_1 = via_for("Salut");
let expected_output_1 = "tulaS";

write(
	output_1,
	"est équivalent de",
	expected_output_1,
	"?",
	output_1 === expected_output_1,
);

let output_2 = recursively("Bonjour");
let expected_output_2 = "ruojnoB";

write(
	output_2,
	"est équivalent de",
	expected_output_2,
	"?",
	output_2 === expected_output_2,
);

let output_3 = natively("Bonjour");
let expected_output_3 = "ruojnoB";
write(
	output_3,
	"est équivalent de",
	expected_output_3,
	"?",
	output_3 === expected_output_3,
);
