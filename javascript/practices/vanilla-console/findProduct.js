/**
 * @param {Products} products
 * @param {Product[0]} name
 * @returns {number}
 */
export function findProduct(products, name)
{
	return products.findIndex(([curNom]) => curNom === name);
}
