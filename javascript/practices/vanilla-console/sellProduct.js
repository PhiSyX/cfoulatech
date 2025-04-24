/**
 * @param {Products} products
 * @param {Product[0]} productName
 * @param {number} quantity
 */
export function sellProduct(products, productName, quantity)
{
	let product = products.find(([curNom]) => productName === curNom);

	if (!product) {
		return products;
	}

	const [name, _, stock] = product;

	if (stock <= 0) {
		return products;
	}

	if (stock - quantity < 0) {
		return products;
	}

	product[2] -= quantity;

	let stockAvailable = product[2];
	let stockName = name + (stockAvailable > 1 ? "s" : "");

	if (quantity > 1) {
		console.log(
			`${quantity} ${name}s ont bien été vendus. Il reste ${stockAvailable} ${stockName}.`,
		);
	} else {
		console.log(
			`${quantity} ${name} a bien été vendu. Il reste ${stockAvailable} ${stockName}.`,
		);
	}

	return products;
}
