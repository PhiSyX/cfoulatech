/**
 * Affiche le texte entré en fonction de l'environnement:
 *
 * - Navigateur = window.alert
 * - Node.js    = console.info
 *
 * @param {{ toString(): string }|null|undefined} text - Texte à afficher
 */
export function alert(text) {
	if (!text) {
		console.warn("Undefined alert text");
		return;
	}

	if (Object.hasOwn(globalThis, "alert")) {
		// NOTE: Utilise la fonction alert globale du navigateur.
		globalThis.alert(text.toString());

		// NOTE: Ajoute le texte dans le document.
		let output = document.createElement("output");
		for (let line of text.toString().trimEnd().split('\n')) {
			output.append(line);
			output.append(document.createElement("br"));
		}
		document.body.append(output);
	}
	console.info(text.toString().trimEnd());
}
