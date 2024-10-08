/**
 * @param {string | null} sides - Les côtés
 * @returns {number}
 */
export function calculer_perimeter_input(sides) {
	let s = Number(sides);
	return calculer_perimeter(s);
}
/**
 * La formule pour calculer un périmètre est: S * 4
 * @param {number} S - Les côtés
 * @returns {number}
 */
export function calculer_perimeter(S) {
	return S * 4;
}
