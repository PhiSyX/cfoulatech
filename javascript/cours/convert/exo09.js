import { prompt } from "../utils/prompt.js";
import { write } from "../utils/write.js";

let lang = await prompt(
	"Quel est ton langage de programmation favoris entre le Python, Java et PHP ?",
	{
		enum: ["Python", "Java", "PHP"],
	},
);
switch (lang) {
	case "Python":
	case "Java":
	case "PHP":
		write("Vous êtes un mauvais gars");
		break;

	default:
		write("Vous êtres un bon gars");
		break;
}
