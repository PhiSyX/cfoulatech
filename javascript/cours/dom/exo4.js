import { alert } from "../utils/alert.js";
import { prompt } from "../utils/prompt.js";

let m = await prompt("Entre votre nombre entre 0 et 1000", {
	cast: "int",
	range: [0, 1000],
});

alert(`La valeur ${m} est comprise entre 0 et 1000`);
