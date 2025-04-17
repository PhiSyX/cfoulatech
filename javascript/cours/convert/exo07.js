import { prompt } from "../utils/prompt.js";
import { write } from "../utils/write.js";

let prenom = await prompt("Votre prénom");
let age = await prompt("Votre âge", { cast: "int" });

if (age >= 18) {
	write("Vous êtes majeur, " + prenom);
} else {
	write("Vous êtes mineur, " + prenom);
}
