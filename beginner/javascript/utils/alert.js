/**
 * @param {Array<{ toString(): string }>} text
 */
export function alert(...text) {
	if (Object.hasOwn(globalThis, "alert")) {
		globalThis.alert(text);

		// NOTE: Ajoute le texte dans le document.
		let par = document.createElement("output");
		par.append(...text.map((m) => m.toString()));
		document.body.prepend(par);
	} else {
		console.debug(...text);
	}
}
