export function add(a: number, b: number): number
{
	return a + b;
}

console.log("Le résultat de l'addition est", add(2, 3));

function discount(price: number, discountPer: number): number
{
	const remainingAmount = price * (discountPer / 100);
	return price - remainingAmount;
}

const finalPrice = discount(100, 20);
console.log(`Le prix final après remise est de : ${finalPrice}€`);
