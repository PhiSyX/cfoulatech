import { showProducts } from "./showProducts.js";
import { sellProduct } from "./sellProduct.js";
import { addProduct } from "./addProduct.js";
import { findProduct } from "./findProduct.js";
import { filterProductsByThreshold } from "./filterProductsByThreshold.js";
import { calculateStockValue } from "./calculateStockValue.js";
import { mostExpensiveProduct } from "./mostExpensiveProduct.js";
import { cheapestProduct } from "./cheapestProduct.js";
import { sortProductsByPriceASC } from "./sortProductsByPriceASC.js";
import { sortProductsByName } from "./sortProductsByName.js";
import { deleteProduct } from "./deleteProduct.js";
import { updateProductPrice } from "./updateProductPrice.js";

/** Main **/
function main()
{
	/**
	 * @type {Products}
	 */
	let products = [
		["Pomme", 2.5, 30], // nom, prix unitaire (€), stock disponible
		["Banane", 1.2, 50],
		["Lait", 1.5, 10],
		["Pain", 2.0, 20],
		["Fromage", 3.8, 5],
	];
	console.group("Show Products");
	showProducts(products);
	console.groupEnd();

	console.group("Sell Product");
	products = sellProduct(products, "Pomme", 1);
	showProducts(products);
	console.groupEnd();

	console.group("Add Product");
	products = addProduct(products, "Bonbon", 2, 10);
	showProducts(products);
	console.groupEnd();

	console.log(findProduct(products, "Pomme"))

	console.group("Tous les produits sous le seuil de 10");
	console.table(filterProductsByThreshold(products, 10));
	console.groupEnd();

	console.table(calculateStockValue(products));
	console.table(mostExpensiveProduct(products));
	console.table(cheapestProduct(products));
	console.table(sortProductsByPriceASC(products));
	console.table(sortProductsByName(products));

	products = deleteProduct(products, "Pomme");
	showProducts(products);

	products = updateProductPrice(products, "Fromage", 4);
	showProducts(products);
}

main();
