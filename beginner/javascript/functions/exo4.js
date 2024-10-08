import { alert } from "../utils/alert.js";
import { prompt_number } from "../utils/prompt.js";

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

let user_price_excl = await prompt_number("Quel est votre PRIX (HT)");
let user_tva_rate = await prompt_number("Quel est la TVA?", 21);

let amount = calculate_tva(user_price_excl, user_tva_rate);

alert(`Le montant de la TVA est de ${amount}€`);
