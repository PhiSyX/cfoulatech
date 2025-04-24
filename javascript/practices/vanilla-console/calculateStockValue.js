/**
 * @param {Products} produits
 * @returns {Array<number>}
 */
export function calculateStockValue(produits)
{
	return produits.map(([_, p, s]) => p * s);
}
