import { alert } from "../utils/alert.js";

let numbers = [5, 12, 8, 130, 44];

let numbers_len = numbers.length;

for (let i = numbers_len - 1; i >= 0; i--) {
	let number = numbers[i];
	alert(number);
}
