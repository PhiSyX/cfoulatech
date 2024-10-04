import { stdin, stdout } from "node:process";
import { createInterface } from "node:readline/promises";
import { is_in_list_numbers } from "./exo4.js";

const readline = createInterface({
	input: stdin,
	output: stdout,
});

let user_number = Number.parseInt(
	await readline.question("Quel est votre nombre ? "),
	10
);

let has_number_been_found = is_in_list_numbers(user_number);

if (has_number_been_found) {
	console.log(`${user_number} existe dans le tableau.`);
} else {
	console.log(`${user_number} n'existe pas dans le tableau.`);
}

readline.close();

// NOTE: typescript casse les bonbons ;)
export {};
