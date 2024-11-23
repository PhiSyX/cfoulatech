import { write } from "../utils/write.js";

const EXPECTED_NUMBER = 100;

let counter = 0;
let sum = 0;

while (counter !== EXPECTED_NUMBER) {
	sum += ++counter;
}

write("La somme est de:", sum);
