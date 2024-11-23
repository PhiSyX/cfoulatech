import { write } from "../utils/write.js";

/**
 * Salue un nom directement dans la fonction.
 * @param {string} name
 */
function hello(name) {
	write(`Mes salutations ${name}`);
}

hello("Alice");
hello("Bob");
