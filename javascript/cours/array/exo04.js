export {};

let car = {
	brand: "Audi",
	year: 2012,
	color: "Noire",
};

console.table(car);

for (let item in car) {
	console.log(item, "=", car[item]);
}
