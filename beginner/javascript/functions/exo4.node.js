import { stdin, stdout } from "node:process";
import { createInterface } from "node:readline/promises";
import { calculate_tva_input } from "./exo4.js";

const readline = createInterface({
	input: stdin,
	output: stdout,
});

let user_price_excl = await readline.question("Quel est votre PRIX (HT) ");
let user_tva_rate = await readline.question("Quel est la TVA? ");

let amount = calculate_tva_input(user_price_excl, user_tva_rate);

console.log(amount);

readline.close

export {};
