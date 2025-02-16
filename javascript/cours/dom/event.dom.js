import { prompt } from "../utils/prompt.js";

/**
 * Bouton d'addition.
 *
 * @type {HTMLButtonElement|null}
 */
let addition_btn = document.querySelector("#addition");

if (addition_btn) {
	addition_btn.onclick = async () => {
		let x = Number.parseFloat(await prompt("1er numéro"));
		let y = Number.parseFloat(await prompt("2nd numéro"));

		let z = x + y;

		alert(`Le résultat du calcul de ${x} + ${y} = ${z}`);
	};
}
