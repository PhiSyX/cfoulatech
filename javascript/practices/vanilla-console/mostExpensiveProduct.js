/**
 * @param {Products} products
 * @returns {Product}
 */
export function mostExpensiveProduct(products)
{
	let mostExpensive = products[0];
	for (let product of products) {
		let [_, price, __] = product;
		if (price > mostExpensive[1]) {
			mostExpensive = product;
		}
	}
	return mostExpensive;
}
