/**
 * @param {Products} products
 * @param {Product[0]} productName
 * @param {Product[1]} newPrice
 * @returns {Products}
 */
export function updateProductPrice(products, productName, newPrice)
{
	let product = products.find(([curNom]) => curNom === productName);

	let filteredProducts = products.map((product) => {
		if (product[0] === productName) return null;
		return product;
	});

	if (!product) {
		return products;
	}

	return filteredProducts.map((fProduct) => {
		if (fProduct === null) return [product[0], newPrice, product[2]];
		return fProduct;
	})
}
