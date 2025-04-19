/**
 * @typedef {{
 *     required?: boolean;
 *     default?: { toString(): string };
 *     cast?: "number"|"float"|"int"|"integer"|"boolean";
 *     range?: [start: number, end:number];
 *     enum?: Array<{ toString(): string }>;
 *     filter?: (v: any) => boolean;
 * }} PromptOptions
 */

/**
 * Invite l'utilisateur à entrer un mot, un nombre, une phrase... en fonction de
 * l'environnement, la fonction suivante est utilisée :
 *
 *  - Navigateur = window.prompt
 *  - Node.js    = readline
 *
 * NOTE: cette fonction a besoin d'être asynchrone parce que l'API de Node.js
 * sur readline l'est. De plus l'API version callback de readline est moins
 * intuitive.
 *
 * @param {string} ask - Question à demander l'utilisateur.
 * @param {PromptOptions} [options={}] - valeur par défaut
 */
export async function prompt(ask, options = {}) {
	options.required ??= true;

	// NOTE: Browser env
	let response;

	if (options.required) {
		response = await prompt_forever(ask, options);
	} else {
		response = await prompt_with_cancellation(ask, options);
	}

	if (
		(options.enum && !options.enum.includes(response)) ||
		(options.range && !(response >= options.range[0] && response <= options.range[1]))
	) {
		return prompt(ask, options);
	}

	if (options.filter && !options.filter(response)) {
		return prompt(ask, options);
	}

	return response;
}

/**
 * @param {string} ask - Question à demander l'utilisateur.
 * @param {PromptOptions} [options={}] - valeur par défaut
 */
async function prompt_forever(ask, options = {}) {
	let response;
	let drop;

	do {
		[response, drop] = await prompt_fn(ask, options.default);
		response ??= options.default;
	} while (typeof response !== "string");

	drop();

	return into(response, options.cast);
}

/**
 * @param {string} ask - Question à demander l'utilisateur.
 * @param {PromptOptions} [options={}] - valeur par défaut
 */
async function prompt_with_cancellation(ask, options = {}) {
	let response;
	let drop;

	do {
		[response, drop] = await prompt_fn(ask, options.default);
		response ??= options.default;
		response ??= null;

		if (response == null) {
			break;
		}
	} while (typeof response !== "string");

	drop();

	if (response == null) {
		return response;
	}

	return into(response, options.cast);
}

/**
 * @param {string} ask
 * @param {{ toString(): string }} [def]
 */
async function prompt_fn(ask, def) {
	if (Object.hasOwn(globalThis, "prompt")) {
		// NOTE: Browser env
		return [globalThis.prompt(ask, def?.toString()), () => void 0];
	}

	// NOTE: Node.js env
	const { createInterface } = await import("node:readline/promises");
	const { stdin, stdout } = await import("node:process");

	let readline = createInterface({
		input: stdin, output: stdout,
	});

	let def_s = def && def.toString() !== "0" ? `[${def.toString()} par défaut] ` : "";
	let response = await readline.question(`${ask} ${def_s}`).catch((_) => null);
	if (def && response?.length === 0) {
		response = def.toString();
	}
	return [response, () => readline.close()];
}

/**
 * @param {string} str
 * @param {PromptOptions["cast"]} to
 */
function into(str, to) {
	switch (to) {
		case "number":
			return try_into_number(Number(str));
		case "int":
		case "integer":
			return try_into_number(Number.parseInt(str, 10));
		case "float":
			return try_into_number(Number.parseFloat(str));

		case "boolean":
			return into_boolean(str);
	}

	return str;
}

/**
 * @param {number} n
 */
function try_into_number(n) {
	if (Number.isNaN(n)) {
		throw new Error("Not a Number");
	}
	return n;
}

/**
 * @param {string} text
 * @returns {boolean}
 */
function into_boolean(text) {
	switch (text) {
		case "actif":
		case "active":
		case "enable":
		case "enabled":
		case "ok":
		case "okay":
		case "on":
		case "yep":
		case "yes":
		case "ouai":
		case "ouaip":
		case "ouais":
		case "oui":
		case "true":
		case "vrai":
		case "vraie":
			return true;

		default:
			return false;
	}
}
