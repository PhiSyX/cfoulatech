/**
 * - Écrit dans le document d'une page dans le cas du navigateur
 * - Écrit dans la console dans le cas de Node.js
 *
 * @param {Array<{toString(): string}>} text
 */
export function write(...text) {
	if (Object.hasOwn(globalThis, "document")) {
		let par = document.createElement("p");
		par.append(...text.map((t) => " " + t.toString()));
		document.body.append(par);
		return;
	}

	console.log(...text);
}
