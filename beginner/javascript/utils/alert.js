/**
 * Affiche le texte entré en fonction de l'environnement:
 *
 * - Navigateur = window.alert
 * - Node.js    = console.info
 *
 * @param {{ toString(): string }} text - Texte à afficher
 */
export function alert(text) {
	if (Object.hasOwn(globalThis, "alert")) {
		// NOTE: Utilise la fonction alert globale du navigateur.
		globalThis.alert(text.toString());

		// NOTE: Ajoute le texte dans le document.
		let output = document.createElement("output");
		output.append(text.toString());
		document.body.prepend(output);
	} else {
		console.info(text.toString());
	}
}
