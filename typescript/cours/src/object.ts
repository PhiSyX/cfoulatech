let product: { name: string; price: number; } = {
	name: "Chaussures",
	price: 59.99,
};

console.log("Le nom du produit est", product.name);
console.log(`Le prix du produit vaut ${product.price}€`);

// Inference de type
let discount = 5;
let finalPrice = product.price - (product.price * (discount / 100));

// Expliciter le type
// let discount: number = 5;
// let finalPrice: number = product.price - (product.price * (discount / 100));


console.log(
	"Le prix du produit après réduction de",
	`${discount}%:`,
	`${finalPrice.toFixed(2)}€`,
);
