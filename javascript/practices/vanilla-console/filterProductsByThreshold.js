/**
 * @param {Products} products
 * @param {number} threshold
 * @returns {Product[]}
 */
export function filterProductsByThreshold(products, threshold)
{
	return products.filter(([_, __, stock]) => stock < threshold);
}
