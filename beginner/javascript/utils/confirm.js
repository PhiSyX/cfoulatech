/**
 * @param {string} ask - Question à demander l'utilisateur.
 * @returns {Promise<boolean>}
 */
export async function confirm(ask) {
	if (Object.hasOwn(globalThis, "confirm")) {
		// NOTE: Browser env
		return globalThis.confirm(ask);
	}

	/**
	 * @param {string} word
	 */
	function into_bool(word) {
		return [
			"1", // 0
			"actif", // inactif
			"active",
			"activé", // désactivé
			"activée",
			"enabled", // disabled
			"ok",
			"on", // off
			"oui", // non
			"true", // false
			"vrai",
			"vraie",
			"yes", // no
			"y",
		].includes(word.toLowerCase());
	}

	// NOTE: Node.js env
	const { createInterface } = await import("node:readline/promises");
	const { stdin, stdout } = await import("node:process");

	let readline = createInterface({
		input: stdin,
		output: stdout,
	});

	let user_input = await readline.question(`${ask} `).catch((_) => "false");
	readline.close();
	return into_bool(user_input);
}
