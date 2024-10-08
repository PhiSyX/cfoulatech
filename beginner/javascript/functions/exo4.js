/**
 * @param {string | null} price_excl_str
 * @param {string | null} tva_rate_str
 * @return {number} Le montant TVA
 */
export function calculate_tva_input(price_excl_str, tva_rate_str) {
	let price_excl = Number(price_excl_str);
	let tva_rate = Number(tva_rate_str);
	return calculate_tva(price_excl, tva_rate);
}

/**
 * Pour calculer la TVA, il faut: prix fois la TVA divisé par 100.
 *
 * @param {number} price_excl
 * @param {number} tva_rate
 * @return {number} Le montant TVA
 */
export function calculate_tva(price_excl, tva_rate) {
	return (price_excl * tva_rate) / 100;
}
