import { alert } from "../utils/alert.js";
import { prompt_number } from "../utils/prompt.js";

/**
 * La formule est: L * l ou autrement dit la longueur fois la largeur.
 *
 * @param {number} L - Longueur
 * @param {number} l - Largeur
 *
 * @returns {number} La surface du rectangle
 */
export function calculate_rect_area(L, l) {
	return L * l;
}

let user_height_str = await prompt_number("Quelle est votre longueur ?");
let user_width_str = await prompt_number("Quelle est votre largeur ?");

let rect_area = calculate_rect_area(user_height_str, user_width_str);

alert(`La surface est de ${rect_area}`);
