/**
 * @param {Products} products
 * @param {Product[0]} name
 * @returns {Products}
 */
export function deleteProduct(products, name)
{
	return products.filter(([curNom]) => curNom !== name);
}
