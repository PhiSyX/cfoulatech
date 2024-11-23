import { write } from "../utils/write.js";

/**
 * Effectue une opération arithmétique.
 * @typedef {(left_operand:number,right_operand:number) => number} ArithmeticalFn
 *
 * @param {number} left_operand - Opérande de gauche.
 * @param {number} right_operand - Opérande de droite.
 * @param {ArithmeticalFn} arithmetical_operation_fn - Fonction d'opération arithmétique.
 * @returns {number} Résultat de la fonction de l'opération arithmétique.
 */
export function perform_operation(
	left_operand,
	right_operand,
	arithmetical_operation_fn
) {
	return arithmetical_operation_fn(left_operand, right_operand);
}

/**
 * @param {number} l - Opérande de gauche
 * @param {number} r - Opérande de droite
 * @returns {number} La somme des deux opérandes.
 */
const add = function (l, r) {
	return l + r;
};

/**
 * @param {number} l - Opérande de gauche
 * @param {number} r - Opérande de droite
 * @returns {number} La soustraction des deux opérandes.
 */
const sub = (l, r) => l - r;

write("add:", perform_operation(1, 2, add));
write("sub:", perform_operation(4, 1, sub));
