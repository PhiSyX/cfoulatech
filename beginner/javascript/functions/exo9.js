import { write } from "../utils/write.js";

/**
 * La récursivité
 */

/**
 * Version naïve d'une factorielle d'un entier naturel n.
 * @param {number} n - Nombre
 * @returns {number}
 */
function naive_factorial(n) {
	if (n === 0) { // On arrête la récursivité lorsque n vaut 0
		return 1;
	}
	
	// EXAMPLE(input): n = 3
	// EXAMPLE(output): 3 * naive_factorial(2)
	// EXAMPLE(input): n = 2
	// EXAMPLE(output): 2 * naive_factorial(1)
	// EXAMPLE(input): n = 1
	// EXAMPLE(output): 1 * naive_factorial(0)

	return n * naive_factorial(n - 1);
}

write(naive_factorial(5));
