/**
 * @param {Products} products
 */
export function showProducts(products)
{
	console.table(products);
	// for (let [name, price, stock] of products) {
	// 	console.log(
	// 		`Le produit ${name} avec un prix unitaire de ${price}€. Il en reste ${stock} de disponible`,
	// 	);
	// }
}
