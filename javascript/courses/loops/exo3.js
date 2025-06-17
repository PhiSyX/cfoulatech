import { write } from "../utils/write.js";

let numbers = [5, 12, 8, 130, 44];

let numbers_len = numbers.length;

let highest_number = numbers[0];

for (let index = 1; index < numbers_len; index++) {
	let number = numbers[index];

	if (number > highest_number) {
		highest_number = number;
	}
}

write(
	`${highest_number} est le nombre le plus grand parmi la liste des nombres:`,
	numbers
);
