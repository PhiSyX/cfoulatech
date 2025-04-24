/**
 * @param {Products} products
 * @returns {Products}
 */
export function sortProductsByName(products)
{
	return products.toSorted(([n1], [n2]) => n1.charCodeAt(0) - n2.charCodeAt(0));
}
