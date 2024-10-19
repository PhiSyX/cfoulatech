import { alert } from "../utils/alert.js";
import { prompt } from "../utils/prompt.js";

/**
 * La formule est: L * l ou autrement dit la longueur fois la largeur.
 *
 * @param {number} L - Longueur
 * @param {number} l - Largeur
 * @returns {number} La surface du rectangle
 */
function calculate_rect_area(L, l) {
	return L * l;
}

let user_height = Number.parseInt(await prompt("Quelle est votre longueur ?"), 10);
let user_width = Number.parseInt(await prompt("Quelle est votre largeur ?"), 10);

let rect_area = calculate_rect_area(user_height, user_width);

alert(`La surface est de ${rect_area}`);
