import { write } from "../utils/write.js";

/**
 * @param {number} B - base
 * @param {number} h - hauteur
 * @returns {number}
 */
function calcul_triangle_area(B, h) {
	return 0.5 * (B * h);
}

write("L'aire d'un triangle de 10 et 5 est de ", calcul_triangle_area(10, 5));
