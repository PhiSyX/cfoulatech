/**
 * @param {string} ask - Question à demander l'utilisateur.
 * @param {string | null} def - Valeur par défaut
 * @returns {Promise<string|null>}
 */
export async function prompt(ask, def = null) {
	if (!Object.hasOwn(globalThis, "prompt")) {
		const { createInterface } = await import("node:readline/promises");
		const { stdin, stdout } = await import("node:process");

		let readline = createInterface({
			input: stdin,
			output: stdout,
		});

		let response = await readline.question(ask + " ").catch((_) => def || "");
		readline.close();

		return response;
	}

	return globalThis.prompt(ask, def ?? "");
}

/**
 * @param {string} ask - Question à demander l'utilisateur.
 * @param {number} def - Valeur par défaut
 * @returns {Promise<number>}
 */
export async function prompt_number(ask, def = 0) {
	return prompt(ask, def.toString()).then(Number);
}
