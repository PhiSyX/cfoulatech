/**
 * @param {Products} products
 * @returns {Product}
 */
export function cheapestProduct(products)
{
	let cheapest = products[0];
	for (let product of products) {
		let [_, price, __] = product;
		if (price < cheapest[1]) {
			cheapest = product;
		}
	}
	return cheapest;
}
