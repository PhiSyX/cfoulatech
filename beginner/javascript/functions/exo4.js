import { alert } from "../utils/alert.js";
import { prompt } from "../utils/prompt.js";

/**
 * Pour calculer la TVA, il faut: prix fois la TVA divisé par 100.
 * @param {number} price_excl - Prix HT
 * @param {number} tva_rate  - Le taux de la TVA
 * @return {number} Le montant TVA
 */
export function calculate_tva(price_excl, tva_rate) {
	return (price_excl * tva_rate) / 100;
}

let user_price_excl = Number(await prompt("Quel est votre PRIX (HT)"));
let user_tva_rate = Number(await prompt("Quel est la TVA?", 21));

let amount = calculate_tva(user_price_excl, user_tva_rate);

alert(`Le montant de la TVA est de ${amount}€`);
