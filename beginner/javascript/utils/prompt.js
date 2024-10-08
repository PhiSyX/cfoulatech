/**
 * Invite l'utilisateur à entrer un mot, une phrase...
 * 
 * @param {string} ask - Question à demander l'utilisateur.
 * @param {string|null} [def=null] - valeur par défaut
 * @returns {Promise<string|null>}
 */
export async function prompt(ask, def) {
	let required = def === undefined ? true : def !== null;

	def ??= null;

	if (Object.hasOwn(globalThis, "prompt")) {
		// NOTE: Browser env
		let response;

		do {
			response = globalThis.prompt(ask, def || "");

			if (required && !response) {
				response = def;
			}
		} while (typeof response !== "string");

		return response;
	}

	// NOTE: Node.js env
	const { createInterface } = await import("node:readline/promises");
	const { stdin, stdout } = await import("node:process");

	let readline = createInterface({
		input: stdin,
		output: stdout,
	});

	let def_s = def && def !== "0" ? `[${def} par défaut] ` : "";

	let response;

	do {
		response = await readline
			.question(`${ask} ${def_s}`)
			.catch((_) => def || "");
		if (required && !response) {
			response = def;
		}
	} while (typeof response !== "string");

	readline.close();

	return response;
}

/**
 * Invite l'utilisateur à entrer un chiffre, nombre...
 * 
 * @param {string} ask - Question à demander l'utilisateur.
 * @param {number|null} [def] - valeur par défaut
 * @returns {Promise<number>}
 */
export async function prompt_number(ask, def = null) {
	return prompt(ask, def?.toString()).then(Number);
}
