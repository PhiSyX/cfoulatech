/**
 * - Écrit dans le document d'une page dans le cas du navigateur
 * - Écrit dans la console dans le cas de Node.js
 *
 * @param {Array<{toString(): string}|undefined|null>} text
 */
export function write(...text) {
	if (Object.hasOwn(globalThis, "document")) {
		let par = document.createElement("p");
		par.append(...text.map((t) => {
			let hl = document.createElement("mark");
			hl.append(" ");
			if (typeof t === "undefined") {
				hl.append("undefined");
				return hl;
			}
			
			if (typeof t ==="object" && t === null) {
				hl.append("null");
				return hl;
			}

			let s = t.toString();

			if (s.length === 0) {
				hl.append("<empty string>");
				return hl;
			}

			return ` ${s}`;
		}));
		document.body.append(par);
		return;
	}

	console.debug(...text);
}
