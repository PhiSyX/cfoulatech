import { write } from "../utils/write.js";

const EXPECTED_NUMBER = 10;

// Une première solution

let counter = 0;
let numbers = [];

while (counter !== EXPECTED_NUMBER) {
	numbers.push(++counter);
}

write("Les nombres de 1 à 10:", numbers);

// Une second solution
numbers = [];

while (numbers.length !== EXPECTED_NUMBER) {
	numbers.push(numbers.length + 1);
}

write("Les nombres de 1 à 10:", numbers);

// Une tierce solution
counter = 0;
numbers = [];

do {
	numbers.push(++counter);
} while (counter !== EXPECTED_NUMBER);

write("Les nombres de 1 à 10:", numbers);
