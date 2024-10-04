const EXPECTED_NUMBER = 100;

let counter = 0;
let sum = 0;

while (counter !== EXPECTED_NUMBER) {
	sum += ++counter;
}

console.log("La somme est de:", sum);

// NOTE: typescript casse les bonbons ;)
export {};
