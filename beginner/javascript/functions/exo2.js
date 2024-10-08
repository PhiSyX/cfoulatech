/**
 * Calcule la surface d'une longueur et largeur.
 *
 * @param {string|null} height
 * @param {string|null} width
 *
 * @returns {number}
 */
export function calculate_rect_area_input(height = "0", width = "0") {
	let h = Number(height);
	let w = Number(width);
	return calculate_rect_area(h, w);
}

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
