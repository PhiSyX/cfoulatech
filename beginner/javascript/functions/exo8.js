import { write } from "../utils/write.js";

/**
 * @param {string} name - Nom à saluer.
 * @param {string} [term_salutation="Salut"] - Le terme de salutation.
 * @returns {string} Message de salutation.
 */
function hello(name, term_salutation = "Salut") {
	return `${term_salutation}, ${name}!`;
}

write(hello("Mike"));
write(hello("Mike", "Bonjour"));
