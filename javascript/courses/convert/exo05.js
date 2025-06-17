import { write } from "../utils/write.js";
import { prompt } from "../utils/prompt.js";

let [enfant1, age1] = [
	await prompt("Prénom du premier enfant"),
	await prompt("Age du premier enfant", { cast: "int" }),
];

let [enfant2, age2] = [
	await prompt("Prénom du second enfant"),
	await prompt("Age du second enfant", { cast: "int" }),
];

let [enfant3, age3] = [
	await prompt("Prénom du troisième enfant"),
	await prompt("Age du troisième enfant", { cast: "int" }),
];

let plusGrand;

if (age1 > age2 && age1 > age3) {
	plusGrand = enfant1;
} else if (age2 > age1 && age2 > age3) {
	plusGrand = enfant2;
} else {
	plusGrand = enfant3;
}

write(`${plusGrand} est l'enfant le plus grand`);
