import { alert } from "../utils/alert.js";
import { prompt } from "../utils/prompt.js";

let m;

do {
	m = Number.parseInt(await prompt("Entre votre nombre entre 0 et 1000"));
} while (m >= 0 && m <= 1000);

alert(`La valeur ${m} n'est pas comprise entre 0 et 1000`);
