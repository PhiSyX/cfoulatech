/**
 * Invite l'utilisateur à entrer un mot, une phrase... en fonction de
 * l'environnement :
 *
 *  - Navigateur = window.prompt
 *  - Node.js    = readline
 *
 * NOTE: cette fonction a besoin d'être asynchrone parce que l'API de Node.js
 * sur readline l'est. De plus l'API version callback de readline est moins
 * intuitive.
 *
 * @param {string} ask - Question à demander l'utilisateur.
 * @param {null|{toString(): string}} [def=null] - valeur par défaut
 * @returns {Promise<string|null>}
 */
export async function prompt(ask, def) {
	let required = def === undefined ? true : def !== null;

	def ??= null;

	if (Object.hasOwn(globalThis, "prompt")) {
		// NOTE: Browser env
		let response;

		do {
			response = globalThis.prompt(ask, def?.toString() || "");

			if (required && !response) {
				response = def?.toString() || null;
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

	let def_s =
		def && def.toString() !== "0" ? `[${def.toString()} par défaut] ` : "";

	let response;

	do {
		response = await readline
			.question(`${ask} ${def_s}`)
			.catch((_) => def?.toString() || "");
		if (required && !response) {
			response = def?.toString() || null;
		}
	} while (typeof response !== "string");

	readline.close();

	return response;
}
