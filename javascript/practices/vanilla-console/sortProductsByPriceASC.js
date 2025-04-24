/**
 * @param {Products} products
 * @returns {Products}
 */
export function sortProductsByPriceASC(products)
{
	return products.toSorted(([_, p1], [__, p2]) => p1 - p2);
}
