import { alert } from "../utils/alert.js";
import { prompt } from "../utils/prompt.js";

// Heure de midi, exprimée en heure.
const NOON_HOURS = 12;

/**
 * Retourne un message en fonction de l'heure donnée.
 * @param {number} hours - Nombre estimé en heure.
 * @returns {string|null} Message en fonction de l'heure.
 */
function get_message_based_on_hours(hours) {
	if (hours === NOON_HOURS) {
		return ">>> Il est midi !";
	}

	if (hours < NOON_HOURS) {
		return ">>> Il n'est pas encore midi";
	}

	return ">>> Bon apres-midi !";
}

// Heure du système.
let current_hours = new Date().getHours();

// Heure entrée par l'utilisateur dans le terminal.
let user_hours = Number.parseInt(await prompt("Entrez une heure :", current_hours), 10);

// Affiche à l'utilisateur le texte en fonction de l'heure entrée par
// l'utilisateur.
alert(get_message_based_on_hours(user_hours));
