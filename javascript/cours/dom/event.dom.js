import { prompt } from "../utils/prompt.js";

/**
 * Bouton d'addition.
 *
 * @type {HTMLButtonElement|null}
 */
let addition_btn = document.querySelector("#addition");

if (addition_btn) {
	addition_btn.onclick = async () => {
		let x = await prompt("1er numéro", { cast: "number" });
		let y = await prompt("2nd numéro", { cast: "number" });

		let z = x + y;

		alert(`Le résultat du calcul de ${x} + ${y} = ${z}`);
	};
}
