import { is_in_list_numbers } from "./exo4.js";

let user_number = Number.parseInt(prompt("Quel est votre nombre ?") || "", 10);
let has_number_been_found = is_in_list_numbers(user_number);

if (has_number_been_found) {
	alert(`${user_number} existe dans le tableau.`);
} else {
	alert(`${user_number} n'existe pas dans le tableau.`);
}
