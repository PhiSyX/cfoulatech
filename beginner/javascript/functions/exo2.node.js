import { stdin, stdout } from "node:process";
import { createInterface } from "node:readline/promises";
import { calculate_rect_area_input } from "./exo2.js";

const readline = createInterface({
	input: stdin,
	output: stdout,
});

let user_height_str = await readline.question("Quelle est votre longueur ? ");
let user_width_str = await readline.question("Quelle est votre largeur ? ");

let rect_area = calculate_rect_area_input(user_height_str, user_width_str);
console.log(rect_area);

readline.close();
export {};
