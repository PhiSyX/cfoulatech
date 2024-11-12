import { alert } from "../utils/alert.js";

let numbers = [3, 7, 12, 22, 34, 125, 56, 45, 4558, 41, 100];

for (let index = 0; index < numbers.length; index++) {
	let number = numbers[index];

	if (number % 2 === 0) {
		alert(`${number} est un nombre pair.`);
	}
}
