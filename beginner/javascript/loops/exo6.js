const EXPECTED_NUMBER = 10;

// Une première solution

let counter = 0;
let numbers = [];

while (counter !== EXPECTED_NUMBER) {
	numbers.push(++counter);
}

console.log("Les nombres de 1 à 10:", numbers);

// Une second solution
numbers = [];

while (numbers.length !== EXPECTED_NUMBER) {
	numbers.push(numbers.length + 1);
}

console.log("Les nombres de 1 à 10:", numbers);

// Une tierce solution
counter = 0;
numbers = [];

do {
	numbers.push(++counter);
} while (counter !== EXPECTED_NUMBER);

console.log("Les nombres de 1 à 10:", numbers);

// NOTE: typescript casse les bonbons ;)
export {};
