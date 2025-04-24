/**
 * @param {Products} produits
 * @param {Product[0]} nom
 * @param {Product[1]} prix
 * @param {Product[2]} stock
 * @returns {Products}
 */
export function addProduct(produits, nom, prix, stock)
{
	if (stock > 1) {
		console.log(
			`${stock} ${nom} ont éta ajoutés au prix unitaire de ${prix}€.`,
		);
	} else {
		console.log(
			`${stock} ${nom} a éta ajouté au prix unitaire de ${prix}€.`,
		);
	}

	return [...produits, [nom, prix, stock]];
}

