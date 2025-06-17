export {};

let car = {
	brand: "Audi",
	year: 2012,
	color: "Noire",
};

console.table(car);

console.log("for in: (bad practices)");
for (let item in car) {
	console.log(item, "=", car[item]);
}

console.log("for of: (better)");
for (let [item, value] of Object.entries(car)) {
	console.log(item, "=", value);
}
