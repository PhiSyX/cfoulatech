import { alert } from "../utils/alert.js";
import { prompt_number } from "../utils/prompt.js";

let numbers = [3, 7, 12, 22, 34, 125, 56, 45, 4558, 41, 100];
let user_number = await prompt_number("Quel est votre nombre ?");
let numbers_len = numbers.length;
let has_number_been_found = false;

for (let index = 0; index < numbers_len; index++) {
	let current_iteration_number = numbers[index];
	has_number_been_found = current_iteration_number === user_number;
	if (has_number_been_found) {
		break;
	}
}

if (has_number_been_found) {
	alert(`Le nombre ${user_number} existe dans le tableau.`);
} else {
	alert(`Le nombre ${user_number} N'EXISTE PAS dans le tableau.`);
}

// NOTE: typescript casse les bonbons ;)
export {};
