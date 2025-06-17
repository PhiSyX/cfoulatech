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

let user_height = await prompt("Quelle est votre longueur ?", { cast: "number" });
let user_width = await prompt("Quelle est votre largeur ?", { cast: "number" });

let rect_area = calculate_rect_area(user_height, user_width);

alert(`La surface est de ${rect_area}`);
